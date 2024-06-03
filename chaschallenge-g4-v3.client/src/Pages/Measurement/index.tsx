//@ts-nocheck




import { Link } from 'react-router-dom';
import { LiaChildSolid,LiaBabySolid, LiaWeightHangingSolid, LiaAngleRightSolid } from "react-icons/lia"
import '../../scss/Sass-Pages/_SettingsPage.scss';
import HeaderWithBackButton from '../../ResusableComponents/HeaderWithBackButton';

export default function SettingsPage() {
  return (
    <>
      <HeaderWithBackButton  title='Tillväxtkurvor' />
      <nav className='accountpage-nav'>
        <ul>
          <li>
            <Link className='link-style card' to='circumference'>
              <LiaChildSolid className='large-icon' /> {/* Uppdatera ikonen till FaBrain */}
              <div className='push-right'>
                <h3 color=' Dark Slate Blue'>Huvudomfång </h3>
                <p>Visa och hantera huvudomkretskurva</p>
              </div>
              <LiaAngleRightSolid />
            </Link>
          </li>
          <li>
            <Link className='link-style card' to='height'>
              <LiaBabySolid className='large-icon' />
              <div className='push-right'>
                <h3>Längd</h3>
                <p>Visa och hantera längdkurva</p>
              </div>
              <LiaAngleRightSolid/>
            </Link>
          </li>
          <li>
            <Link className='link-style card' to='weight'>
              <LiaWeightHangingSolid className='large-icon' />
              <div className='push-right'>
                <h3>Vikt</h3>
                <p>Visa och hantera viktkurva</p>
              </div>
              <LiaAngleRightSolid />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
