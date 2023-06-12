const express = require('express');
const router = new express.Router();
const authController = require('../controllers/auth/register.controller');

router.get('/register', authController.register);

module.exports = router;
