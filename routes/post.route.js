var express = require('express');
var controller = require('../controllers/post.controller.js')
var postsExistsBySlug = require('../utils/middleware/postExistsBySlug')
var postsExistsByBody = require('../utils/middleware/postExistsByBody')
var router = express.Router();

router.get('/all-posts', controller.all_Posts)
router.post('/create-post', postsExistsByBody, controller.create_post)
router.put('/edit-post/:slug', postsExistsBySlug, controller.edit_post)
router.delete('/delete-post/:slug', postsExistsBySlug, controller.delete_post)

module.exports = router;