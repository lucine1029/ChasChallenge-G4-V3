import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


// Routes
import ChatbotPage from './Pages/ChatbotPage/ChatbotPage';
import HomePage from './Pages/HomePage/HomePage';
import SignInPage  from './Pages/UserAuthentication/SingInPage/SingInPage'
import SignUpPage from './Pages/UserAuthentication/SignUpPage/SignUpPage'
import AccountPage from './Pages/AccountPage/AccountPage'


// function ProtectedRoute() {

//   const authContext = useContext(AuthContext);
//   const isAuthenticated = authContext && authContext.user !== null;
//   console.log('isAuthenticated', isAuthenticated)

//   return isAuthenticated ? <Outlet/> : <Navigate to='/login' replace></Navigate>
// }


const App = () => {
  const [links] = useState([
    { label: 'Home', url: '/'},
    { label: 'Sign Up', url: '/signup' },
    { label: 'Sign In', url: '/signin' },
    { label: 'Account', url: '/account'},
    { label: 'Chat', url: '/chat'},

  ]);
  
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
        <Route path='/' element={<HomePage/>}/>
        <Route path='/chat' element={<ChatbotPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/account' element={<AccountPage/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;