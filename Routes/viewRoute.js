const express = require('express');
const viewController = require('../controller/viewController');

const router = express();

router.get('/', viewController.getLandingPage);
router.get('/signup', viewController.getSignup);
router.get('/login', viewController.getlogin);
router.get('/linkup', viewController.getChatPage);

module.exports = router;
