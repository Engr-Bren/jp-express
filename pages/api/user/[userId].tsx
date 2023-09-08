import Cookies from 'js-cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId?.toString(); // Use optional chaining and toString() to ensure userId is a string

  try {
    console.log('Received userId:', userId);

    if (!userId) {
      return res.status(400).json({ message: 'userId is missing or invalid' });
    }

    // Retrieve user data from cookies based on userId
    const userDataFromCookies = Cookies.get(userId);

    console.log('UserData from cookies:', userDataFromCookies);

    if (!userDataFromCookies) {
      return res.status(404).json({ message: 'User not found in cookies' });
    }

    // Parse the user data from the cookie (assuming it's stored as JSON)
    const userData = JSON.parse(userDataFromCookies);

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
