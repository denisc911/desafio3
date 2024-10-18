const express = require('express');
const router = express.Router();
const TransCtaController = require('../controllers/TransBankCtaController');
const { authentication, isAdmin } = require('../middlewares/authentication');

router.get('/id/:id_usu', TransCtaController.getById);

module.exports = router;
