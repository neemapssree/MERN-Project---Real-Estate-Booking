var express = require('express');
const { getAllProperties, getSinglePropData, dayWiseSlotFunction } = require('../controllers/getPropsController');
const { userAuth } = require('../middlewares/authorization');
var router = express.Router();

/* GET users listing. */
router.get('/getAllProperties',userAuth,getAllProperties)
router.get('/single-prop',userAuth,getSinglePropData)
router.get('/dayWiseTimeSlot',userAuth,dayWiseSlotFunction)

module.exports = router;
