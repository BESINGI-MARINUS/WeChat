const express = require('express');
const authController = require('../controller/authController');

const messageController = require('../controller/messageController');

const router = express();

router.route('/').get(authController.protect, messageController.getAllMessages);

module.exports = router;
