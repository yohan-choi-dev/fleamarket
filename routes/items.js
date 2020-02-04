const express = require('express');
const itemController = require('../controllers/item');
const router = express.Router();

// *Note: the URLs can be chnaged any time for business logics.
// We can't simply implement item routes since based on the logics, the logic can be different.
// For instance, if a user accesses to their own item, then they will use /user/{userId}/item/{itemId}
// However if a user accesses to another user's item, then they will use /posts/{postId}/item/{itemId}


// GET /items
// ex) http://localhost:10034/items?name='Laptop'
router.get('/', (req, res, next) => {
    if (req.query.name) {
        itemController.getItemsByName(req, res, next);
    } else {
        itemController.getItems(req, res, next);
    }
});


// Post /posts
module.exports = router;
