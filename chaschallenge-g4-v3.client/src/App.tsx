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

  //UseEffect for data from json.db
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
