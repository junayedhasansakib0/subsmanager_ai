/**
 * Authentication Routes
 * All routes related to user authentication
 */

import express from 'express';
import {
  register,
  login,
  verifyEmail,
  resendVerification,
  getMe
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerification);

// Protected routes
router.get('/me', protect, getMe);

export default router;

