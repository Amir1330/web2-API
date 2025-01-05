const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

router.get('/:city', currencyController.getCurrency);

module.exports = router;
