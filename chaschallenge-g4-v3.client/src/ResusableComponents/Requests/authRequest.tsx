// Rubens komponent
// Alla från ChasChallenge-G4-V3.Server i swagger

import axios from 'axios';

const BASE_URL = 'http://localhost:5148';


// Register
export interface userData {
    firstname: string,
    lastname: string,
    email: string,
    password: string
  }
  
  export const registerUser = async (userData: userData) => {
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


// Forgot Password

  export const forgotPassword = async (email:string) => {
    try {
        const response = await axios.post(`${BASE_URL}/forgotPassword`, email,
            {headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200){
            console.log('Rest link sent to your email', response.data);
        }
    } catch (error){
        if (axios.isAxiosError(error)){
            console.error('Error response from server:', error.response?.data);
        } else {
            console.error('An unexpected error occured:', error);
        }
    }
  }

// Reset Password

interface userResetPassword{
    email: string,
    token: string,
    password: string,
    confrimPassword: string,
}

export const resetPassword = async (userResetPassword: userResetPassword) => {
    try {
        const response = await axios.post(`${BASE_URL}/forgotPassword`, userResetPassword,
            {headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200){
            console.log('Password has been reseted ', response.data);
        }
    } catch (error){
        if (axios.isAxiosError(error)){
            console.error('Error response from server:', error.response?.data);
        } else {
            console.error('An unexpected error occured:', error);
        }
    }
  }
