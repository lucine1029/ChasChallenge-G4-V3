import axios from 'axios';

const BASE_URL = 'http://localhost:5148';

export const getDataFromSwagger = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}allusers`
    );

    console.log(response.data);
    return response.data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};

/////////Login

// Base URL for the API

interface sessionData{
  email: string,
  password: string,
interface UserData {
  email: string;
  password: string;
}

export const login = async ({ email, password }: UserData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      }
    );
    // Return the response data
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error response:',
        error.response?.data || error.message
      );
      // You can add custom handling here based on the status code
      if (error.response?.status === 500) {
        throw new Error('Internal server error. Please try again later.');
      } else {
        throw new Error(
          `Error: ${error.response?.status}. ${
            error.response?.data?.message || error.message
          }`
        );
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};// Register Request
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