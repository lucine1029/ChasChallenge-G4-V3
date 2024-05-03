//@ts-nocheck

import { Link } from 'react-router-dom';

const AccountPage = () => {
  return (
    <>
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
    </>
  );
};

export default AccountPage;
