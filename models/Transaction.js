// models/Transaction.js
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit', 'withdraw', 'bet'], required: true },
amount: { type: Number, required: true },
  result: { type: String, enum: ['win', 'lose'], default: null }, // only for bets
  winnings: { type: Number, default: 0 } // only for bets
}, {
  timestamps: true // ✅ This automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Transaction', TransactionSchema);
