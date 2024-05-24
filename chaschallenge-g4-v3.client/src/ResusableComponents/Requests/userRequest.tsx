// Linus komponent
// Dessa från UserHandler i swagger:
// - user och
// - alluser

interface UserData {
  email: string;
  password: string;
}

import axios from 'axios';

const BASE_URL = 'http://localhost:5148';

// GET All Users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      // 'http://localhost:5148/user?userId=b8cc8b99-848b-49c3-b4fb-0784e9ee0f06'
      'http://localhost:5148/allusers'
    );

    console.log(response.data);
    return response.data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};

// GET All Users
export const getUser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5148/user?userId=d07c7ad5-e63a-4d79-a804-20ccc59eddd2'
        
      );
  
      console.log(response.data);
      return response.data; // Return the data for further processing
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error for handling elsewhere if needed
    }
  };
