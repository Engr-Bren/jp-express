// pages/profiles/[username].tsx

import { useRouter } from 'next/router';

const UserProfile = ({ username }) => {
  const router = useRouter();

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {username}</p>
    </div>
  );
};

export async function getStaticPaths() {
  // Define the list of possible usernames
  const usernames = ['user1', 'user2', 'user3'];

  // Generate paths for each username
  const paths = usernames.map((username) => ({ params: { username } }));

  // Enable fallback to true to allow dynamic paths not found at build time
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Fetch user-specific data based on params.username
  const username = params.username;

  // Replace this with your data fetching logic
  // Example: const userData = await fetchUserData(username);

  // Pass the fetched data to the component
  return {
    props: {
      username,
    },
  };
}

export default UserProfile;
