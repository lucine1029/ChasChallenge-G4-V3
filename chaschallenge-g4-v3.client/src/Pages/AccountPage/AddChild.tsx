//@ts-nocheck

import ChildProfile from '../../ResusableComponents/ChildProfile'; // Assuming ChildData is your form component for child details
import ChildAllergies from '../../ResusableComponents/ChildAllergies'; // Allergies component
import AvatarList from './AvatarList';
import BackButton from '../../ResusableComponents/BackButton';

const AddChild = () => {
  return (
    <>
      <BackButton />
      <div>
        <h2>Add new child</h2>
        <ChildProfile />
        <ChildAllergies />
        <AvatarList />
      </div>
    </>
  );
};

export default AddChild;
