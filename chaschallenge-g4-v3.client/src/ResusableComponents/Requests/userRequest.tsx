// Linus komponent
// Dessa från UserHandler i swagger:
// - user och
// - alluser

// import axios from 'axios';
// import { AuthContext, AuthProvider } from '../AuthContext';
// export type { AuthContextProps } from '../AuthContext';

// interface UserData {
//   email: string;
//   password: string;
// }


// const BASE_URL = 'http://localhost:5148';

// // GET All Users
// export const getAllUsers = async () => {
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

// // GET All Users
// export const getUser = async () => {
//   try {
//     const response = await axios.get(
//       'http://localhost:5148/user?userId=d07c7ad5-e63a-4d79-a804-20ccc59eddd2'
//     );

//     console.log(response.data);
//     return response.data; // Return the data for further processing
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error; // Rethrow the error for handling elsewhere if needed
//   }
// };



import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const BASE_URL = 'http://localhost:5148';

// GET All Users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/allusers`
    );

    console.log(response.data);
    return response.data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};

// GET User by ID
export const getUser = async () => {
  const authContext = useContext(AuthContext);

  if (!authContext?.userId) {
    throw new Error('User is not authenticated');
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/user?userId=${authContext.userId}`
    );

    console.log(response.data);
    return response.data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};
