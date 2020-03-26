const express = require('express');
const router = express.Router();

const favoriteController = require('../controllers/favorite');

router.post('/', favoriteController.addFavorite);
router.delete('/', favoriteController.removeFavorite);

// /api/favorites?userId=51
router.get('/', favoriteController.getFavoritesByUserId);

module.exports = router;
