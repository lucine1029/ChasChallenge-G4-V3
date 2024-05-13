//This button can be used when we want to go back one step in the submenu
//With the customBackOption it can also be used to close a modal.

import { useNavigate } from 'react-router-dom';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import '../scss/Reusable-Components/HeaderWithBackButton.scss';

export default function HeaderWithBackButton({ title, customBackAction }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (customBackAction) {
      customBackAction(); // Execute custom action if provided
    } else {
      navigate(-1); // Default back navigation
    }
  };

  return (
    <header className='header-with-back-button'>
      <button className='back-button' onClick={handleBackClick}>
        <LiaAngleLeftSolid />
      </button>
      <h1>{title}</h1>
      <div className='spacer'></div>
    </header>
  );
}
