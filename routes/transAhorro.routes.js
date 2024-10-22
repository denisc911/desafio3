const express = require('express');
const router = express.Router();
const TransBAhorroController = require('../controllers/TransBancAhorroController');
const { authentication, isAdmin } = require('../middlewares/authentication');

router.get('/ahorros', TransBAhorroController.getAll);
router.get('/id/:id_usu', TransBAhorroController.getById);

module.exports = router;
