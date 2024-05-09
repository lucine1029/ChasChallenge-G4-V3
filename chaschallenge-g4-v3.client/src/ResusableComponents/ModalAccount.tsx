// ModalAccount.tsx
import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxDividerHorizontal } from 'react-icons/rx';

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

  const goToAccountPage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClose(event); // Close the modal by passing the event
    navigate('/account'); // Navigate to '/signin' route
  };

  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <div className='modal-button-container'>
          <button className='modal-button' onClick={goToSignInPage}>
            Sign In
          </button>
          <RxDividerHorizontal />
          <button className='modal-button' onClick={goToSignUpPage}>
            Sign Up
          </button>
          <div className='modal-divider'>
            <RxDividerHorizontal />
          </div>
          <button className='modal-button' onClick={goToAccountPage}>
            Account
          </button>
        </div>
      </div>
    </div>
  );
};
