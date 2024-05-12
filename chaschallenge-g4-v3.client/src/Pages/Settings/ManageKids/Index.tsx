import BackButton from '../../../ResusableComponents/BackButton.tsx';
import KidsList from './KidsList.tsx';
import { useNavigate } from 'react-router-dom';

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export default function ManageKidsPage() {
  const navigate = useNavigate();

  const handleAddchildClick = () => {
    navigate('/account/children/add');
  };

  return (
    <>
      <BackButton />
      <Button onClick={handleAddchildClick}>Add Child</Button>
      <KidsList />
    </>
  );
}
