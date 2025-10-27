const express = require('express');

const messageController = require('../controller/messageController');

const router = express();

router.route('/').get(messageController.getAllMessages);

module.exports = router;
