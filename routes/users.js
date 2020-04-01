const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// router.get('/', isAuth, userController);

router.get('/confirm-email-update', userController.confirmEmailUpdate)

router.get('/:userId', (req, res, next) => {
    userController.getUserById(req, res, next)
})

router.put('/:userId', userController.updateAccountSettings)

module.exports = router
