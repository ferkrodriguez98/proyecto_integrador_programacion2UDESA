const express = require('express');
const router = express.Router();

const controller = require('../controllers/usersController');

router.get('/', controller.index);

// router.get('/:id', controller.userDetailById);

router.get('/:username', controller.userDetailByUsername);

module.exports = router;
