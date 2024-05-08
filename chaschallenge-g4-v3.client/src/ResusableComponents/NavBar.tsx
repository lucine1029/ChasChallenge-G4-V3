import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [links] = useState([
    { label: 'Home', url: '/' },
    { label: 'Sign Up', url: '/signup' },
    { label: 'Sign In', url: '/signin' },
    { label: 'Account', url: '/account' },
    { label: 'Chat', url: '/chat' },
  ]);

  return (
    <nav className='nav-bar'>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.url}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
