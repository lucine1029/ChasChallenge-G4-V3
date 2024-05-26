// import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { getToken, clearAuthTokens } from './authUtils';

// interface AuthContextProps {
//   isAuthenticated: boolean;
//   login: (token: string, userId: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!getToken());

//   const login = (token: string, userId: string) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('userId', userId);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     clearAuthTokens();
//     setIsAuthenticated(false);
//   };

//   useEffect(() => {
//     const token = getToken();
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
// export type { AuthContextProps };



import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getToken, clearAuthTokens } from './authUtils';

interface AuthContextProps {
  isAuthenticated: boolean;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!getToken());
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem('userId'));

  const login = (token: string, userId: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setUserId(userId);
  };

  const logout = () => {
    clearAuthTokens();
    setIsAuthenticated(false);
    setUserId(null);
  };

  useEffect(() => {
    const token = getToken();
    const storedUserId = localStorage.getItem('userId');
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
