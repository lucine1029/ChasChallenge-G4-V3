// ModalAccount.tsx
import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export const HamburgerModal: React.FC<ModalProps> = ({ onClose }) => {
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
  const goToSleepTracking = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClose(event); // Close the modal by passing the event
    navigate('/sleeptracking'); // Navigate to '/signin' route
  };

  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <div className='modal-button-container'>
          <button className='modal-button' onClick={goToSignInPage}>
            Sign In
          </button>
          <div className='modal-divider'></div>
          <button className='modal-button' onClick={goToSignUpPage}>
            Sign Up
          </button>

          <div className='modal-divider'></div>
          <button className='modal-button' onClick={goToAccountPage}>
            Inställningar
          </button>
          <div className='modal-divider'></div>
          <button className='modal-button' onClick={goToSleepTracking}>
            Sleep
          </button>
        </div>
      </div>
    </div>
  );
};
