Hello just creating a wallet api (iGaming microservice)

// HOW TO RUN

clone repo 
cd wallet-api
npm install
install dependencies (npm install express mongoose dotenv cors)
Create a `.env` file and add your MongoDB URI: (MONGO_URI=mongodb://localhost:27017/wallet-db)
start server - node app.js


// What this project includes (features)

 Register user & login
 Deposit
 Withdraw
 Placing Bet
 View all users
 jest testing

 // Tech Stack 

 Node.js
Express
MongoDB with Mongoose
dotenv
CORS
Postman (for testing)

✅ Wallet API — Endpoint Summary
📦 User Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and receive JWT

👤 User Management
Method	Endpoint	Description
POST	/api/users	Create user (protected)
GET	/api/users	Get all users

💰 Wallet Operations
Method	Endpoint	Description
POST	/api/users/:userId/deposit	Deposit funds (protected)
POST	/api/users/:userId/withdraw	Withdraw funds (protected)
POST	/api/users/:userId/bet	Place a bet (protected)

📊 Transaction History
Method	Endpoint	Description
GET	/api/users/:userId/transactions	Get user’s transaction history (protected if auth added)