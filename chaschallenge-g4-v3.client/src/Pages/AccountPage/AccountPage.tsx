//@ts-nocheck

import { Link } from 'react-router-dom';
import { LiaUserCogSolid } from 'react-icons/lia';
import { LiaBabySolid } from 'react-icons/lia';
import { LiaAngleRightSolid } from 'react-icons/lia';
import '../../scss/Sass-Pages/_AccountPageList.scss';

const AccountPage = () => {
  return (
    <>
      <h1>Inställningar</h1>
      <nav className='accountpage-nav'>
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
            <Link className='link-style card' to='children'>
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
