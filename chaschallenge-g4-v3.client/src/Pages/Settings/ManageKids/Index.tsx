import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton.tsx';
import KidsList from './KidsList.tsx';
import { useNavigate } from 'react-router-dom';

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export default function ManageKidsPage() {
  const navigate = useNavigate();

  const handleAddchildClick = () => {
    navigate('/settings/kids/add');
  };

  return (
    <>
      <HeaderWithBackButton title='Barn' />
      <KidsList />
      <Button onClick={handleAddchildClick}>Lägg till barn</Button>
    </>
  );
}
