import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ChatbotPage from './Pages/ChatbotPage/ChatbotPage';
import HomePage from './Pages/HomePage/index';
import AccountPage from './Pages/Settings/Account/Index';
import AddKidsPage from './Pages/Settings/AddKids/Index';
import SettingsPage from './Pages/Settings/Index';
import ManageKidsPage from './Pages/Settings/ManageKids/Index';
import SleepTracking from './Pages/Sleep/SleepTracking';
import SignUpPage from './Pages/UserAuthentication/SignUpPage/SignUpPage';
import SignInPage from './Pages/UserAuthentication/SingInPage/SingInPage';

import ChangePasswordPage from './Pages/Settings/Account/ChangePW';

import HeadCircumference from './Pages/Measurement/Circumference/index';
import Height from './Pages/Measurement/Length/index';
import Weight from './Pages/Measurement/Weight/index';
import Measurement from './Pages/Measurement';
import { AuthProvider } from './ResusableComponents/AuthContext';
import ProtectedRoutes from './ResusableComponents/ProtectedRoutes';
import { getUser } from './ResusableComponents/Requests/userRequest';
import { useAuth } from './ResusableComponents/authUtils';
import HamburgerMenuTwo from './ResusableComponents/HamBurgerTwo';
import { getAllUsers } from './ResusableComponents/Requests/userRequest';

function AppContent() {
  const { isAuthenticated, userId } = useAuth();

  useEffect(() => {
    getAllUsers();

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
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        {/* <Route path='/forgot-password' element={<ForgotPasswordPage/>} /> */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/chat' element={<ChatbotPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/settings/account' element={<AccountPage />} />
          <Route path='/settings/changePW' element={<ChangePasswordPage />} />
          <Route path='/settings/kids' element={<ManageKidsPage />} />
          <Route
            path='/settings/kids/add'
            element={
              <AddKidsPage
                defaultValues={undefined}
                isEditing={undefined}
                onSave={undefined}
              />
            }
          />
          <Route path='/sleeptracking' element={<SleepTracking />} />
          <Route path='/measurement' element={<Measurement />} /> // Example
          <Route
            path='/measurement/circumference'
            element={<HeadCircumference />}
          />
          <Route path='/measurement/height' element={<Height />} />
          <Route path='/measurement/weight' element={<Weight />} />
        </Route>
      </Routes>
      {isAuthenticated && <HamburgerMenuTwo />}
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
