import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Define the User interface based on your user data structure
interface User {
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  mobilenumber: string;
}

const Profile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve user data from cookies based on userId
    const userDataFromCookies = Cookies.get(userId);

    if (userDataFromCookies) {
      // Parse the user data from the cookie (assuming it's stored as JSON)
      const userData: User = JSON.parse(userDataFromCookies);
      setUser(userData);
    } else {
      // Handle the case where user data is not found in cookies
      setUser(null);
    }
  }, [userId]);

  if (!user) {
    return <div>User data not found in cookies</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>First Name: {user.firstname}</p>
      <p>Middle Name: {user.middlename}</p>
      <p>Last Name: {user.lastname}</p>
      <p>Email Address: {user.email}</p>
      <p>Mobile Number: {user.mobilenumber}</p>
    </div>
  );
};

export default Profile;
