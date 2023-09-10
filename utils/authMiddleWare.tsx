// authMiddleware.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const userId = Cookies.get('userId');
      if (!userId) {
        // Redirect unauthenticated users to login page
        router.push('/login');
      } else {
        // Set authentication status to true
        setIsAuthenticated(true);
      }
    }, []);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};
