import { Link } from 'react-router-dom';
import { LiaUserCogSolid } from 'react-icons/lia';
import { LiaBabySolid } from 'react-icons/lia';
import { LiaAngleRightSolid } from 'react-icons/lia';
import '../../scss/Sass-Pages/_SettingsPage.scss';
import HeaderWithBackButton from '../../ResusableComponents/HeaderWithBackButton';

export default function MeasurementPage() {
  return (
    <>
      <HeaderWithBackButton title='Measurement' />
      <nav className='accountpage-nav'>
        <ul>
          <li>
            <Link className='link-style card' to='height'>
              <LiaUserCogSolid className='large-icon' />
              <div className='push-right'>
                <h3>measurement</h3>
                <p>Längd</p>
              </div>
              <LiaAngleRightSolid />
            </Link>
          </li>
          <li>
            <Link className='link-style card' to='weight'>
              <LiaBabySolid className='large-icon' />

              <div className='push-right'>
                <h3>Vikt</h3>
                {/* <p>Uppdatera, lägg till och ta bort barn</p> */}
              </div>
              <LiaAngleRightSolid />
            </Link>
          </li>
          <li>
            <Link className='link-style card' to='headcircumference'>
              <LiaBabySolid className='large-icon' />

              <div className='push-right'>
                <h3>Hvud</h3>
                {/* <p>Uppdatera, lägg till och ta bort barn</p> */}
              </div>
              <LiaAngleRightSolid />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}




