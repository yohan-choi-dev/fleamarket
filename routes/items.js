const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const itemController = require("../controllers/item");

// /api/items/ => GET
router.get("/", (req, res, next) => {
    if (req.query.name) {
        itemController.getItemsByName(req, res, next);
    } else {
        itemController.getItems(req, res, next);
    }
});

router.get("/:itemId", (req, res, next) => {
    itemController.getItemById(req, res, next);
});

// /api/items/ => POST 
router.post("/", itemController.postItem);

// /api/items/ => PATCH
router.post("/", itemController.patchItem);

// /api/items/ => DELETE 
router.post("/", itemController.deleteItem);

module.exports = router;
