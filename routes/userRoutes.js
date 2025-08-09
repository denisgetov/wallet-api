const express = require('express');
const router = express.Router();
const { registerUser, depositMoney, withdrawMoney, placeBet, getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.post('/users', auth, registerUser);
router.post('/users/:userId/deposit', auth, depositMoney);
router.get('/users', getAllUsers);
router.post('/users/:userId/withdraw', auth, withdrawMoney);
router.post('/users/:userId/bet', auth, placeBet);

module.exports = router;
