import { useState } from 'react';
import { HamburgerModal } from './HamburgerModal';

// Menu icons
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

export function Hamburger() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className='nav-bar'>
      <div className='flex items-center text-xl text-blue-600'>
        <button
          onClick={isModalOpen ? handleCloseModal : handleOpenModal}
          style={{ padding: 0, background: 'none', border: 'none' }}
        >
          {isModalOpen ? (
            <IoMdClose className='hamburger-menu' />
          ) : (
            // <GiHamburgerMenu style={{ color: 'white', fontSize: 45 }} />
            <GiHamburgerMenu className='hamburger-menu' />
          )}
        </button>
      </div>
      {isModalOpen && <HamburgerModal onClose={handleCloseModal} />}
    </nav>
  );
}
