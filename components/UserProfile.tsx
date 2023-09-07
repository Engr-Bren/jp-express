// components/Profile/UserProfile.tsx

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../util/auth';

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth(); // You'll implement useAuth later
  const { userId } = router.query; // Access userId from the dynamic route

  // Define a fetcher function to fetch user data based on userId
  const fetcher = async (url: string) => {
    // Replace with your actual API call to fetch user data by userId
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  };

  // Use SWR to fetch and cache user data
  const { data, error } = useSWR(`/api/user/${userId}`, fetcher);

  useEffect(() => {
    // Redirect to the login page if the user is not authenticated
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    // User is not authenticated, so no need to render the profile
    return null;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  if (!data) {
    // Data is loading, show a loading indicator
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  const { username, email } = data; // Replace with the actual user data fields

  return (
    <Container>
      <Typography variant="h2">User Profile</Typography>
      <Typography variant="h6">Username: {username}</Typography>
      <Typography variant="h6">Email: {email}</Typography>
    </Container>
  );
};

export default UserProfile;
