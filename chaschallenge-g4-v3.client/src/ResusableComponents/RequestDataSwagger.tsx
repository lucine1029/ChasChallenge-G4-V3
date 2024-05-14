// // This is code for requesting mockdata from https://petstore.swagger.io/#/

// import axios from 'axios';

// export const getDataFromSwagger = () => {
//   // Make a GET request to retrieve pets by status
//   axios
//     .get('https://petstore.swagger.io/v2/pet/findByStatus', {
//     // .get('http://localhost:5148/user?userId=b8cc8b99-848b-49c3-b4fb-0784e9ee0f06', {
//       params: {
//         status: 'available', // specify the status parameter to filter pets
//       },
//     })
//     .then(function (response) {
//       // Handle success, log the response data to the console
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       // Handle error, log the error message to the console
//       console.error('Error fetching data:', error);
//     });
// };


import axios from 'axios';
export const getDataFromSwagger = () => {
  return axios.get('http://localhost:5148/user', {
    params: {
      userId: 'b8cc8b99-848b-49c3-b4fb-0784e9ee0f06',
    },
  })
  .then(function (response) {
    console.log(response.data);
    return response.data; // Return the data for further processing
  })
  .catch(function (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  });
};