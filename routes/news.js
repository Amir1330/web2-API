const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/:city', newsController.getNews);

module.exports = router;
