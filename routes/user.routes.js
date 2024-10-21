const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middlewares/authentication');

router.get('/getall', isAdmin, UserController.getAll);
router.get('/profile', UserController.getAll);
router.put('/login', UserController.login);
router.delete('/logout', authentication, UserController.logout); c2fd26d64b29e498ae496fb64b04f072a1a88bb8

module.exports = router;
