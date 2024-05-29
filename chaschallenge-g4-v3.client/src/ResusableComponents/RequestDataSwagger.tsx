import axios from 'axios';

const BASE_URL = 'http://localhost:5148';

// export const getDataFromSwagger = async () => {
//   try {
//     const response = await axios.get(
//       // 'http://localhost:5148/user?userId=b8cc8b99-848b-49c3-b4fb-0784e9ee0f06'
//       'http://localhost:5148/allusers'
//     );

//     console.log(response.data);
//     return response.data; // Return the data for further processing
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error; // Rethrow the error for handling elsewhere if needed
//   }
// };

// hur curlen ser ut för register i swagger:
// curl -X 'POST' \
//   'http://localhost:5148/register' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "firstName": "string",
//   "lastName": "string",
//   "password": "string",
//   "email": "string"
// }'

export const registerUser = async () => {
  try {
    const response = await axios.post('http://localhost:5148/register');

    console.log(response.data);
    return response.data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};

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
/* 
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
}; */
