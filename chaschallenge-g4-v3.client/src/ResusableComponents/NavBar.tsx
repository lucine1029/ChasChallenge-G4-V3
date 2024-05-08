// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// function NavBar() {
//   const [links] = useState([
//     { label: 'Home', url: '/' },
//     { label: 'Sign Up', url: '/signup' },
//     { label: 'Sign In', url: '/signin' },
//     { label: 'Account', url: '/account' },
//     { label: 'Chat', url: '/chat' },
//   ]);

//   return (
//     <nav className='nav-bar'>
//       <ul>
//         {links.map((link, index) => (
//           <li key={index}>
//             <Link to={link.url}>{link.label}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }

// export default NavBar;

// -------------------------

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalAccount } from './ModalAccount';
import { VscKebabVertical } from "react-icons/vsc";



interface NavBarProps {
  isSignedIn: boolean;
  handleSignIn: (userData: any) => void;
  HandleSignOut: () => void; // Add handleSignOut prop
}

// HandleSignOut and handleSignIn are firebase solutions and we need to find another way to check if user 
// is signed to be able to toggle the colour of the user-icon, kanske sätta en cookie, och om cookien är valid så är user inloggad.
export function NavBar({ isSignedIn, HandleSignOut, handleSignIn }: NavBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [links] = useState([
    { label: 'Home', url: '/' },
    // { label: 'Sign Up', url: '/signup' },
    // { label: 'Sign In', url: '/signin' },
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
        
        <div className='flex items-center text-xl text-blue-600'>
          {/* <button onClick={handleOpenModal}> */}
          <button onClick={handleOpenModal} style={{ padding: 0, background: 'none', border: 'none' }}>

            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              // className={`${isSignedIn ? 'fill-green-600' : 'fill-black'}`}
              className={`${'fill-green-600'}`}
            >
              <path d='M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 10C12.42 10 16 11.79 16 14V16H0V14C0 11.79 3.58 10 8 10Z' />
            </svg>
          </button>
        </div>
      </ul>
      {isModalOpen && <ModalAccount onClose={handleCloseModal} />}
      <VscKebabVertical />

    </nav>
  );
}
