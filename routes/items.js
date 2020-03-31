const express = require("express");
const router = express.Router();

const itemController = require("../controllers/item");
const { storageMiddleware } = require('../middlewares/storage');

// /api/items/ => GET
router.get("/", (req, res, next) => {
    if (req.query.name) {
        itemController.getItemsByName(req, res, next);
    } else if (req.query.user) {
        itemController.getItemsByUser(req, res, next);
    } else {
        itemController.getItems(req, res, next);
    }
});

router.get("/:itemId", (req, res, next) => {
    itemController.getItemById(req, res, next);
});

// /api/items/ => POST
router.post("/", storageMiddleware, itemController.postItem);

// /api/items/ => PUT
router.put("/:itemId", itemController.updateItem);

// /api/items/ => DELETE
// router.post("/", itemController.deleteItem);

module.exports = router;
