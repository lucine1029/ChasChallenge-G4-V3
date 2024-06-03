// Anders komponent
// Alla från LoginHandler i swagger.
import axios from 'axios';
const BASE_URL = 'http://localhost:5148';

// hur curlen ser ut för login i swagger:
// curl -X 'POST' \
// 'http://localhost:5148/login' \
// -H 'accept: */*' \
// -H 'Content-Type: application/json' \
// -d '{
// "email": "user@example.com",
// "password": "string"
// }'

/////////Login

// Base URL for the API

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
};

/////////Logout
