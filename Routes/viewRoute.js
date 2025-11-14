const express = require('express');
const viewController = require('../controller/viewController');
const authController = require('../controller/authController');

const router = express();

router.get('/', viewController.getLandingPage);
router.get('/signup', viewController.getSignup);
router.get('/login', viewController.getlogin);
router.get('/linkup', authController.isLogedIn, viewController.getChatPage);

module.exports = router;
