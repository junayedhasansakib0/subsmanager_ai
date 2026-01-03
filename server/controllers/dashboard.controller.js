/**
 * Dashboard Controller
 * Handles dashboard statistics and analytics
 * 
 * Features:
 * - Overall statistics (active, expired, monthly cost, etc.)
 * - Monthly spending data
 * - Category breakdown
 * - Upcoming renewals
 */

import Subscription from '../models/Subscription.model.js';

/**
 * @route   GET /api/v1/dashboard/stats
 * @desc    Get dashboard statistics
 * @access  Private
 */
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all subscriptions for user
    const subscriptions = await Subscription.find({ user: userId });

    // Calculate statistics
    const activeSubscriptions = subscriptions.filter(
      sub => sub.status === 'active'
    ).length;

    const expiredSubscriptions = subscriptions.filter(
      sub => sub.status === 'expired'
    ).length;

    // Calculate monthly cost (sum of all active subscriptions)
    const monthlyCost = subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((sum, sub) => sum + sub.cost, 0);

    // Calculate upcoming renewals (within 7 days)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const upcomingRenewals = subscriptions.filter(sub => {
      const renewalDate = new Date(sub.renewalDate);
      renewalDate.setHours(0, 0, 0, 0);
      return renewalDate >= today && renewalDate <= sevenDaysFromNow && sub.status !== 'expired';
    }).length;

    // Calculate yearly spend (monthly cost * 12)
    const yearlySpend = monthlyCost * 12;

    res.status(200).json({
      success: true,
      data: {
        stats: {
          activeSubscriptions,
          expiredSubscriptions,
          monthlyCost: parseFloat(monthlyCost.toFixed(2)),
          upcomingRenewals,
          yearlySpend: parseFloat(yearlySpend.toFixed(2))
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get dashboard statistics'
    });
  }
};

/**
 * @route   GET /api/v1/dashboard/monthly-spending
 * @desc    Get monthly spending data for charts
 * @access  Private
 * 
 * Query params:
 * - months: Number of months to return (default: 7)
 */
export const getMonthlySpending = async (req, res) => {
  try {
    const userId = req.user.id;
    const months = parseInt(req.query.months) || 7;

    // Get all active subscriptions
    const subscriptions = await Subscription.find({
      user: userId,
      status: 'active'
    });

    // Calculate monthly total (sum of all active subscriptions)
    const monthlyTotal = subscriptions.reduce((sum, sub) => sum + sub.cost, 0);

    // Generate last N months data
    const monthlyData = [];
    const monthNames = [
      { en: 'Jan', bn: 'জানু' },
      { en: 'Feb', bn: 'ফেব্রু' },
      { en: 'Mar', bn: 'মার্চ' },
      { en: 'Apr', bn: 'এপ্রিল' },
      { en: 'May', bn: 'মে' },
      { en: 'Jun', bn: 'জুন' },
      { en: 'Jul', bn: 'জুলা' },
      { en: 'Aug', bn: 'আগস্ট' },
      { en: 'Sep', bn: 'সেপ্টে' },
      { en: 'Oct', bn: 'অক্টো' },
      { en: 'Nov', bn: 'নভে' },
      { en: 'Dec', bn: 'ডিসে' }
    ];

    const today = new Date();
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      const monthIndex = date.getMonth();

      monthlyData.push({
        month: monthNames[monthIndex].en,
        monthBn: monthNames[monthIndex].bn,
        amount: parseFloat(monthlyTotal.toFixed(2))
      });
    }

    res.status(200).json({
      success: true,
      data: {
        monthlySpending: monthlyData
      }
    });
  } catch (error) {
    console.error('Get monthly spending error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get monthly spending data'
    });
  }
};

/**
 * @route   GET /api/v1/dashboard/category-breakdown
 * @desc    Get spending breakdown by category
 * @access  Private
 */
export const getCategoryBreakdown = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all active subscriptions grouped by category
    const categoryData = await Subscription.aggregate([
      { $match: { user: userId, status: 'active' } },
      {
        $group: {
          _id: '$category',
          categoryBn: { $first: '$categoryBn' },
          amount: { $sum: '$cost' }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          nameBn: '$categoryBn',
          amount: { $round: ['$amount', 2] }
        }
      },
      { $sort: { amount: -1 } }
    ]);

    // Calculate total for percentage
    const total = categoryData.reduce((sum, cat) => sum + cat.amount, 0);

    // Add percentage to each category
    const categoryBreakdown = categoryData.map(cat => ({
      name: cat.name,
      nameBn: cat.nameBn || cat.name,
      amount: cat.amount,
      percentage: total > 0 ? Math.round((cat.amount / total) * 100) : 0
    }));

    res.status(200).json({
      success: true,
      data: {
        categoryBreakdown
      }
    });
  } catch (error) {
    console.error('Get category breakdown error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get category breakdown'
    });
  }
};

/**
 * @route   GET /api/v1/dashboard/upcoming-renewals
 * @desc    Get subscriptions renewing soon
 * @access  Private
 * 
 * Query params:
 * - days: Number of days ahead to check (default: 7)
 * - limit: Maximum number of results (default: 10)
 */
