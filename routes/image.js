const express = require('express');
const router = express.Router();


const imageController = require('../controllers/image');

// /api/images/ => GET
router.get('/', (req, res, next) => {
    if (req.query.id) {
        imageController.getImageById(req, res, next);
    } else if (req.query.itemId) {
        imageController.getImageByItemId(req, res, next);
    }
});

// /api/images/ => POST
router.post('/add-image', imageController.postImage);

module.exports = router;
