const express = require('express');
const router = express.Router();

const controller = require('../controllers/registerController');

router.get('/', controller.index); // formulario de register

router.post('/', controller.checkIfExists); // registra y renderiza perfil o vuelve con errores

module.exports = router;
