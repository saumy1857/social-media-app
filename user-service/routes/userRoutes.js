const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../../common/middleware/authMiddleware');

router.put('/users/:id', authMiddleware,userController.updateUser);
router.delete('/users/:id',authMiddleware, userController.deleteUser);
router.get('/users',authMiddleware, userController.listUsers);
router.get('/users/search', authMiddleware,userController.searchUserByName);

module.exports = router;
