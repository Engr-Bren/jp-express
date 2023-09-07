import React from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import styles from '../src/app/page.module.css';

const LoginPage = () => {
  const handleLogin = (formData: any) => {
    // Implement your login logic here using the formData
    console.log('Login data:', formData);
  };

  return (
    <div>
    <Header />
    <main className={styles.main}>
    <LoginForm onLogin={handleLogin} />
  </main>
    </div>
  );
};

export default LoginPage;
