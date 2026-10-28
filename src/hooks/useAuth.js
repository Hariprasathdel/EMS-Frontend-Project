import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook for Authentication.
 * Provides user data, login/logout functions, and role-checking helpers.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Ensure the hook is used inside the AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Helper: Check if user has a specific role
  const hasRole = (role) => {
    return context.user?.role === role;
  };

  // Helper: Check if user is a Super Admin
  const isAdmin = () => {
    return context.user?.role === 'Super Admin' || context.user?.role === 'Admin';
  };

  return {
    ...context, // Spreads user, token, login, logout, etc.
    hasRole,
    isAdmin
  };
};

export default useAuth;
