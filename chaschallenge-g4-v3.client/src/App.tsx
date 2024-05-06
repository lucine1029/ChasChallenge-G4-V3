import { useEffect } from 'react';
import { fetchAndCombineData } from './ResusableComponents/RequestMockData'; // Import the fetchAndCombineData function from RequestMockData.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatbotPage from './Pages/ChatbotPage/ChatbotPage';
import HomePage from './Pages/HomePage/HomePage';
import SignUpPage from './Pages/UserAuthentication/SignUpPage/SignUpPage';
import SignInPage from './Pages/UserAuthentication/SingInPage/SingInPage';
import AccountPage from './Pages/AccountPage/AccountPage';
import UserSettings from './Pages/AccountPage/UserSettings';
import ChildProfile from './Pages/AccountPage/ChildProfile';
import AddChild from './Pages/AccountPage/ChildAdd';
// import BackButton from './Components/BackButton';
import NavBar from './ResusableComponents/NavBar';
import {getDataFromSwagger} from './ResusableComponents/RequestDataSwagger'

getDataFromSwagger()


const App = () => {
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
    <>
      <BrowserRouter>
        <NavBar />
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
    </>
  );
};

export default App;
