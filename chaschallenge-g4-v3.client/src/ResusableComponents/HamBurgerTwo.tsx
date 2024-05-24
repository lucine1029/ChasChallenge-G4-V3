import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Reusable-Components/_HamburgerTwo.scss';

export default function HamburgerMenuTwo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Link to='/recipes' onClick={handleToggleMenu}>
              Recept
            </Link>
          </li>
          <li>
            <Link to='/family' onClick={handleToggleMenu}>
              Familj
            </Link>
          </li>
          <li>
            <Link to='/chat' onClick={handleToggleMenu}>
              Chatta
            </Link>
          </li>
          <li>
            <Link to='/journal' onClick={handleToggleMenu}>
              Journal
            </Link>
          </li>
          <hr />
          <li>
            <Link to='/settings' onClick={handleToggleMenu}>
              Inställningar
            </Link>
          </li>
          <li>
            <Link to='/' onClick={handleToggleMenu}>
              Logga ut
            </Link>
          </li>
        </ul>
      </nav>

      <div className={`dark-blue ${isMenuOpen ? 'slide' : ''}`}></div>
    </header>
  );
}
