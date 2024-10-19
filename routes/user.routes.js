const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middlewares/authentication');

// Ruta para obtener todos los perfiles, protegida con autenticación
router.get('/profile', authentication, UserController.getAll);


// Ruta para hacer login de usuarios (no requiere autenticación)
router.post('/login', UserController.login);

// Puedes añadir más rutas protegidas aquí, por ejemplo para administrar usuarios
// router.delete('/user/:id', authentication, isAdmin, UserController.deleteUser);

module.exports = router;
