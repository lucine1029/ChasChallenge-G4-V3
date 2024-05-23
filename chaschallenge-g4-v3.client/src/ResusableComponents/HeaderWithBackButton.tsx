// @ts-nocheck
//This button can be used when we want to go back one step in the submenu
//With the customBackOption it can also be used to close a modal.
//And with the done button it can also be used to close the settings menu.

import { useNavigate } from 'react-router-dom';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import '../scss/Reusable-Components/_HeaderWithBackButton.scss';

export default function HeaderWithBackButton({
  title,
  customBackAction,
  isSettingsPage,
}) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (customBackAction) {
      customBackAction(); // Execute custom action if provided
    } else {
      navigate(-1); // Default back navigation
    }
  };

  const handleDoneClick = () => {
    navigate('/');
    console.log('Done button clicked');
  };

  return (
    <header className='header-with-back-button'>
      {!isSettingsPage ? (
        <button className='back-button' onClick={handleBackClick}>
          <LiaAngleLeftSolid />
        </button>
      ) : (
        <div className='spacer'></div>
      )}
      <h1>{title}</h1>
      {isSettingsPage ? (
        <button className='done-button' onClick={handleDoneClick}>
          Klar
        </button>
      ) : (
        <div className='spacer'></div>
      )}
    </header>
  );
}
