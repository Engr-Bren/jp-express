// components/LoginForm.tsx
'use client'
import React, { useState, useEffect } from 'react'; // Import React and useEffect here
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../src/app/page.module.css';
import Cookies from 'js-cookie';
import { useUserData } from '../hooks/useUserData';

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const { user, mutateUserData } = useUserData(); // Move the useUserData hook outside of the handleLogin function

  const handleLogin = () => {
    // Get the user accounts from cookies and parse them
    const storedUserAccounts = Cookies.get('userAccounts');
    const userAccounts = storedUserAccounts ? JSON.parse(storedUserAccounts) : [];

    // Validate the login using the stored registration data
    const matchedUser = userAccounts.find(
      (user: { username: string; password: string }) => user.username === username && user.password === password
    );

    if (matchedUser) {
      // Set authentication status in cookies
      Cookies.set('authenticated', 'true');
      Cookies.set("userId", matchedUser.userId)

      

      mutateUserData(matchedUser); // Pass the matched user data

      // Redirect to the profile page
      router.push(`/profile/${matchedUser.userId}`);
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  useEffect(() => {
    // Check if the user is already logged in, then redirect to the profile page
    if (user) {
      router.push(`/profile/${user.userId}`);
    }
  }, [user, router]);

  return (
    <div className={styles.login}>
      <h2 className={styles.h1}>Login</h2>
      <div>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          id="username"
          autoComplete="username"
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          id="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError && <div className={styles.error}>{loginError}</div>}
        <Button
          variant="contained"
          color="success"
          className={styles.submit}
          style={{ marginTop: '20px' }}
          onClick={handleLogin}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
