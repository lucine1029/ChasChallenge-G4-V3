import React from 'react';

interface ChildData {
  name: string;
  nickName: string;
  gender: string;
  birthdate: string;
  allergies: { name: string }[];
  imageSource: string
}

interface Props {
  childData: ChildData;
  closeModal: () => void;
}

const ChildAccordion: React.FC<Props> = ({ childData, closeModal }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={closeModal}>
          &times;
        </span>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{childData.name}</h5>
            <img src={childData.imageSource} alt={childData.name} /> {/* Display the image */}

            <p className='card-text'>bild: {childData.imageSource}</p>
            <p className='card-text'>Smeknamn: {childData.nickName}</p>
            <p className='card-text'>Kön: {childData.gender}</p>
            <p className='card-text'>Född: {new Date(childData.birthdate).toLocaleDateString()}</p>
            <p className='card-text allergies'>
                
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
