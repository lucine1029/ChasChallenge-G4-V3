// import { useState } from 'react';
// import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

// // Routes
// import AccountPage from './Pages/AccountPage/AccountPage';
// import ChatbotPage from './Pages/ChatbotPage/ChatbotPage';
// import HomePage from './Pages/HomePage/HomePage';
// import SignUpPage from './Pages/UserAuthentication/SignUpPage/SignUpPage';
// import SignInPage from './Pages/UserAuthentication/SingInPage/SingInPage';

// // // Assuming you're running this code in a client-side JavaScript file on https://localhost:5173/

// // // Fetch users data
// const fetchUsers = fetch('http://localhost:3000/users')
//   .then(response => response.json())
//   .catch(error => {
//     console.error('Error fetching users:', error);
//     return [];
//   });

// // Fetch child data
// const fetchChild = fetch('http://localhost:3000/child')
//   .then(response => response.json())
//   .catch(error => {
//     console.error('Error fetching child:', error);
//     return [];
//   });

// // Combine both requests using Promise.all
// Promise.all([fetchUsers, fetchChild])
//   .then(([users, child]) => {
//     const combinedData = { users, child };
//     console.log('Combined data:', combinedData);
//   })
//   .catch(error => {
//     console.error('Error combining data:', error);
//   });

// // function ProtectedRoute() {

// //   const authContext = useContext(AuthContext);
// //   const isAuthenticated = authContext && authContext.user !== null;
// //   console.log('isAuthenticated', isAuthenticated)

// //   return isAuthenticated ? <Outlet/> : <Navigate to='/login' replace></Navigate>
// // }

// const App = () => {
//   const [links] = useState([
//     { label: 'Home', url: '/'},
//     { label: 'Sign Up', url: '/signup' },
//     { label: 'Sign In', url: '/signin' },
//     { label: 'Account', url: '/account'},
//     { label: 'Chat', url: '/chat'},

//   ]);

//   return (
//     <BrowserRouter>

//     <nav className='nav-bar'>
//       <ul>
//         {links.map((link, index) => (
//           <li key={index}>
//             <Link to={link.url}>{link.label}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>

//     <Routes>
//         <Route path='/' element={<HomePage/>}/>
//         <Route path='/chat' element={<ChatbotPage/>}/>
//         <Route path='/signup' element={<SignUpPage/>}/>
//         <Route path='/signin' element={<SignInPage/>}/>
//         <Route path='/account' element={<AccountPage/>}/>
//     </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

// App.tsx
import React, { useEffect, useState } from 'react';
import { fetchAndCombineData } from './ResusableComponents/RequestMockData'; // Import the fetchAndCombineData function from RequestMockData.tsx
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import AccountPage from './Pages/AccountPage/AccountPage';
import ChatbotPage from './Pages/ChatbotPage/ChatbotPage';
import HomePage from './Pages/HomePage/HomePage';
import SignUpPage from './Pages/UserAuthentication/SignUpPage/SignUpPage';
import SignInPage from './Pages/UserAuthentication/SingInPage/SingInPage';

const App = () => {
  const [links] = useState([
    { label: 'Home', url: '/' },
    { label: 'Sign Up', url: '/signup' },
    { label: 'Sign In', url: '/signin' },
    { label: 'Account', url: '/account' },
    { label: 'Chat', url: '/chat' },
  ]);

  useEffect(() => {
    fetchAndCombineData()
      .then((data) => {
        // Handle the combined data as needed
      })
      .catch((error) => {
        // Handle errors if needed
      });
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <BrowserRouter>
      <nav className='nav-bar'>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/chat' element={<ChatbotPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/account' element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
