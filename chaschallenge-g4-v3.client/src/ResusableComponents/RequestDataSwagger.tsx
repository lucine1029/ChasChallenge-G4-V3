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
