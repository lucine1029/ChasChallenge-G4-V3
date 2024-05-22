import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { getToken, clearAuthTokens } from './authUtils';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!getToken()
  );

  const login = (token: string, userId: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearAuthTokens();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export type { AuthContextProps };
