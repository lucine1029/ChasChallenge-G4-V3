import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton.tsx';
import KidsList from './KidsList.tsx';
import AddKidsPage from '../AddKids/Index';
import { updateUserKid } from '../../../ResusableComponents/Requests/childRequest';
import '../../../scss/Sass-Pages/_KidsListIndex.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
}

export default function ManageKidsPage() {
  const navigate = useNavigate();
  const [editingKid, setEditingKid] = useState(null);

  const handleAddChildClick = () => {
    navigate('/settings/kids/add');
  };

  const handleEditClick = (kid) => {
    setEditingKid(kid);
  };

  const handleSave = async (userId, kidId, updatedData) => {
    await updateUserKid(userId, kidId, updatedData);
    setEditingKid(null); // Close the editing form
    // Optionally, trigger a refresh to update the list
  };

  return (
    <>
      {!editingKid && <HeaderWithBackButton title='Barn' />}
      {editingKid ? (
        <main>
          <AddKidsPage
            defaultValues={editingKid}
            isEditing={true}
            onSave={handleSave}
          />
        </main>
      ) : (
        <main>
          <Button onClick={handleAddChildClick}>Lägg till barn</Button>
          <KidsList onEditClick={handleEditClick} />
        </main>
      )}
    </>
  );
}
