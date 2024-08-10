const express = require("express");
const router = express.Router();

const newsController = require("../controllers/NewsController");

/********* news routes **********/
router.get("/", newsController.getNews);
router.post("/", newsController.process);

module.exports = router;