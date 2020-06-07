const express = require('express');
const router = express.Router();

const controller = require('../controllers/usersController');
const reviewsController = require('../controllers/reviewsController');

router.get('/', controller.index); // no la usamos

router.get('/search', controller.findUsers); // search de users por username o email

router.get('/:username', controller.userDetailByUsername); // detalle de usuario

module.exports = router;
