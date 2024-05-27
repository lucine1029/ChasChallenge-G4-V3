//@ts-nocheck

import { Link } from 'react-router-dom';
import { LiaUserCogSolid } from 'react-icons/lia';
import { LiaBabySolid } from 'react-icons/lia';
import { LiaAngleRightSolid } from 'react-icons/lia';
import '../../scss/Sass-Pages/_SettingsPage.scss';
import HeaderWithBackButton from '../../ResusableComponents/HeaderWithBackButton';

export default function SettingsPage() {
  return (
    <>
      <HeaderWithBackButton title='Inställningar' isSettingsPage={true} />
      <nav className='accountpage-nav'>
        <ul>
          <li>
            <Link className='link-style card' to='account'>
              <LiaUserCogSolid className='large-icon' />
              <div className='push-right'>
                <h3>Dina uppgifter</h3>
                <p>Uppdatera dina uppgifter</p>
              </div>
              <LiaAngleRightSolid />
            </Link>
          </li>

          <li>
            <Link className='link-style card' to='changePW'>
              <LiaUserCogSolid className='large-icon' />
              <div className='push-right'>
                <h3>Lösenord</h3>
                <p>Uppdatera ditt lösenord</p>
              </div>
              <LiaAngleRightSolid />
            </Link>
          </li>

          <li>
            <Link className='link-style card' to='Kids'>
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
}
