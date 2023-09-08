
// components/Profile.tsx
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Paper, Typography, Grid, makeStyles, Avatar } from '@mui/material';
import styles from '../src/app/page.module.css';

// Define the User interface based on your user data structure
interface User {
  userId: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
}

const Profile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve user data from cookies based on userId
    const userDataFromCookies = Cookies.get("userAccounts");

    if (userDataFromCookies) {
        // Parse the user data from the cookie (assuming it's stored as an array of users)
        const userAccounts: User[] = JSON.parse(userDataFromCookies);
  
        // Find the user with the matching userId
        const foundUser = userAccounts.find((user) => user.userId === userId);
  
        if (foundUser) {
          setUser(foundUser);
        } else {
          // Handle the case where the user with the specified userId is not found
          setUser(null);
        }
      } else {
        // Handle the case where user data is not found in cookies
        setUser(null);
      }
    }, [userId]);
  return (
    <Container maxWidth="md">
      <Paper elevation={10} style={{ padding: '30px', marginTop: '20px' , backgroundColor: '#018a2a' , color: '#ffe600'}}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <Avatar alt="User Avatar" src="/man.png" style={{ width: '150px', height: '150px' }} />
        </div>
        <Typography variant="h4" gutterBottom align="center" color="#fff" style={{ marginBottom: '20px' }}>
          User Profile
        </Typography>
        {user ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Username:</Typography>
              <Typography variant="body1" color="#fff">{user.username}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Name:</Typography>
              <Typography variant="body1" color="#fff">{`${user.firstName} ${user.middleName || ''} ${user.lastName}`}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Email Address:</Typography>
              <Typography variant="body1" color="#fff">{user.emailAddress}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Mobile Number:</Typography>
              <Typography variant="body1" color="#fff">{user.mobileNumber}</Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1" align="center">User data not found in cookies</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
