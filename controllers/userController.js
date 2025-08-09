const User = require('../models/User');
const Transaction = require('../models/Transaction');

// POST /users - Register a new user
exports.registerUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const newUser = new User({ username });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /users/:userId/deposit - Deposit money to user wallet
exports.depositMoney = async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;

  // Convert amount to number to prevent string concatenation
  const numericAmount = Number(amount);

  if (!numericAmount || numericAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.balance += numericAmount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      userId,
      type: 'deposit',
      amount: numericAmount
    });
    await transaction.save();

    res.status(200).json({ message: 'Deposit successful', balance: user.balance });
  } catch (error) {
    console.error('Error depositing money:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /users/:userId/withdraw - Withdraw money from user wallet
exports.withdrawMoney = async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;

  // Convert amount to number for consistency
  const numericAmount = Number(amount);

  if (!numericAmount || numericAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.balance < numericAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    user.balance -= numericAmount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      userId,
      type: 'withdraw',
      amount: numericAmount
    });
    await transaction.save();

    res.status(200).json({ message: 'Withdrawal successful', balance: user.balance });
  } catch (error) {
    console.error('Error withdrawing money:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /users/:userId/bet - Place a bet
exports.placeBet = async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;

  // Convert amount to number for consistency
  const numericAmount = Number(amount);

  if (!numericAmount || numericAmount <= 0) {
    return res.status(400).json({ error: 'Bet amount must be a positive number' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.balance < numericAmount) {
      return res.status(400).json({ error: 'Insufficient balance to place bet' });
    }

    // Deduct bet amount
    user.balance -= numericAmount;

    // Simulate outcome: 50% chance of win
    const didWin = Math.random() < 0.5;

    let winnings = 0;
    if (didWin) {
      winnings = numericAmount * 2;
      user.balance += winnings;
    }

    await user.save();

    // Create transaction record for the bet
    const transaction = new Transaction({
      userId,
      type: 'bet',
      amount: numericAmount,
      result: didWin ? 'win' : 'lose',
      winnings
    });
    await transaction.save();

    res.status(200).json({
      result: didWin ? 'win' : 'lose',
      winnings,
      balance: user.balance
    });
  } catch (error) {
    console.error('Error placing bet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /users - Return all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};