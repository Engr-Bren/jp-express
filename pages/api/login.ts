// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Replace this with your actual authentication logic
    const { email, password } = req.body;

    if (email === 'user@example.com' && password === 'password') {
      // Simulate successful login
      setCookie({ res }, 'token', 'your-access-token', {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });

      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  return res.status(405).end();
};
