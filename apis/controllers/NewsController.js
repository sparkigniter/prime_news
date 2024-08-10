const rabbitmq = require('../rabbitmq/queue');
const { NEWS_QUEUE_NAME } = require('../constants/queue');
const newsModel = require('../models/NewsModel');
const newsApiClient = require('../clients/NewsServiceClient');


exports.getNews =  async (req, res) => {
    const newsData = await newsModel.getAllNews();
    return res.status(200).json(newsData);    
}

exports.process = async (req, res) => {
    const {channel} = await rabbitmq.connect();
    let newsData = await newsApiClient.fetchNews();
    newsData = newsData ?? [];
    channel.sendToQueue(NEWS_QUEUE_NAME, Buffer.from(JSON.stringify(newsData)));
    res.status(200).send({});
}