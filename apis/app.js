const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const news = require('./routes/news.js'); 

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get("/health", (req, res) => {
    res.send("alive");
})

app.use('/api/news', news);

module.exports = app;