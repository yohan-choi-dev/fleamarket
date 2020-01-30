const express = require('express');
const userController = require('../controllers/user');
const isAuth = require('../middlewares/is-auth');

router.get('/', isAuth, userController);
