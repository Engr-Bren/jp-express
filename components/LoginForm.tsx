import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '../src/app/page.module.css';
import Cookies from 'js-cookie';

// Import or define the UserAccount type here
interface UserAccount {
  userId: string; // Add userId field to UserAccount type
  username: string;
  password: string;
}

interface LoginFormProps {
  onLogin: (formData: { username: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      // Check if registration was successful (cookie presence)
      const registrationSuccess = Cookies.get('registrationSuccess');

      if (registrationSuccess === 'true') {
        // Get the user accounts from cookies and parse them
        const storedUserAccounts = Cookies.get('userAccounts');
        const userAccounts = storedUserAccounts ? JSON.parse(storedUserAccounts) : [];

        // Validate the login using the stored registration data
        const matchedUser = userAccounts.find((user: UserAccount) => user.username === values.username && user.password === values.password);

        if (matchedUser) {
          // Notify the parent component of successful login
          onLogin(matchedUser); // Pass the matched user data

          // Redirect to the profile page after successful login
          router.push(`/profile/${matchedUser.userId}`); // Use matched user's userId for the URL
        } else {
          setLoginError('Invalid credentials. Please try again.');
        }
      } else {
        setLoginError('Registration was not successful. Please register first.');
      }
    },
  });

  useEffect(() => {
    const storedFormData = Cookies.get('registrationData');
    if (storedFormData) {
      const parsedData = JSON.parse(storedFormData);
      formik.setFieldValue('username', parsedData.username);
      formik.setFieldValue('password', parsedData.password);
    }
  }, [formik]);

  return (
    <div className={styles.login}>
      <h2 className={styles.h1}>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          id="username"
          autoComplete="username"
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {loginError && <div className={styles.error}>{loginError}</div>}
        <Button type="submit" variant="contained" color="success" className={styles.submit} style={{ marginTop: '20px' }}>
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
