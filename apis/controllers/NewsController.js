
const newsApiClient = require('../clients/NewsServiceClient');
const rabbitmq = require('../rabbitmq/queue');
const { NEWS_QUEUE_NAME } = require('../constants/queue');
const newsModel = require('../models/NewsModel');


exports.getNews =  async (req, res) => {
    const newsData = await newsModel.getAllNews();
    return res.status(200).json(newsData);    
}