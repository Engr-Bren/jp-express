// pages/contact.tsx

import React from 'react';
import ContactForm from '../components/ContactForm';
import Header from '../components/Header';
import styles from '../src/app/page.module.css';
import Head from 'next/head';

const Contact = () => {
return (
    <div>
    <Head>
      <title>Contact</title>
    </Head>
    <Header />
    <main className={styles.main}>
    <h1 className={styles.h1}>Contact Us</h1>
    <p className={styles.description}>If you have any questions or feedback, please feel free to reach out to us!</p>
    <ContactForm />
  </main>
    </div>
  );
};

export default Contact;
