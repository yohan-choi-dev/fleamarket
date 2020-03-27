const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const isAuth = require('../middlewares/is-auth')

// router.get('/', isAuth, userController);

router.get('/:userId', (req, res, next) => {
    userController.getUserById(req, res, next)
})

router.put('/:userId', userController.updateAccountSettings)

module.exports = router
