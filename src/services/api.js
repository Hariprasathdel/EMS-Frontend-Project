
import axios from 'axios';


// Use Vite's same-origin proxy in development. This keeps browser requests on
// the frontend origin and lets vite.config.js forward them to the API server.
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
    if (token && !config.skipAuth) {
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
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    // Keep authentication failures on the login form so it can display the
    // server's message. A 401 on a protected request still clears the session.
    if (error.response && error.response.status === 401 && !error.config?.skipAuth) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Handle 403 Forbidden
    if (error.response && error.response.status === 403) {
      console.error('You do not have permission to perform this action');
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
      message: error.response.data.message || 'Server error occurred',
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
