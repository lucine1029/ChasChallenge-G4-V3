//@ts-nocheck

import { Link } from 'react-router-dom';
import { LiaUserCogSolid } from 'react-icons/lia';
import { LiaBabySolid } from 'react-icons/lia';
import { LiaAngleRightSolid } from 'react-icons/lia';
import '../../scss/Reusable-Components/_list.scss';

const AccountPage = () => {
  return (
    <>
      <h1>Inställningar</h1>
      <nav>
        <ul>
          <li>
            <Link className='link-style card' to='settings'>
              <LiaUserCogSolid className='large-icon' />
              <div className='push-right'>
                <h3>Konto</h3>
                <p>Uppdatera ditt lösenord</p>
              </div>
              <LiaAngleRightSolid />
            </Link>
          </li>
          <li>
            <Link className='link-style card' to='settings'>
              <LiaBabySolid className='large-icon' />

              <div className='push-right'>
                <h3>Barn</h3>
                <p>Uppdatera, lägg till och ta bort barn</p>
              </div>
              <LiaAngleRightSolid />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AccountPage;
