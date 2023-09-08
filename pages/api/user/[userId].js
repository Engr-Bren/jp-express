// pages/api/user/[userId].js
export default async function handler(req, res) {
    const { userId } = req.query;
  
    try {
      // Replace this with your logic to fetch user data based on userId from your database
      const user = await fetchUserDataFromDatabase(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Structure the user data in the expected format
      const userData = {
        username: user.username,
        firstName: user.firstName,
        middleName: user.middleName || null,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        mobileNumber: user.mobileNumber,
      };
  
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  