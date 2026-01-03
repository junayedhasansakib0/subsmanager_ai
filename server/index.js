/**
 * SubsManager AI - Backend Server
 * Main entry point for Express API server
 * 
 * Features:
 * - User Authentication (JWT)
 * - Email Verification
 * - Subscription CRUD
 * - Dashboard Analytics
 * - Multi-language support (EN/BN)
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// CORS Configuration
const getCorsOptions = () => {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  // Development: Allow multiple localhost origins
  if (isDevelopment) {
    const allowedOrigins = [
      'http://localhost:8080',
      'http://localhost:5173',
      'http://127.0.0.1:8080',
      'http://127.0.0.1:5173',
    ];
    
    // Add custom frontend URL if provided
    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(process.env.FRONTEND_URL);
    }
    
    return {
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, Postman, etc.) in development
        if (!origin && isDevelopment) {
          return callback(null, true);
        }
        
        // Check if origin is in allowed list
        if (origin && allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Range', 'X-Content-Range'],
      maxAge: 86400, // 24 hours - cache preflight requests
    };
  }
  
  // Production: Strict origin checking
  const productionOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : [];
  
  if (productionOrigins.length === 0) {
    console.warn('⚠️  WARNING: No FRONTEND_URL configured for production!');
  }
  
  return {
    origin: (origin, callback) => {
      if (!origin) {
        return callback(new Error('CORS: Origin header required in production'));
      }
      
      if (productionOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400,
  };
};

// Apply CORS middleware
app.use(cors(getCorsOptions()));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'SubsManager AI Backend is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Log CORS configuration
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🌐 CORS: Allowing origins:`);
    console.log(`   - http://localhost:8080`);
    console.log(`   - http://localhost:5173`);
    console.log(`   - http://127.0.0.1:8080`);
    console.log(`   - http://127.0.0.1:5173`);
    if (process.env.FRONTEND_URL) {
      console.log(`   - ${process.env.FRONTEND_URL} (custom)`);
    }
  } else {
    const origins = process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
      : ['Not configured'];
    console.log(`🌐 CORS: Production origins: ${origins.join(', ')}`);
  }
});

