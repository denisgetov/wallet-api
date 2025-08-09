// app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
// const bonusRoutes = require('./routes/bonusRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/authRoutes');

// Routes
app.use('/api', userRoutes);
app.use('/api/users/:userId/transactions', transactionRoutes);
app.use('/api/auth', authRoutes); // add this
// app.use('/bonus', bonusRoutes);

// Test route
app.get('/', (req, res) => res.send('Wallet API running!'));

// Export the app for use in server.js or test environments
module.exports = app;
