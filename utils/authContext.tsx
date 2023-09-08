import { createContext, useContext, useEffect, useState, ReactNode } from 'react'; // Import ReactNode
import Cookies from 'js-cookie';

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => { // Add children prop to the type definition
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    Cookies.set('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);

    // Broadcast the logout event to other tabs using localStorage
    window.localStorage.setItem('logout', Date.now().toString());
  };

  useEffect(() => {
    // Listen for the logout event in other tabs and log out
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'logout') {
        logout();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
