const express = require('express');
const viewController = require('../controller/viewController');

const router = express();

router.get('/signup', viewController.getSignup);
router.get('/login', viewController.getlogin);

module.exports = router;
