import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import ChatbotPage from './Pages/ChatbotPage/ChatbotPage';
import HomePage from './Pages/HomePage/HomePage';
import HomePageTwo from './Pages/HomePage/index';
import AccountPage from './Pages/Settings/Account/Index';
import AddKidsPage from './Pages/Settings/AddKids/Index';
import SettingsPage from './Pages/Settings/Index';
import ManageKidsPage from './Pages/Settings/ManageKids/Index';
import SleepTracking from './Pages/Sleep/SleepTracking';
import SignUpPage from './Pages/UserAuthentication/SignUpPage/SignUpPage';
import SignInPage from './Pages/UserAuthentication/SingInPage/SingInPage';
import ChangePasswordPage from './Pages/Settings/Account/ChangePW';

// Reusable components
//import Footer from '../src/ResusableComponents/Footer';
import { AuthProvider } from './ResusableComponents/AuthContext';
import ProtectedRoutes from './ResusableComponents/ProtectedRoutes'; // Import the ProtectedRoutes component
import { getUser } from './ResusableComponents/Requests/userRequest';
import { useAuth } from './ResusableComponents/authUtils';
import HamburgerMenuTwo from './ResusableComponents/HamBurgerTwo';

//getDataFromSwagger();
import { getAllUsers } from './ResusableComponents/Requests/userRequest';

function AppContent() {
  const { isAuthenticated, userId } = useAuth(); // Use the auth context

  getAllUsers();

  useEffect(() => {
    if (isAuthenticated && userId) {
      getUser(userId)
        .then((user) => {
          console.log('Logged in user:', user);
        })
        .catch((err) => {
          console.error('Failed to fetch user:', err);
        });
    }
  }, [isAuthenticated, userId]);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/two' element={<HomePageTwo />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/chat' element={<ChatbotPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/settings/account' element={<AccountPage />} />
          <Route path='/settings/changePW' element={<ChangePasswordPage />} />
          <Route path='/settings/kids' element={<ManageKidsPage />} />
          <Route path='/settings/kids/add' element={<AddKidsPage />} />
          <Route path='/sleeptracking' element={<SleepTracking />} />
        </Route>
      </Routes>
      {isAuthenticated && <HamburgerMenuTwo />}{' '}
      {/* Conditionally render the Footer */}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
