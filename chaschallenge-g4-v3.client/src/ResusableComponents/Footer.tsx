import '../scss/Reusable-Components/_Footer.scss';
//import { Hamburger } from '../ResusableComponents/Hamburger';
import { IoChatbox } from 'react-icons/io5';
import { PiChefHat } from 'react-icons/pi';
import { MdFamilyRestroom } from 'react-icons/md';
import { IoIosJournal } from 'react-icons/io';
import HamburgerMenuTwo from './HamBurgerTwo';

export default function Footer() {
  return (
    <footer>
      <div className='footer-btn-container'>
        <a href='' className='footer-btn-recipes'>
          <PiChefHat color='white' size='42' />
        </a>
        <a href='' className='footer-btn-family'>
          <MdFamilyRestroom color='white' size='42' />
        </a>
        <a href='/chat' className='footer-btn-chat'>
          <IoChatbox color='white' size='42' />
        </a>
        <a href='' className='footer-btn-journal'>
          <IoIosJournal color='white' size='42' />
        </a>
        <HamburgerMenuTwo />
        <a href='' className='footer-btn-tba'></a>
      </div>
    </footer>
  );
}
