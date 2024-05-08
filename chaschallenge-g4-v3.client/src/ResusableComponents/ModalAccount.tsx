// ModalAccount.tsx
import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export const ModalAccount: React.FC<ModalProps> = ({ onClose }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const goToSignInPage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClose(event); // Close the modal by passing the event
    navigate('/signin'); // Navigate to '/signin' route
  };

  const goToSignUpPage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClose(event); // Close the modal by passing the event
    navigate('/signup'); // Navigate to '/signin' route
  };

  return (
    <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50'>
      <div className='p-8 bg-white rounded-lg'>
        <div className='flex justify-end'>
          <button className='text-gray-500' onClick={onClose}>
            X
          </button>
        </div>
        <div className='mb-4 text-center'>
          <button className='text-blue-500' onClick={goToSignInPage}>
            Sign In
          </button>
        </div>
        <div className='mb-4 text-center'>
          <button className='text-blue-500' onClick={goToSignUpPage}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
