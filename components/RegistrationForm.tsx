import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'; 
import styles from '../src/app/page.module.css';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

// Define the Yup schema for validation
const validationSchema = yup.object({
  username: yup.string().min(4, 'Username must be at least 4 characters').max(10, 'Username cannot exceed 10 characters').required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').max(15, 'Password cannot exceed 15 characters').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,15}$/, 'Password must contain at least one uppercase, one lowercase, one special character, and one number').required('Password is required'),
  confirmPassword: yup.string().nullable().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string(),
  emailAddress: yup.string().email('Invalid email address').required('Email is required'),
  mobileNumber: yup.string().matches(/^[0-9]{11}$/, 'Mobile Number must be an 11-digit number').required('Mobile Number is required'),
});

// Define the structure for user accounts
interface UserAccount {
  userId: string; // Add userId field
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  middleName: string;
  emailAddress: string;
  mobileNumber: string;
}

const RegistrationForm: React.FC = () => {
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>([]);
  const [formData, setFormData] = useState<UserAccount>({
    userId: '', // Generate a unique userId
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    middleName: '',
    emailAddress: '',
    mobileNumber: '',
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: (values) => {
      // Generate a unique userId using uuid
      const userId = generateUniqueUserId();

      // Add the new user account to the array with the generated userId
      const newUser: UserAccount = { ...values, userId };
      const updatedUserAccounts = [...userAccounts, newUser];
      setUserAccounts(updatedUserAccounts);

      // Save the updated array to cookies
      Cookies.set('userAccounts', JSON.stringify(updatedUserAccounts), { expires: 7 });

      // Set a cookie to indicate successful registration
      Cookies.set('registrationSuccess', 'true', { expires: 7 });

      // Redirect to a success page or perform other actions
      console.log('User registered:', newUser);
      // Redirect to the login page after registration
      window.location.href = '/login';
    },
  });

  // Use effect to populate the form with data from cookies when the component mounts
  useEffect(() => {
    const storedFormData = Cookies.get('registrationData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  // Function to generate a unique userId using uuid
  const generateUniqueUserId = () => {
    return uuidv4();
  };

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
