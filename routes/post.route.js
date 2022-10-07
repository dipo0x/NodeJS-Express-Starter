var express = require('express');
var controller = require('../controllers/post.controller.js')
var router = express.Router();

router.get('/all-posts', controller.all_Posts)
router.post('/create-post', controller.create_post)
router.put('/edit-post/:slug', controller.edit_post)
router.delete('/delete-post/:slug', controller.delete_post)

module.exports = router;