import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LiaUserEditSolid } from 'react-icons/lia';

interface ChildData {
  name: string;
  nickName: string;
  gender: string;
  birthdate: string;
  allergies: { name: string }[];
  imageSource: string;
  measurements: string;
}

interface Props {
  childData: ChildData;
  closeModal: () => void;
}

const ChildAccordion: React.FC<Props> = ({ childData, closeModal }) => {
  const navigate = useNavigate();

  const handleKebabClick = () => {
    navigate('/settings/kids');
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={closeModal}>
          &times;
        </span>

        <span className='link-to-settings' onClick={handleKebabClick}>
          <LiaUserEditSolid />
        </span>

        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{childData.name}</h5>
            <img src={childData.imageSource} alt={childData.name} /> {/* Display the image */}
            <p className='card-text'>Smeknamn: {childData.nickName}</p>
            <p className='card-text'>Kön: {childData.gender}</p>
            <p className='card-text'>Född: {new Date(childData.birthdate).toLocaleDateString()}</p>
            <p className='card-text allergies'>
              <p className='card-text'>Längd: {childData.measurements}</p>
              Allergier:{' '}
              {childData.allergies.map((allergy, allergyIndex) => (
                <span key={allergyIndex}>
                  {allergy.name}
                  {allergyIndex < childData.allergies.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildAccordion;
