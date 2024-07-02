const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'secretKey', { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, 'secretKey');
};

module.exports = { generateToken, verifyToken };
