const express = require('express');
const itemController = require('../controllers/item');
const router = express.Router();

//router.post('/item', itemController.createItem);


router.get('/items', itemController.getItems);


module.exports = router;
