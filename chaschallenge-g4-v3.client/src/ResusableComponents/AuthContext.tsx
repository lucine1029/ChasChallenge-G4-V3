import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {
  getToken,
  getUserId as fetchUserId,
  clearAuthData,
  setToken,
  setUserId as storeUserId,
} from './authUtils';

interface AuthContextProps {
  isAuthenticated: boolean;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!getToken());
  const [userId, setUserId] = useState<string | null>(() => fetchUserId());

  const login = (token: string, userId: string) => {
    setToken(token);
    storeUserId(userId);
    setIsAuthenticated(true);
    setUserId(userId);
  };

  const logout = () => {
    clearAuthData();
    setIsAuthenticated(false);
    setUserId(null);
  };

  useEffect(() => {
    const token = getToken();
    const storedUserId = fetchUserId();
    if (token && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
    } else {
      setIsAuthenticated(false);
      setUserId(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export type { AuthContextProps };
