const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middlewares/authentication');

router.get('/allprofiles', isAdmin, UserController.getAll); 
router.get('/profile', authentication, UserController.getById); //CREAR EL ENDPOINT EN EL USER CONTROLLER
router.post('/login', UserController.login);

module.exports = router;
