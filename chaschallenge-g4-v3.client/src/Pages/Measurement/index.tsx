//@ts-nocheck




import { Link } from 'react-router-dom';
import { FaChild, FaBaby, FaWeight, FaAngleRight } from 'react-icons/fa'; // Uppdatera importen
import '../../scss/Sass-Pages/_SettingsPage.scss';
import HeaderWithBackButton from '../../ResusableComponents/HeaderWithBackButton';

export default function SettingsPage() {
  return (
    <>
      <HeaderWithBackButton title='Tillväxtkurvor' />
      <nav className='accountpage-nav'>
        <ul>
          <li>
            <Link className='link-style card' to='circumference'>
              <FaBaby className='large-icon' /> {/* Uppdatera ikonen till FaBrain */}
              <div className='push-right'>
                <h3 color=' blue'>Huvudomfång </h3>
                <p>Visa och hantera huvudomkretskurva</p>
              </div>
              <FaAngleRight />
            </Link>
          </li>
          <li>
            <Link className='link-style card' to='height'>
              <FaChild className='large-icon' />
              <div className='push-right'>
                <h3>Längd</h3>
                <p>Visa och hantera längdkurva</p>
              </div>
              <FaAngleRight />
            </Link>
          </li>
          <li>
            <Link className='link-style card' to='weight'>
              <FaWeight className='large-icon' />
              <div className='push-right'>
                <h3>Vikt</h3>
                <p>Visa och hantera viktkurva</p>
              </div>
              <FaAngleRight />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
