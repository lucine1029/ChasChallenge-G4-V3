import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton';
import KidsList from './KidsList';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

export default function ManageKidsPage() {
  const navigate = useNavigate();

  const handleAddChildClick = () => {
    navigate('/settings/kids/add');
  };

  return (
    <>
      <HeaderWithBackButton
        title='Barn'
        customBackAction={() => navigate(-1)} // Provide custom back action
        isSettingsPage={true} // Assuming this is a settings page
      />
      <KidsList />
      <Button onClick={handleAddChildClick}>Lägg till barn</Button>
    </>
  );
}
