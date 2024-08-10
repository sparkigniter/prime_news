require('dotenv').config({ path: __dirname + '/../.env'});
const axios = require('axios');
const moment = require('moment');

const NEWS_API_HOST_URL = process.env.NEWS_API_HOST_URL || "";
const API_KEY = process.env.NEWS_API_KEY || "";
const TOP_HEADLINES_ENDPOINT = "v2/top-headlines";
const sources = "abc-news,associated-press"

exports.fetchNews = async () => {
    try {
        const hostUrl = NEWS_API_HOST_URL.replace('\/\$', "");
        const endpoint = TOP_HEADLINES_ENDPOINT.replace('^\/\g', "");
        const to = moment().toISOString();
        const from = moment().subtract(1, 'hour').toISOString();
        const endpointUrl = `${hostUrl}/${endpoint}?from=${from}&to=${to}&sources${sources}`;
        const res = await axios.get(endpointUrl, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return res?.data;
    } catch(e) {
        console.log(e);
        //TODO: Log error
    }
}