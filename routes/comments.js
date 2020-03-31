const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment');

router.get('/', async (req, res, next) => {
  if (req.query.itemId) {
    await commentController.getCommentsByItemId(req, res, next);
  } else {
    next();
  }
});

router.post('/', async (req, res, next) => {
  await commentController.createComment(req, res, next);
});

module.exports = router;