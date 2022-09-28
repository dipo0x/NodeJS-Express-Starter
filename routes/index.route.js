var express = require('express');
var controller = require('../controllers/index.controller.js')
var router = express.Router();

router.post('/home', controller.home)

module.exports = router;