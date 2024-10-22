const express = require('express');
const router = express.Router();
const TokenController = require('../controllers/TokenController');
const { authentication, isAdmin } = require('../middlewares/authentication');

// Get token by user ID
router.get('/user/:id_usu', authentication, TokenController.getTokenByUserId);

// Create a new token
router.post('/create', authentication, isAdmin, TokenController.createToken);

module.exports = router;