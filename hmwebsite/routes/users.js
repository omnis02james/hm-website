const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userControl');
const { check } = require('express-validator');
router.get('/', usersController.getUsers);
router.post(
  '/signup',
  [
    check('username')
      .not()
      .isEmpty(),
    check('password').isLength({ min: 10 })
  ],
  usersController.signup
);
router.post('/login', usersController.login);
module.exports = router;
