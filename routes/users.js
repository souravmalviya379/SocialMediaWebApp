const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
    //if user is authenticated then only it profile page will be renderd
router.get('/profile',passport.checkAuthentication, usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/login', usersController.login);

router.post('/create', usersController.create);
router.get('/sign-out',  usersController.destroySession)

//use passport as a middleware to authenticate
router.post('/create_session', passport.authenticate(
    'local', 
    {failureRedirect: '/users/login'}
), usersController.create_session);
module.exports = router;