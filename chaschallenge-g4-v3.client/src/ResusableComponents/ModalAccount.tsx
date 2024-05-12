// ModalAccount.tsx
import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export const ModalAccount: React.FC<ModalProps> = ({ onClose }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const goToSignInPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClose(event); // Close the modal by passing the event
    navigate('/signin'); // Navigate to '/signin' route
  };

  const goToSignUpPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClose(event); // Close the modal by passing the event
    navigate('/signup'); // Navigate to '/signin' route
  };

  const goToAccountPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClose(event); // Close the modal by passing the event
    navigate('/settings'); // Navigate to '/signin' route
  };

  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <div className='modal-close'>
          <button className='modal-close-button' onClick={onClose}>
            X
          </button>
        </div>
        <div className='modal-button-container'>
          <button className='modal-button' onClick={goToSignInPage}>
            Sign In
          </button>
          <button className='modal-button' onClick={goToSignUpPage}>
            Sign Up
          </button>
          <button className='modal-button' onClick={goToAccountPage}>
            Inställningar
          </button>
        </div>
      </div>
    </div>
  );
};
