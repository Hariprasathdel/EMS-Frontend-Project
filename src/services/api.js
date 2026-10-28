
import axios from 'axios';


// Use Vite's /api proxy in development (configured for the backend on port 5000).
// Set VITE_API_URL to an absolute API URL when connecting to another environment.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor - Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // Public auth requests (especially login) must not inherit a stale token
    // from a previous session. Some APIs reject that token before checking the
    // submitted credentials, which makes a valid login appear forbidden.
    if (!config.skipAuth && token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.skipAuth) {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Helper methods
export const handleResponse = (response) => {
  if (response.data && response.data.success === false) {
    throw new Error(response.data.message || 'Operation failed');
  }
  return response.data;
};

export const handleError = (error) => {
  if (error.response) {
    // Server responded with error
    return {
      success: false,
      message: error.response.data?.message || error.response.data?.error || 'Server error occurred',
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    // Request made but no response
    return {
      success: false,
      message: 'No response from server. Please check your connection.',
      status: 0
    };
  } else {
    // Something else happened
    return {
      success: false,
      message: error.message || 'An unexpected error occurred',
      status: -1
    };
  }
};

export default api;
