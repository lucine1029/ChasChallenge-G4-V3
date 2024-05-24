// Rubens komponent
// Alla från ChasChallenge-G4-V3.Server i swagger

import axios from 'axios';

const BASE_URL = 'http://localhost:5148';

interface userData {
    firstname: string,
    lastname: string,
    email: string,
    password: string
  }
  
  export const addNewUser = async (userData: userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.status === 200){
        console.log('Registration successful:', response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)){
        console.error('Error response from server:', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };