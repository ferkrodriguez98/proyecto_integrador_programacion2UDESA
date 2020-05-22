const express = require('express');
const router = express.Router();

const controller = require('../controllers/registerController');

router.get('/', controller.index);

router.post('/', controller.register);

module.exports = router;
