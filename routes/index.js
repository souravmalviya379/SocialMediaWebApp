const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

// any request other than '/' can be handelled using middlewares like below
router.use('/users', require('./users'));

module.exports = router;