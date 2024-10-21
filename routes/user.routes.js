const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middlewares/authentication');

router.get('/getall', isAdmin, UserController.getAll);
router.get('/profile', UserController.getOneUser);
router.put('/login', UserController.login);
router.delete('/logout', authentication, UserController.logout);

module.exports = router;
