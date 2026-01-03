/**
 * Subscription Routes
 * All routes related to subscription management
 */

import express from 'express';
import {
  createSubscription,
  getSubscriptions,
  getSubscription,
  updateSubscription,
  deleteSubscription,
  getCategories
} from '../controllers/subscription.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All subscription routes require authentication
router.use(protect);

// Routes
router.post('/', createSubscription);
router.get('/', getSubscriptions);
router.get('/categories/list', getCategories);
router.get('/:id', getSubscription);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;
