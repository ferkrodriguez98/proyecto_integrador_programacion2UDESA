const express = require('express');
const router = express.Router();

const controller = require('../controllers/loginController');

router.get('/', controller.index); // formulario de login

router.post('/', controller.login); // renderiza el profile o vuelve con errores

module.exports = router;
