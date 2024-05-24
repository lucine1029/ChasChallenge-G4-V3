import { useContext } from 'react';
import { AuthContext, AuthContextProps } from './AuthContext'; // Adjust the path if necessary

export const getToken = () => {
  return localStorage.getItem('token');
};

export const clearAuthTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
