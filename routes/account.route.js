const express = require('express');
const controller = require('../controllers/account.controller.js')
const { hasAuth } = require('../utils/middleware/hasAuth')
const router = express.Router();

router.post('/register', controller.register)
router.post('/otp', hasAuth, controller.otp)
router.post('/login', controller.login)
router.post('/reset_password', controller.reset_password)
router.post('/reset_password_otp', hasAuth, controller.reset_password_otp)
router.post('/reset_password_confirm', hasAuth, controller.reset_password_confirm)

module.exports = router;