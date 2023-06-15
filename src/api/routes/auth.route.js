const express = require('express');
const router = new express.Router();
const authController = require('../controllers/auth/register.controller');

router.post('/register', authController.register);

module.exports = router;
