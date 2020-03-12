const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

// /api/categories/ => GET
router.get('/', categoryController.getCategories);
    
module.exports = router;
