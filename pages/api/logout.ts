// pages/api/logout.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'js-cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // I-clear ang authentication cookie
      Cookies.remove('authenticated');

      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error logging out:', error);
      return res.status(500).json({ message: 'An error occurred while logging out' });
    }
  }

  return res.status(405).end();
};
