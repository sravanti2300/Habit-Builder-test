const express = require('express');
const router=express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// getting user controller
const detailsController = require('../controllers/details_controller');
router.get('/', ensureAuthenticated,detailsController.details);
// update route for habits
router.post('/update-habit/',ensureAuthenticated,detailsController.updateHabit);
//get details of all habits

router.get('/getall-details/',ensureAuthenticated,detailsController.allDates);

module.exports=router;