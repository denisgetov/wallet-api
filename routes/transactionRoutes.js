const express = require('express');
const router = express.Router({ mergeParams: true }); // so you can access :userId param

const { getTransactionHistory } = require('../controllers/transactionController');

router.get('/', getTransactionHistory);

module.exports = router;
