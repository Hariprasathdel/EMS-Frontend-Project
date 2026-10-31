import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

// Create the Context
export const AuthContext = createContext(null);

// Custom Hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser && token) {
        try {
          // Optional: Verify token with backend
          // const userData = await authService.getCurrentUser();
          // setUser(userData);
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Token verification failed', error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  // Login Function
  const login = async (credentials, password) => {
    setError(null);
    // Support both login({ email, password }) and the existing login(email, password) call.
    const { email, password: suppliedPassword } =
      typeof credentials === 'object' && credentials !== null
        ? credentials
        : { email: credentials, password };

    try {
      const result = await authService.login(email, suppliedPassword);
      if (!result.success) {
        setError(result.error?.message || 'Invalid credentials. Please try again.');
        return {
          success: false,
          error: result.error
        };
      }

      const { user: authenticatedUser, token: authToken } = result.data ?? {};
      if (!authToken || !authenticatedUser) {
        setError('The server did not return a valid login session.');
        return {
          success: false,
          error: { message: 'The server did not return a valid login session.' }
        };
      }

      setUser(authenticatedUser);
      setToken(authToken);
      setError(null);
      return { success: true };
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || (status === 403
        ? 'Access denied by the server. Verify the account credentials and that this account is allowed to sign in.'
        : 'Login failed. Please check your credentials.');
      setError(message);
      return { 
        success: false, 
        error: {
          message
        }
      };
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const value = {
    user,
    error,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token && !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
