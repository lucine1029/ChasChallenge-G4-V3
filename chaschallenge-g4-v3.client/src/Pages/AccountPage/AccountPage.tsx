//@ts-nocheck

import { Routes, Route, Link, Outlet } from 'react-router-dom';
import UserSettings from './UserSettings';
import ChildProfile from '../../ResusableComponents/ChildProfile';
import ChildAllergies from '../../ResusableComponents/ChildAllergies';
import AddChild from './AddChild';

const AccountPage = () => {
  return (
    <div>
      <h1>Account</h1>
      <nav>
        <ul>
          <li>
            <Link to='settings'>Edit Profile</Link>
          </li>
          <li>
            <Link to='children'>Manage Children</Link>
          </li>
          <li>
            <Link to='children/add'>Add Child</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

const AccountRoutes = () => (
  <Routes>
    <Route path='/' element={<AccountPage />}>
      <Route path='settings' element={<UserSettings />} />
      <Route path='children' element={<ChildProfile />} />
      <Route path='children/add' element={<AddChild />} />
    </Route>
  </Routes>
);

export default AccountRoutes;
