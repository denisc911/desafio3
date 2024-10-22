const express = require('express');
const router = express.Router();
const TransBancAhorroController = require('../controllers/TransBancAhorroController');
const { authentication, isAdmin } = require('../middlewares/authentication');

// Get all savings transactions for a user
router.get('/user/:id_usu', authentication, TransBancAhorroController.getTransBancAhorroByUserId);

// Create a new savings transaction
router.post('/create', authentication, TransBancAhorroController.createTransBancAhorro);

module.exports = router;