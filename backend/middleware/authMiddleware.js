const jwt = require('jsonwebtoken');

// Simple JWT secret
const JWT_SECRET = 'apoorva';

// Middleware to authenticate JWT tokens
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];  // Bearer <token>
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);  // Invalid token
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);  // No token provided
  }
};

// Middleware for role-based access control
const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403);  // Forbidden
    }
    next();
  };
};

module.exports = { authenticateJWT, authorizeRoles };
