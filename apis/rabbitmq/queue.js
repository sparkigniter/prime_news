const { connect } = require('amqplib');
const { NEWS_QUEUE_NAME } = require('../constants/queue');

exports.connect = async () => {
    const conn =  await connect('amqp://host.docker.internal:5672');
    const channel = await conn.createChannel();
    await channel.assertQueue(NEWS_QUEUE_NAME); 
    return {channel: channel, connection: conn};
}
