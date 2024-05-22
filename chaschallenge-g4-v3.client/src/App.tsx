import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatbotPage from './Pages/ChatbotPage/ChatbotPage';
import HomePage from './Pages/HomePage/HomePage';
import SignUpPage from './Pages/UserAuthentication/SignUpPage/SignUpPage';
import SignInPage from './Pages/UserAuthentication/SingInPage/SingInPage';
import SettingsPage from './Pages/Settings/Index';
import AccountPage from './Pages/Settings/Account/Index';
import ManageKidsPage from './Pages/Settings/ManageKids/Index';
import AddKidsPage from './Pages/Settings/AddKids/Index';
import SleepTracking from './Pages/Sleep/SleepTracking';
import MeasurementPage from './Pages/Measurement';
import HeadCircumference from './Pages/Measurement/Circumference';
import Height from './Pages/Measurement/Length';
import Weight from './Pages/Measurement/Weight';
import Footer from '../src/ResusableComponents/Footer';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/account" element={<AccountPage />} />
          <Route path="/settings/kids" element={<ManageKidsPage />} />
          <Route path="/settings/kids/add" element={<AddKidsPage />} />
          <Route path="/sleeptracking" element={<SleepTracking />} />
          <Route path="/measurement" element={<MeasurementPage />} />
          <Route path="/measurement/height" element={<Height />} />
          <Route path="/measurement/headcircumference" element={<HeadCircumference />} />
          <Route path="/measurement/weight" element={<Weight />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;




