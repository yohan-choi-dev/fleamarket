const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

const { storageMiddleware } = require('../middlewares/storage')

router.get('/confirm-email-update', userController.confirmEmailUpdate)

router.put('/profile/:userId', storageMiddleware, userController.updateUserProfile)

router.get('/:userId', (req, res, next) => {
    userController.getUserById(req, res, next)
})

router.put('/:userId', userController.updateAccountSettings)

router.get('/user/rate:userId', userController.getUserRate)

module.exports = router
