const express = require('express');
const itemController = require('../controllers/item');
const router = express.Router();
// The name of url can be change later

// GET /posts/items
router.get('/items', itemController.getItems);

// POST /posts/items
// ex) http://localhost:10034/posts/items/name
router.get('/items/:name', itemController.getItemsByName);

module.exports = router;
