// Linus komponent
// Dessa från UserHandler i swagger:
// - user och
// - alluser

import axios from 'axios';

const BASE_URL = 'http://localhost:5148';

// GET All Users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/allusers`);
    console.log(response.data);
    return response.data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};

// GET User by ID
export const getUser = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user:${userId}`);
    console.log(response.data);
    return response.data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};
