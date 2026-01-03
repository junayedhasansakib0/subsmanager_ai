/**
 * Subscription Model
 * Schema for user subscriptions
 * 
 * Fields:
 * - user: Reference to User
 * - name: Subscription name
 * - cost: Monthly cost
 * - currency: Currency code (USD, BDT, etc.)
 * - category: Category (English)
 * - categoryBn: Category (Bangla)
 * - renewalDate: Next renewal date
 * - status: active | expired | expiring
 * - icon: Emoji icon
 * - color: Hex color code
 * - createdAt: Creation timestamp
 */

import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  cost: {
    type: Number,
    required: [true, 'Cost is required'],
    min: [0, 'Cost cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true,
    maxlength: [3, 'Currency code must be 3 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  categoryBn: {
    type: String,
    trim: true
  },
  renewalDate: {
    type: Date,
    required: [true, 'Renewal date is required']
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'expiring'],
    default: 'active'
  },
  icon: {
    type: String,
    default: '📦'
  },
  color: {
    type: String,
    default: '#667eea',
    match: [/^#[0-9A-F]{6}$/i, 'Color must be a valid hex code']
  }
}, {
  timestamps: true
});

// Index for faster queries
subscriptionSchema.index({ user: 1, renewalDate: 1 });
subscriptionSchema.index({ user: 1, status: 1 });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;

