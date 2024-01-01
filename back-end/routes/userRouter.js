var express = require('express');
const { getAllProperties, getSinglePropData } = require('../controllers/getPropsController');
const { userAuth } = require('../middlewares/authorization');
var router = express.Router();

/* GET users listing. */
router.get('/getAllProperties',userAuth,getAllProperties)
router.get('/single-prop',userAuth,getSinglePropData)

module.exports = router;
