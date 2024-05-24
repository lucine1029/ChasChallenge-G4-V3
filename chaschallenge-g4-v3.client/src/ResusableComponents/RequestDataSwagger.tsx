import axios from 'axios';

const BASE_URL = 'http://localhost:5148';

export const getDataFromSwagger = async () => {
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

/////////Login

// Base URL for the API

interface sessionData{
  email: string,
  password: string,
}

export const login = async (sessionData: sessionData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        sessionData
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
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
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
    const response = await axios.post('http://localhost:5148/register', userData, {
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