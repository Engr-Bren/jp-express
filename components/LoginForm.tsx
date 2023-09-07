// components/Auth/LoginForm.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '../src/app/page.module.css';

interface LoginFormProps {
  onLogin: (formData: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      // Simulate login logic (replace with actual login API call)
      try {
        // Replace this with your actual login API call
        // const response = await fetch('/api/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(values),
        // });

        // if (response.ok) {
        //   // Redirect to the profile page or dashboard
        //   router.push('/profile'); // Update the route as needed
        // } else {
        //   setLoginError('Invalid credentials. Please try again.');
        // }

        // This is a placeholder, replace with actual logic
        if (values.email === 'user@example.com' && values.password === 'password') {
          onLogin(values); // Notify the parent component of successful login
          router.push('/profile'); // Redirect to the profile page
        } else {
          setLoginError('Invalid credentials. Please try again.');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });

  return (
    <div className={styles.login}>
      <h2 className={styles.h1}>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          id="email"
          name="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
        <Button type="submit" variant="contained" color="success" className={styles.submit} style={{ marginTop: '20px' }}>
          Log In
        </Button>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
