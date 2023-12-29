var express = require('express');
const { getAllProperties } = require('../controllers/getPropsController');
var router = express.Router();

/* GET users listing. */
router.get('/getAllProperties', getAllProperties)

module.exports = router;
