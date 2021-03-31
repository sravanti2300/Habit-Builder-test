const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/welcome', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// getting homepage controller
const homeController = require('../controllers/home_controller');
router.get('/',ensureAuthenticated,homeController.home);

// create habit route
router.post('/create-habit',ensureAuthenticated,homeController.createHabit);
// delete habit route
router.get('/delete-habit/',ensureAuthenticated,homeController.deleteHabit);
// use details routes
router.use('/details',ensureAuthenticated,require('./details'));
// login password

module.exports = router;
