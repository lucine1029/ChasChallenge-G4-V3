import { useNavigate } from 'react-router-dom';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import '../scss/Reusable-Components/HeaderWithBackButton.scss';

export default function HeaderWithBackButton({ title }) {
  const navigate = useNavigate();

  return (
    <header className='header-with-back-button'>
      <button className='back-button' onClick={() => navigate(-1)}>
        <LiaAngleLeftSolid />
      </button>
      <h1>{title}</h1>
      <div className='spacer'></div>
    </header>
  );
}
