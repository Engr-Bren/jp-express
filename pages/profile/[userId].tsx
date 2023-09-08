// pages/profile/[userId].tsx
import { useRouter } from 'next/router';
import Profile from '../../components/Profile';
import Header from '../../components/Header';
import styles from '../../src/app/page.module.css';
import Head from 'next/head';

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <div>
    <Head>
      <title>Registration</title>
    </Head>
    <Header />
    <main className={styles.main}>
    <Profile userId={userId as string} />
  </main>
    </div>
);
}

export default UserProfile;
