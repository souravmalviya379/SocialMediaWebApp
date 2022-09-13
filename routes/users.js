const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/signup', usersController.signUp);
router.get('/login', usersController.login);
router.get('/posts', usersController.posts);

module.exports = router;