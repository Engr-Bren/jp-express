// components/RegistrationForm.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'; 
import styles from '../src/app/page.module.css';

// Define the Yup schema for validation
const validationSchema = yup.object({
  username: yup.string().min(4, 'Username must be at least 4 characters').max(10, 'Username cannot exceed 10 characters').required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').max(15, 'Password cannot exceed 15 characters').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,15}$/, 'Password must contain at least one uppercase, one lowercase, one special character, and one number').required('Password is required'),
  confirmPassword: yup.string() .nullable().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string(),
  emailAddress: yup.string().email('Invalid email address').required('Email is required'),
  mobileNumber: yup.string().matches(/^[0-9]{11}$/, 'Mobile Number must be an 11-digit number').required('Mobile Number is required'),
});

const RegistrationForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      middleName: '',
      emailAddress: '',
      mobileNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  return (
    <Container maxWidth="xs">
    <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={2} >
      <Grid item xs={12} >
        <TextField
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Middle Name"
          name="middleName"
          value={formik.values.middleName}
          onChange={formik.handleChange}
          error={formik.touched.middleName && Boolean(formik.errors.middleName)}
          helperText={formik.touched.middleName && formik.errors.middleName}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Email Address"
          name="emailAddress"
          value={formik.values.emailAddress}
          onChange={formik.handleChange}
          error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
          helperText={formik.touched.emailAddress && formik.errors.emailAddress}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Phone Number"
          name="mobileNumber"
          value={formik.values.mobileNumber}
          onChange={formik.handleChange}
          error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
          helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
          fullWidth
        />
      </Grid>
    </Grid>
    <Button className={styles.submit} type="submit" variant="contained" color="success" style={{ marginTop: '20px' }}>
      Submit
    </Button>
  </form>
  </Container>
  );
};

export default RegistrationForm;
