// components/AuthenticatedComponent.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthentication } from '../hooks/useauthentication';
import Swal from 'sweetalert2';

function AuthenticatedComponent() {
  const { isAuthenticated, isLoading, isError, logout } = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // User is authenticated, proceed
      } else {
        // User is not authenticated, show an error and redirect to login
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Please log in to access this page',
        }).then(() => {
          router.push('/login');
        });
      }
    }
  }, [isLoading, isAuthenticated, router]);

  if (isError) {
    return <div>Error occurred</div>;
  }

  return null;
}

export default AuthenticatedComponent;
