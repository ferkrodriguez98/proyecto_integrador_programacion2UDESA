const express = require('express');
const router = express.Router();

const controller = require('../controllers/seriesController');

router.get('/detail/:id', controller.detail) // renderiza el detalle de una serie

module.exports = router;