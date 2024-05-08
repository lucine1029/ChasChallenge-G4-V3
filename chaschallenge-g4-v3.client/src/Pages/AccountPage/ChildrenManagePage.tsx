import BackButton from '../../ResusableComponents/BackButton';
import ChildList from './ChildList';
import { useNavigate } from 'react-router-dom';

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export default function ChildrenManagePage() {
  const navigate = useNavigate();

  const handleAddchildClick = () => {
    navigate('/account/children/add');
  };

  return (
    <>
      <BackButton />
      <Button onClick={handleAddchildClick}>Add Child</Button>
      <ChildList />
    </>
  );
}
