//@ts-nocheck

import { Link } from 'react-router-dom';
import { LiaUserCogSolid } from 'react-icons/lia';
import '../../scss/Reusable-Components/_list.scss';

const AccountPage = () => {
  return (
    <>
      <h1>Inställningar</h1>
      <nav>
        <ul>
          <li>
            <Link to='settings'>
              <LiaUserCogSolid />
              Konto
            </Link>
          </li>
          <li>
            <Link to='children'>Barn</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AccountPage;