export const getUpcomingRenewals = async (req, res) => {
  try {
    const userId = req.user.id;
    const days = parseInt(req.query.days) || 7;
    const limit = parseInt(req.query.limit) || 10;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + days);

    // Get subscriptions renewing within specified days
    const upcomingRenewals = await Subscription.find({
      user: userId,
      renewalDate: {
        $gte: today,
        $lte: futureDate
      },
      status: { $ne: 'expired' }
    })
      .sort({ renewalDate: 1 })
      .limit(limit);

    const formattedRenewals = upcomingRenewals.map(sub => ({
      id: sub._id,
      name: sub.name,
      cost: sub.cost,
      currency: sub.currency,
      category: sub.category,
      categoryBn: sub.categoryBn,
      renewalDate: sub.renewalDate.toISOString().split('T')[0],
      status: sub.status,
      icon: sub.icon,
      color: sub.color,
      daysUntilRenewal: Math.ceil(
        (sub.renewalDate - today) / (1000 * 60 * 60 * 24)
      )
    }));

    res.status(200).json({
      success: true,
      data: {
        upcomingRenewals: formattedRenewals
      }
    });
  } catch (error) {
    console.error('Get upcoming renewals error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get upcoming renewals'
    });
  }
};

/**
 * @route   GET /api/v1/dashboard/summary
 * @desc    Get complete dashboard summary (all data in one call)
 * @access  Private
 */
export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all data in parallel
    const [
      subscriptions,
      categoryData
    ] = await Promise.all([
      Subscription.find({ user: userId }),
      Subscription.aggregate([
        { $match: { user: userId, status: 'active' } },
        {
          $group: {
            _id: '$category',
            categoryBn: { $first: '$categoryBn' },
            amount: { $sum: '$cost' }
          }
        }
      ])
    ]);

    // Calculate stats
    const activeSubscriptions = subscriptions.filter(
      sub => sub.status === 'active'
    ).length;
    const expiredSubscriptions = subscriptions.filter(
      sub => sub.status === 'expired'
    ).length;
    const monthlyCost = subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((sum, sub) => sum + sub.cost, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const upcomingRenewals = subscriptions.filter(sub => {
      const renewalDate = new Date(sub.renewalDate);
      renewalDate.setHours(0, 0, 0, 0);
      return renewalDate >= today && renewalDate <= sevenDaysFromNow && sub.status !== 'expired';
    }).length;

    const yearlySpend = monthlyCost * 12;

    // Monthly spending (last 7 months)
    const monthlyTotal = monthlyCost;
    const monthNames = [
      { en: 'Jan', bn: 'জানু' },
      { en: 'Feb', bn: 'ফেব্রু' },
      { en: 'Mar', bn: 'মার্চ' },
      { en: 'Apr', bn: 'এপ্রিল' },
      { en: 'May', bn: 'মে' },
      { en: 'Jun', bn: 'জুন' },
      { en: 'Jul', bn: 'জুলা' },
      { en: 'Aug', bn: 'আগস্ট' },
      { en: 'Sep', bn: 'সেপ্টে' },
      { en: 'Oct', bn: 'অক্টো' },
      { en: 'Nov', bn: 'নভে' },
      { en: 'Dec', bn: 'ডিসে' }
    ];

    const monthlySpending = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      const monthIndex = date.getMonth();
      monthlySpending.push({
        month: monthNames[monthIndex].en,
        monthBn: monthNames[monthIndex].bn,
        amount: parseFloat(monthlyTotal.toFixed(2))
      });
    }

    // Category breakdown
    const total = categoryData.reduce((sum, cat) => sum + cat.amount, 0);
    const categoryBreakdown = categoryData.map(cat => ({
      name: cat._id,
      nameBn: cat.categoryBn || cat._id,
      amount: parseFloat(cat.amount.toFixed(2)),
      percentage: total > 0 ? Math.round((cat.amount / total) * 100) : 0
    }));

    // Upcoming renewals (next 7 days)
    const upcomingRenewalsList = subscriptions
      .filter(sub => {
        const renewalDate = new Date(sub.renewalDate);
        renewalDate.setHours(0, 0, 0, 0);
        return renewalDate >= today && renewalDate <= sevenDaysFromNow && sub.status !== 'expired';
      })
      .sort((a, b) => a.renewalDate - b.renewalDate)
      .slice(0, 10)
      .map(sub => ({
        id: sub._id,
        name: sub.name,
        cost: sub.cost,
        currency: sub.currency,
        category: sub.category,
        categoryBn: sub.categoryBn,
        renewalDate: sub.renewalDate.toISOString().split('T')[0],
        status: sub.status,
        icon: sub.icon,
        color: sub.color
      }));

    res.status(200).json({
      success: true,
      data: {
        stats: {
          activeSubscriptions,
          expiredSubscriptions,
          monthlyCost: parseFloat(monthlyCost.toFixed(2)),
          upcomingRenewals,
          yearlySpend: parseFloat(yearlySpend.toFixed(2))
        },
        monthlySpending,
        categoryBreakdown,
        upcomingRenewals: upcomingRenewalsList
      }
    });
  } catch (error) {
    console.error('Get dashboard summary error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get dashboard summary'
    });
  }
};
