//@ts-nocheck

import ChildProfile from '../../ResusableComponents/ChildProfile'; // Assuming ChildData is your form component for child details
import ChildAllergies from '../../ResusableComponents/ChildAllergies'; // Allergies component
import AvatarList from './AvatarList';

const AddChild = () => {
  return (
    <div>
      <h2>Add New Child</h2>
      <ChildProfile />
      <ChildAllergies />
      <AvatarList />
    </div>
  );
};

export default AddChild;
