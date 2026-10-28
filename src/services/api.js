// src/services/api.js
import axios from 'axios';

/**
 * Base URL from the Vite environment.
 * Defaults to the same-origin Vite proxy during local development.
 */
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  '/api';

const TIMEOUT =
  Number(import.meta.env.VITE_API_TIMEOUT) || 15000;

/* -------------------------------------------------------------------------- */
/*                              Axios Instance                                */
/* -------------------------------------------------------------------------- */
const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/* -------------------------------------------------------------------------- */
/*                           Request Interceptor                              */
/*        Attaches JWT token from localStorage on every request.              */
/* -------------------------------------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------------------------------- */
/*                           Response Interceptor                             */
/*        Unwraps data, handles 401 (logout), normalizes errors.              */
/* -------------------------------------------------------------------------- */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status;

    // Auto logout on unauthorized
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // Normalize error shape
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      'Something went wrong. Please try again.';

    return Promise.reject({
      status,
      message,
      original: error,
    });
  }
);

/* -------------------------------------------------------------------------- */
/*                            HTTP Helper Methods                             */
/* -------------------------------------------------------------------------- */
export const handleResponse = (response) => {
  const data = response?.data ?? response;
  if (data?.success === false) {
    throw new Error(data.message || 'Operation failed');
  }
  return data;
};

export const handleError = (error) => {
  const original = error?.original ?? error;
  if (error?.status !== undefined || original?.response) {
    return {
      success: false,
      message:
        error?.message ||
        original?.response?.data?.message ||
        original?.response?.data?.error ||
        'Server error occurred',
      status: error?.status ?? original.response.status,
      data: original?.response?.data,
    };
  }

  if (original?.request) {
    return {
      success: false,
      message: 'No response from server. Please check your connection.',
      status: 0,
    };
  }

  return {
    success: false,
    message: error?.message || 'An unexpected error occurred',
    status: -1,
  };
};

export const http = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
};

/* -------------------------------------------------------------------------- */
/*                          Utility: Build Query String                       */
/* -------------------------------------------------------------------------- */
export const buildQuery = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.append(key, value);
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
};

/* -------------------------------------------------------------------------- */
/*                            Utility: Upload File                            */
/* -------------------------------------------------------------------------- */
export const uploadFile = (url, file, fieldName = 'file', extra = {}) => {
  const formData = new FormData();
  formData.append(fieldName, file);
  Object.entries(extra).forEach(([k, v]) => formData.append(k, v));

  return api.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export { BASE_URL };
export default api;
