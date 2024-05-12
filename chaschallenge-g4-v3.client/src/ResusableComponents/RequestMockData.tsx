// // This code can request data from our db.json-file. Start the server by going to chaschallenge-g4-v3.client in the terminal and type "npx json-server db.json".

// // Function to fetch and combine data
// export async function fetchAndCombineData() {
//   try {
//     // Fetch users data
//     const fetchUsers = fetch('http://localhost:3000/users').then(response => response.json());
 
 
//     // Fetch child data
//     const fetchChild = fetch('http://localhost:3000/child').then(response => response.json());
 
 
//     // Combine both requests using Promise.all
//     const [users, child] = await Promise.all([fetchUsers, fetchChild]);
//     const combinedData = { users, child };
 
 
//     console.log('Combined data:', combinedData);
//     return combinedData;
//   } catch (error) {
//     console.error('Error fetching or combining data:', error);
//     throw error; // Rethrow the error for the caller to handle
//   }
//  }
 
 
//  // Function to add a new user
//  export async function addNewUser(newUser) {
//   try {
//     const response = await fetch('http://localhost:3000/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newUser)
//     });
 
 
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
 
 
//     console.log('New user added successfully');
//   } catch (error) {
//     console.error('There was a problem with the fetch operation:', error);
//     throw error;
//   }
//  }

