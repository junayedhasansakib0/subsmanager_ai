/**
 * User Model
 * Schema for user authentication and profile
 * 
 * Fields:
 * - name: User's full name
 * - email: Unique email address
 * - password: Hashed password (bcrypt)
 * - isEmailVerified: Email verification status
 * - emailVerifyToken: Token for email verification
 * - emailVerifyExpire: Token expiration time
 * - createdAt: Account creation timestamp
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't return password by default
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerifyToken: {
    type: String,
    select: false
  },
  emailVerifyExpire: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

/**
 * Hash password before saving
 */
userSchema.pre('save', async function(next) {
  // Only hash password if it's been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compare password method
 * @param {string} candidatePassword - Password to compare
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Generate email verification token
 * @returns {string} - Verification token
 */
userSchema.methods.generateEmailVerifyToken = function() {
  // Generate random token
  const token = crypto.randomBytes(32).toString('hex');

  // Hash token and save to database
  this.emailVerifyToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Set expiration (24 hours from now)
  const expireHours = parseInt(process.env.EMAIL_VERIFY_EXPIRE) || 24;
  this.emailVerifyExpire = Date.now() + expireHours * 60 * 60 * 1000;

  // Return plain token (not hashed) for email
  return token;
};

/**
 * Clear email verification token
 */
userSchema.methods.clearEmailVerifyToken = function() {
  this.emailVerifyToken = undefined;
  this.emailVerifyExpire = undefined;
};

const User = mongoose.model('User', userSchema);

export default User;

