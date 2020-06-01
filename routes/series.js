const express = require('express');
const router = express.Router();

const controller = require('../controllers/seriesController');

router.get('/detail/:id', controller.detail)

module.exports = router;