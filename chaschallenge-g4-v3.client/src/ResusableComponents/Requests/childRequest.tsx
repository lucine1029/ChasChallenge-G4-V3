// Alla utom user och alluser från UserHandler i swagger:

import axios from 'axios';
const BASE_URL = 'http://localhost:5148';

// GET User with Children
export const getUsersChildren = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user:${userId}/child:${5}`);
    console.log('Ungarna från UR', response.data.children);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};

// curl -X 'POST' \
//  'http://localhost:5148/user/d07c7ad5-e63a-4d79-a804-20ccc59eddd2/child' \
// -H 'accept: */*' \
//  -H 'Content-Type: application/json' \
//  -d '{
//  "name": "string",
//  "nickName": "string",
//  "gender": "string",
//  "birthdate": "2024-05-29T12:13:40.832Z"
// }' */

// API:
export const createUserKid = async (userId, kidData) => {
  const url = `${BASE_URL}/user:${userId}/child`;
  console.log(url);

  try {
    const response = await axios.post(url, kidData, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error creating child:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateUserKid = async (userId, childId, kidData) => {
  const url = `${BASE_URL}/user:${userId}/child:${childId}/update`;
  try {
    const response = await axios.put(url, kidData, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error updating child:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
