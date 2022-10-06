var express = require('express');
var controller = require('../controllers/post.controller.js')
var router = express.Router();

router.post('/create-post', controller.create_post)

module.exports = router;