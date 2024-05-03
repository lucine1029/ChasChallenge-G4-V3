import { useEffect, useState } from 'react';
import { fetchAndCombineData } from './ResusableComponents/RequestMockData'; // Import the fetchAndCombineData function from RequestMockData.tsx
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ChatbotPage from './Pages/ChatbotPage/ChatbotPage';
import HomePage from './Pages/HomePage/HomePage';
import SignUpPage from './Pages/UserAuthentication/SignUpPage/SignUpPage';
import SignInPage from './Pages/UserAuthentication/SingInPage/SingInPage';
import AccountPage from './Pages/AccountPage/AccountPage';
import UserSettings from './Pages/AccountPage/UserSettings';
import ChildProfile from './Pages/AccountPage/ChildProfile';
import AddChild from './Pages/AccountPage/AddChild';
import BackButton from './Components/BackButton';

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
        <Route path='/account/' element={<AccountPage />} />
        <Route path='/account/settings' element={<UserSettings />} />
        <Route path='/account/children' element={<ChildProfile />} />
        <Route path='/account/children/add' element={<AddChild />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

{
  /* <Routes>
<Route
  path='settings'
  element={
    <>
      <BackButton />
      <UserSettings />
    </>
  }
/>
<Route
  path='children'
  element={
    <>
      <BackButton />
      <ChildProfile />
      <ChildAllergies />
    </>
  }
/>
<Route
  path='children/add'
  element={
    <>
      <BackButton />
      <AddChild />
    </>
  }
/>
</Routes> */
}
