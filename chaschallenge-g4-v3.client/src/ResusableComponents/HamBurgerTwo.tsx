import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './authUtils';
import '../scss/Reusable-Components/_HamburgerTwo.scss';

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
      <div className='hamburger-icon' onClick={handleToggleMenu}>
        <div className={`icon-1 ${isMenuOpen ? 'a' : ''}`}></div>
        <div className={`icon-2 ${isMenuOpen ? 'c' : ''}`}></div>
        <div className={`icon-3 ${isMenuOpen ? 'b' : ''}`}></div>
      </div>

      <nav className={isMenuOpen ? 'show' : ''}>
        <ul>
          <li>
            <NavLink to='/recipes' onClick={handleToggleMenu}>
              Recept
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

      <div className={`dark-blue ${isMenuOpen ? 'slide' : ''}`}></div>
    </header>
  );
}
