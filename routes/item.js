const express = require('express');
const itemController = require('../controllers/item');
const router = express.Router();


// The name of url can be change later


// GET /items/items
router.get('/items', itemController.getItems);

// POST /items/items
// ex) http://localhost:10034/item/items/laptop
router.get('/items/:name', itemController.getItemsByName);

module.exports = router;
