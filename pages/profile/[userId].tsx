// pages/profile/[userId].tsx
import { useRouter } from 'next/router';
import Profile from '../../components/Profile';

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;

  if (!userId) {
    return <div>Loading...</div>;
  }

  return <Profile userId={userId as string} />;
};

export default UserProfile;
