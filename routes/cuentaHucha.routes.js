const express = require('express');
const router = express.Router();
const CuentaHuchaController = require('../controllers/CuentaHuchaController');
const { authentication, isAdmin } = require('../middlewares/authentication');

// Get hucha account by user ID
router.get('/user/:id_usu', authentication, CuentaHuchaController.getCuentaHuchaByUserId);

// Create a new hucha account
router.post('/create', authentication, isAdmin, CuentaHuchaController.createCuentaHucha);

// Update hucha account by IBAN
router.put('/update/:iban', authentication, isAdmin, CuentaHuchaController.updateCuentaHucha);

module.exports = router;
