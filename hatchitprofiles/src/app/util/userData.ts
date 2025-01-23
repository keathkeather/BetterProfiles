const jwt = require('jsonwebtoken');
export const decodeToken = (token: string) => {
  try {
    return jwt.decode(token) as { id: string };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const fetchUserDetails = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getUserDetails/${userId}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch user details');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const UpdateUserData = async (userId: string, data: any) => {
    try {
        const response = await fetch(`http://localhost:3000/api/updateUserAndDetails/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
        if (response.ok) {
        return await response.json();
        } else {
        throw new Error('Failed to update user data');
        }
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
}