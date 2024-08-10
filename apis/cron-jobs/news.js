const rabbitmq = require('../rabbitmq/queue');
const { NEWS_QUEUE_NAME } = require('../constants/queue');
const cron = require('node-cron');
const newsApiClient = require('../clients/NewsServiceClient');
const newsModel = require('../models/NewsModel');

const pushNews = async () => {
    const news = await newsApiClient.fetchNews();
    const {channel} = await rabbitmq.connect();
    channel.sendToQueue(NEWS_QUEUE_NAME, Buffer.from(JSON.stringify(news)));
}

const consumeNews = async () => {
    const {channel, connection} = await rabbitmq.connect();
    channel.consume(NEWS_QUEUE_NAME, async (message) => {
        const newsArticle = JSON.parse(message.content.toString());
        newsModel.bulkInsert(newsArticle);
        //console.log('Received news article:', newsArticle);
        // Acknowledge the message if processing is successful
        channel.ack(message);
        await channel.close();
        await connection.close();
    });
}

// First cron job: runs every hour
cron.schedule('0 * * * *', async () => {
    console.log("Schedule cron job pushNews......");
    await pushNews();
    console.log("Finished cron job pushNews......");
});

// Second cron job: runs every 1 hour and 10 minutes
cron.schedule('* * * * *', async () => {
    console.log("Schedule cron job consumeNews......");
    await consumeNews();
});
