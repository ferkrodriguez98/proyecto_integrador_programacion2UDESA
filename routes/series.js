const express = require('express');
const router = express.Router();

const controller = require('../controllers/seriesController');

router.get('/detail', controller.detail)

// router.get('/', controller.index);

// router.get('/details/:id', controller.serieDetail);

module.exports = router;