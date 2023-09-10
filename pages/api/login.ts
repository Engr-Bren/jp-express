// pages/api/login.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'js-cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Check if the user is authenticated based on the presence of an authentication token in cookies
    const authToken = Cookies.get('authToken');

    if (authToken) {
      // User is already authenticated
      // Return a response with a redirect URL
      return res.status(200).json({ redirectTo: '/profile/${user.userId}`' });
    } else {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  }

  return res.status(405).end();
};
