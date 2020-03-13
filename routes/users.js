const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('../middlewares/is-auth');

// router.get('/', isAuth, userController);

router.put('/:userId', userController.updateAccountSettings);

module.exports = router;