const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControl');
const { check } = require('express-validator');
router.get('/all', postControllers.getPosts);
router.get('/:pid', postControllers.getPostById);
router.post(
  '/new',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('imageURL')
      .not()
      .isEmpty()
  ],
  postControllers.createPost
);
router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('imageURL')
      .not()
      .isEmpty()
  ],
  postControllers.updatePost
);
router.delete('/:pid', postControllers.deletePost);
module.exports = router;
