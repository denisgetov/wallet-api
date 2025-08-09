// controllers/transactionController.js
const Transaction = require('../models/Transaction');

// GET /users/:userId/transactions
exports.getTransactionHistory = async (req, res) => {
  const { userId } = req.params;

  try {
const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
