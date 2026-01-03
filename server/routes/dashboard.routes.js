/**
 * Dashboard Routes
 * All routes related to dashboard analytics
 */

import express from 'express';
import {
  getDashboardStats,
  getMonthlySpending,
  getCategoryBreakdown,
  getUpcomingRenewals,
  getDashboardSummary
} from '../controllers/dashboard.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All dashboard routes require authentication
router.use(protect);

// Routes
router.get('/summary', getDashboardSummary); // Get all dashboard data at once
router.get('/stats', getDashboardStats);
router.get('/monthly-spending', getMonthlySpending);
router.get('/category-breakdown', getCategoryBreakdown);
router.get('/upcoming-renewals', getUpcomingRenewals);

export default router;
