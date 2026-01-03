/**
 * API Service
 * Centralized axios configuration and API calls
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string; language?: string }) =>
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  verifyEmail: (token: string) =>
    api.get(`/auth/verify-email/${token}`),
  
  resendVerification: (data: { email: string; language?: string }) =>
    api.post('/auth/resend-verification', data),
  
  getMe: () =>
    api.get('/auth/me'),
};

// Subscription API
export const subscriptionAPI = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }) => api.get('/subscriptions', { params }),
  
  getOne: (id: string) =>
    api.get(`/subscriptions/${id}`),
  
  create: (data: {
    name: string;
    cost: number;
    currency?: string;
    category: string;
    categoryBn?: string;
    renewalDate: string;
    icon?: string;
    color?: string;
  }) => api.post('/subscriptions', data),
  
  update: (id: string, data: Partial<{
    name: string;
    cost: number;
    currency: string;
    category: string;
    categoryBn: string;
    renewalDate: string;
    icon: string;
    color: string;
  }>) => api.put(`/subscriptions/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/subscriptions/${id}`),
  
  getCategories: () =>
    api.get('/subscriptions/categories/list'),
};

// Dashboard API
export const dashboardAPI = {
  getSummary: () =>
    api.get('/dashboard/summary'),
  
  getStats: () =>
    api.get('/dashboard/stats'),
  
  getMonthlySpending: (months?: number) =>
    api.get('/dashboard/monthly-spending', { params: { months } }),
  
  getCategoryBreakdown: () =>
    api.get('/dashboard/category-breakdown'),
  
  getUpcomingRenewals: (days?: number, limit?: number) =>
    api.get('/dashboard/upcoming-renewals', { params: { days, limit } }),
};

export default api;

