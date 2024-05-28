// Alla utom user och alluser från UserHandler i swagger:

import axios from 'axios';
const BASE_URL = 'http://localhost:5148';

// // GET User with Children
// export const getUsersChildren = async (userId: string) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/user:${userId}/child:${5}`);
//     // const response = await axios.get(`${BASE_URL}/user:${userId}`);
//     // console.log(`Ungarna från UR${JSON.stringify(response.data)}`);
//     // console.log(`Ungarna från UR${(response.data.name)}`);
//     console.log('Ungarna från UR', response.data.children);
//     return response.data; // Return the data for further processing
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error; // Rethrow the error for handling elsewhere if needed
//   }
// };


// GET User with Children
export const getUsersChildren = async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/user:${userId}/child:${5}`);
    //   const response = await axios.get(`${BASE_URL}/user:${userId}`);
      // console.log(`Ungarna från UR${JSON.stringify(response.data)}`);
      // console.log(`Ungarna från UR${(response.data.name)}`);
      console.log('Ungarna från UR', response.data.children);
      return response.data; // Return the data for further processing
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error for handling elsewhere if needed
    }
  };
  