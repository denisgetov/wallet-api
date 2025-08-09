const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, auth denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id; // attach user ID
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;


// middleware/authMiddleware.js (DEV MODE - No Auth)

// const auth = (req, res, next) => {
//   req.user = 'dev-user-id'; 
//   next();
// };

// module.exports = auth;
