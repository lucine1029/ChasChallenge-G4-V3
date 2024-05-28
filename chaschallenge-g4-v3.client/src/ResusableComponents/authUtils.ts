import { useContext } from 'react';
import { AuthContext, AuthContextProps } from './AuthContext'; // Adjust the path if necessary

// Token Management
export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const setToken = (token: string) => {
  sessionStorage.setItem('token', token);
};

export const clearToken = () => {
  sessionStorage.removeItem('token');
};

// User ID Management
export const getUserId = () => {
  return sessionStorage.getItem('userId');
};

export const setUserId = (userId: string) => {
  sessionStorage.setItem('userId', userId);
};

export const clearUserId = () => {
  sessionStorage.removeItem('userId');
};

// Authentication State Management
export const isAuthenticated = () => {
  return !!getToken();
};

// Clear all authentication data
export const clearAuthData = () => {
  clearToken();
  clearUserId();
};

// Use Auth Hook
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Login and Logout
export const login = (token: string, userId: string) => {
  setToken(token);
  setUserId(userId);
};

export const logout = () => {
  clearAuthData();
};
