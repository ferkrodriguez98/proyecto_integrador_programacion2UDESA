const express = require('express');
const router = express.Router();

const controller = require('../controllers/loginController');

router.get('/', controller.index); 

router.post('/', controller.checkUser);

module.exports = router;
