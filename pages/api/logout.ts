// pages/api/logout.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie } from 'nookies';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Clear the session cookie to log out the user
    destroyCookie({ res }, 'token', { path: '/' });
    return res.status(200).json({ message: 'Logout successful' });
  }

  return res.status(405).end();
};
