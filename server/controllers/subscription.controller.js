/**
 * Subscription Controller
 * Handles CRUD operations for subscriptions
 * 
 * Features:
 * - Create subscription
 * - Get all subscriptions (with pagination, filter, search)
 * - Get single subscription
 * - Update subscription
 * - Delete subscription
 * - Auto-calculate status based on renewal date
 */

import Subscription from '../models/Subscription.model.js';

/**
 * Helper: Calculate subscription status based on renewal date
 * @param {Date} renewalDate - Renewal date
 * @returns {string} - Status: 'active', 'expiring', or 'expired'
 */
const calculateStatus = (renewalDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const renewal = new Date(renewalDate);
  renewal.setHours(0, 0, 0, 0);
  
  const daysUntilRenewal = Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
  
  if (daysUntilRenewal < 0) {
    return 'expired';
  } else if (daysUntilRenewal <= 7) {
    return 'expiring';
  } else {
    return 'active';
  }
};

/**
 * @route   POST /api/v1/subscriptions
 * @desc    Create a new subscription
 * @access  Private
 */
export const createSubscription = async (req, res) => {
  try {
    const {
      name,
      cost,
      currency = 'USD',
      category,
      categoryBn,
      renewalDate,
      icon = '📦',
      color = '#667eea'
    } = req.body;

    // Validation
    if (!name || !cost || !category || !renewalDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, cost, category, and renewal date'
      });
    }

    // Calculate status based on renewal date
    const status = calculateStatus(renewalDate);

    // Create subscription
    const subscription = await Subscription.create({
      user: req.user.id,
      name,
      cost: parseFloat(cost),
      currency: currency.toUpperCase(),
      category,
      categoryBn: categoryBn || category,
      renewalDate: new Date(renewalDate),
      status,
      icon,
      color
    });

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: {
        subscription: {
          id: subscription._id,
          name: subscription.name,
          cost: subscription.cost,
          currency: subscription.currency,
          category: subscription.category,
          categoryBn: subscription.categoryBn,
          renewalDate: subscription.renewalDate.toISOString().split('T')[0],
          status: subscription.status,
          icon: subscription.icon,
          color: subscription.color
        }
      }
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create subscription'
    });
  }
};

/**
 * @route   GET /api/v1/subscriptions
 * @desc    Get all subscriptions for current user
 * @access  Private
 * 
 * Query params:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10)
 * - status: Filter by status (active, expired, expiring)
 * - category: Filter by category
 * - search: Search by name
 * - sort: Sort field (default: renewalDate)
 * - order: Sort order (asc, desc) (default: asc)
 */
export const getSubscriptions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      category,
      search,
      sort = 'renewalDate',
      order = 'asc'
    } = req.query;

    // Build query
    const query = { user: req.user.id };

    // Filter by status
    if (status && ['active', 'expired', 'expiring'].includes(status)) {
      query.status = status;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sort
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj = { [sort]: sortOrder };

    // Execute query
    const subscriptions = await Subscription.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Subscription.countDocuments(query);

    // Format response
    const formattedSubscriptions = subscriptions.map(sub => ({
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
        subscriptions: formattedSubscriptions,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get subscriptions'
    });
  }
};

/**
 * @route   GET /api/v1/subscriptions/:id
 * @desc    Get single subscription
 * @access  Private
 */
export const getSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findOne({
      _id: id,
      user: req.user.id
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        subscription: {
          id: subscription._id,
          name: subscription.name,
          cost: subscription.cost,
          currency: subscription.currency,
          category: subscription.category,
          categoryBn: subscription.categoryBn,
          renewalDate: subscription.renewalDate.toISOString().split('T')[0],
          status: subscription.status,
          icon: subscription.icon,
          color: subscription.color
        }
      }
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get subscription'
    });
  }
};

/**
 * @route   PUT /api/v1/subscriptions/:id
 * @desc    Update subscription
 * @access  Private
 */
export const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      cost,
      currency,
      category,
      categoryBn,
      renewalDate,
      icon,
      color
    } = req.body;

    // Find subscription
    let subscription = await Subscription.findOne({
      _id: id,
      user: req.user.id
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Update fields
    if (name) subscription.name = name;
    if (cost !== undefined) subscription.cost = parseFloat(cost);
    if (currency) subscription.currency = currency.toUpperCase();
    if (category) subscription.category = category;
    if (categoryBn !== undefined) subscription.categoryBn = categoryBn;
    if (renewalDate) {
      subscription.renewalDate = new Date(renewalDate);
      // Recalculate status if renewal date changed
      subscription.status = calculateStatus(renewalDate);
    }
    if (icon) subscription.icon = icon;
    if (color) subscription.color = color;

    await subscription.save();

    res.status(200).json({
      success: true,
      message: 'Subscription updated successfully',
      data: {
        subscription: {
          id: subscription._id,
          name: subscription.name,
          cost: subscription.cost,
          currency: subscription.currency,
          category: subscription.category,
          categoryBn: subscription.categoryBn,
          renewalDate: subscription.renewalDate.toISOString().split('T')[0],
          status: subscription.status,
          icon: subscription.icon,
          color: subscription.color
        }
      }
    });
  } catch (error) {
    console.error('Update subscription error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update subscription'
    });
  }
};

/**
 * @route   DELETE /api/v1/subscriptions/:id
 * @desc    Delete subscription
 * @access  Private
 */
export const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findOneAndDelete({
      _id: id,
      user: req.user.id
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subscription deleted successfully'
    });
  } catch (error) {
    console.error('Delete subscription error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete subscription'
    });
  }
};

/**
 * @route   GET /api/v1/subscriptions/categories/list
 * @desc    Get list of all categories for current user
 * @access  Private
 */
export const getCategories = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id })
      .select('category categoryBn')
      .distinct('category');

    // Get unique categories with their Bangla translations
    const categories = await Subscription.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$category',
          categoryBn: { $first: '$categoryBn' }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          nameBn: '$categoryBn'
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get categories'
    });
  }
};
