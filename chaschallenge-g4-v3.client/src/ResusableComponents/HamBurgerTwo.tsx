import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from './authUtils';
import '../scss/Reusable-Components/_HamburgerTwo.scss';
import { FaRobot } from 'react-icons/fa';
import { LiaAngleRightSolid } from 'react-icons/lia';

export default function HamburgerMenuTwo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    handleToggleMenu();
    navigate('signin');
  };

  return (
    <header>
      <div className='hamburger-container'>
        <NavLink to='/chat' className='chatgpt-icon'>
          <FaRobot size={30} />
        </NavLink>
        <div className='hamburger-icon' onClick={handleToggleMenu}>
          <div className={`icon-1 ${isMenuOpen ? 'a' : ''}`}></div>
          <div className={`icon-2 ${isMenuOpen ? 'c' : ''}`}></div>
          <div className={`icon-3 ${isMenuOpen ? 'b' : ''}`}></div>
        </div>
      </div>

      <nav className={isMenuOpen ? 'show' : ''}>
        <ul>
          <li>
            <NavLink
              to='/recipes'
              onClick={handleToggleMenu}
              className='menu-item'
            >
              <span className='push-right'>Recept</span>
              <LiaAngleRightSolid />
            </NavLink>
          </li>
          <li>
            <NavLink to='/family' onClick={handleToggleMenu}>
              Familj
            </NavLink>
          </li>
          <li>
            <NavLink to='/chat' onClick={handleToggleMenu}>
              Chatta
            </NavLink>
          </li>
          <li>
            <NavLink to='/journal' onClick={handleToggleMenu}>
              Journal
            </NavLink>
          </li>
          <li>
            <NavLink to='/' onClick={handleToggleMenu}>
              Tillväxtkurvor
            </NavLink>
          </li>
          <li>
            <NavLink to='/sleeptracking' onClick={handleToggleMenu}>
              Sömn
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink to='/settings' onClick={handleToggleMenu}>
              Inställningar
            </NavLink>
          </li>
          <li>
            <NavLink to='/' onClick={handleLogout}>
              Logga ut
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={`slide-up ${isMenuOpen ? 'slide' : ''}`}></div>
    </header>
  );
}
