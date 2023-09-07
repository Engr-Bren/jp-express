import React, { createContext, useContext, useEffect, useState } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

// Define the type for the user object
interface User {
  email: string;
  // Add other user-related properties as needed
}

// Create an AuthContext
export const AuthContext = createContext<{
  user: User | null;
  login: (formData: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const cookies = parseCookies();
  const token = cookies.token || null; // Use null as a default value if the cookie doesn't exist

  // Function to handle user login
  const login = async (formData: { email: string; password: string }) => {
    // Replace this with your actual login API call
    try {
      // Simulate successful login
      setCookie(null, 'token', 'your-access-token', {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });

      setUser({ email: formData.email });
      router.push('/profile'); // Redirect to the profile page
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    // Clear the session cookie to log out the user
    destroyCookie(null, 'token', { path: '/' });
    setUser(null);
    router.push('/login'); // Redirect to the login page after logout
  };

  // Check if the user is already authenticated
  useEffect(() => {
    if (token) {
      setUser({ email: 'user@example.com' }); // Replace with the user's email or data
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
