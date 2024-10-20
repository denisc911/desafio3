const express = require('express');
const router = express.Router();
const CuentaController = require('../controllers/CuentaController');
const { authentication, isAdmin } = require('../middlewares/authentication');
// Get account by user ID
router.get('/user/:id_usu', authentication, CuentaController.getCuentaByUserId);

// Create a new account
router.post('/create', authentication, isAdmin, CuentaController.createCuenta);

// Update account by IBAN
router.put('/update/:iban', authentication, isAdmin, CuentaController.updateCuenta);

module.exports = router;