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

getAllUsers();

// GET User by ID + Can also be used to get user kids
export const getUser = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user:${userId}`);
    console.log('UserRequest-getUser:', response.data);
    return response.data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};

//  Update User info, väntar på endpoint från Stina
export const updateUser = async (userId: string) => {
  try {
    // const response = await axios.get(`${BASE_URL}/user:${userId}`);
    const response = await axios.put(``);
    //console.log(response.data);
    return response.data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};

// Update User Password
export const updateUserPassword = async (userId: string, password: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/${userId}/updatePassword`, { password });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};
