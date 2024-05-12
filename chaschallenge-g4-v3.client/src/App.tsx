import { useEffect } from 'react';
// import { fetchAndCombineData } from './ResusableComponents/RequestMockData'; // Import the fetchAndCombineData function from RequestMockData.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatbotPage from './Pages/ChatbotPage/ChatbotPage';
import HomePage from './Pages/HomePage/HomePage';
import SignUpPage from './Pages/UserAuthentication/SignUpPage/SignUpPage';
import SignInPage from './Pages/UserAuthentication/SingInPage/SingInPage';
import SettingsPage from './Pages/Settings/Index';
import AccountPage from './Pages/Settings/Account/Index';
import ManageKidsPage from './Pages/Settings/ManageKids/Index';
import AddKidsPage from './Pages/Settings/AddKids/Index';
// import BackButton from './Components/BackButton';
import { NavBar } from './ResusableComponents/NavBar';
import { getDataFromSwagger } from './ResusableComponents/RequestDataSwagger';

import { getDataFromSwagger } from './ResusableComponents/RequestDataSwagger';
import Footer from '../src/ResusableComponents/Footer';

getDataFromSwagger();

const App = () => {
  // //UseEffect for data from json.db
  // useEffect(() => {
  //   fetchAndCombineData()
  //     .then((data) => {
  //       // Handle the combined data as needed
  //     })
  //     .catch((error) => {
  //       // Handle errors if needed
  //     });
  // }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatbotPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/settings/account' element={<AccountPage />} />
          <Route path='/settings/kids' element={<ManageKidsPage />} />
          <Route path='/settings/kids/add' element={<AddKidsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
