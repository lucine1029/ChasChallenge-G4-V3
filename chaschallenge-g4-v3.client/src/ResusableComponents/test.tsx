

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalAccount } from './ModalAccount';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

interface NavBarProps {
  isSignedIn: boolean;
  handleSignIn: (userData: any) => void;
  HandleSignOut: () => void;
}

export function NavBar({  }: NavBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [links] = useState([
    { label: 'Home', url: '/' },
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
          <button
            onClick={isModalOpen ? handleCloseModal : handleOpenModal}
            style={{ padding: 0, background: 'none', border: 'none' }}
          >
            {isModalOpen ? <IoMdClose className='hamburger-menu'/> : <RxHamburgerMenu className='hamburger-menu'/>}
          </button>
        </div>
      </ul>
      {isModalOpen && <ModalAccount onClose={handleCloseModal} />}
    </nav>
  );
}
