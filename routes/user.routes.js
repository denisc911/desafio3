const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication, isAdmin } = require('../middlewares/authentication');

router.get('/profile', UserController.getAll);
router.post('/login', UserController.login);
router.delete('/logout', authentication, UserController.logout);

module.exports = router;
