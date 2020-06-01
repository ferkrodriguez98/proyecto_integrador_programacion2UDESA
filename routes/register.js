const express = require('express');
const router = express.Router();

const controller = require('../controllers/registerController');

router.get('/', controller.index); // guests

router.post('/', controller.checkIfExists);

module.exports = router;
