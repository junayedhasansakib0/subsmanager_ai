/**
 * Generate JWT Token
 * Creates a signed JWT token for user authentication
 * 
 * @param {string} userId - User ID to encode in token
 * @returns {string} - JWT token
 */

import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};

export default generateToken;

