// @ts-nocheck
import { useState, useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton.tsx';
import '../../../scss/Sass-Pages/_AddKidsPage.scss';
import { Multiselect } from 'multiselect-react-dropdown';
import babyMonsters from '../../../baby-monsters.json';
import { createUserKid } from '../../../ResusableComponents/Requests/childRequest.tsx';
import { useAuth } from '../../../ResusableComponents/authUtils.ts';

// Define the structure of a single allergy
const allergies = [
  'Celiaki/gluten',
  'Fisk',
  'Jordnötter',
  'Laktos',
  'Lupin',
  'Mjölprotein',
  'Nötter och Mandel',
  'Selleri',
  'Senap',
  'Sesamfrö och övriga fröer',
  'Skaldjur',
  'Soja',
  'Sulfiter',
  'Tillsatser',
  'Vete/Spannmål',
  'Ägg',
];

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function FetchAvatarDropdown({ onAvatarChange }) {
  const [avatars, setAvatars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState({
    filename: '',
    url: '',
  });

  console.log(babyMonsters);

  useEffect(() => {
    // Load avatars from the imported JSON file
    const avatarData = babyMonsters.map((avatar) => ({
      filename: avatar.filename,
      url: avatar.url,
      id: avatar.id,
    }));
    console.log(avatarData);
    setAvatars(avatarData);
  }, []);

  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar);
    onAvatarChange(avatar.url);
    setIsModalOpen(false); // Close modal after selection
  };

  const openModal = () => setIsModalOpen(true);
  //const closeModal = () => setIsModalOpen(false);

  return (
    <div className='avatar-dropdown'>
      <div className='avatar-display' onClick={openModal}>
        {selectedAvatar.url ? (
          <img
            src={selectedAvatar.url}
            alt={selectedAvatar.filename}
            className='selected-avatar'
          />
        ) : (
          <div className='avatar-placeholder'>Välj avatar</div>
        )}
      </div>

      {isModalOpen && (
        <div className='avatar-modal'>
          <HeaderWithBackButton
            title='Välj avatar'
            customBackAction={() => setIsModalOpen(false)}
          />
          <div className='avatar-grid'>
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className='avatar-item'
                onClick={() => handleSelect(avatar)}
              >
                <img
                  src={avatar.url}
                  alt={avatar.filename}
                  className='avatar-image'
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AllergiesDropdown() {
  const { setValue } = useFormContext();
  const [selectedValues, setSelectedValues] = useState([]);

  const onSelect = (selectedList) => {
    setSelectedValues(selectedList);
    setValue('allergies', selectedList);
  };

  const onRemove = (selectedList) => {
    setSelectedValues(selectedList);
    setValue('allergies', selectedList);
  };

  return (
    <div className='allergies-dropdown'>
      <Multiselect
        options={allergies}
        isObject={false}
        selectedValues={selectedValues}
        onSelect={onSelect}
        onRemove={onRemove}
        placeholder='Allergier, om några'
      />
    </div>
  );
}

function ChildDataForm() {
  const { userId } = useAuth();
  const methods = useForm({
    defaultValues: {
      allergies: [],
    },
  });

  const { register, handleSubmit, setValue, watch } = methods;

  const onSubmit = async (data) => {
    // Transforming the allergies data from object to array
    const selectedAllergies = Object.entries(data.allergies)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    const childData = {
      ...data,
      allergies: selectedAllergies,
    };

    try {
      const response = await createUserChild(userId, childData);
      console.log('Response:', response);
    } catch (error) {
      setError('Failed to create child. Please try again.');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FetchAvatarDropdown
          onAvatarChange={(url) => setValue('avatar', url)}
        />
        <input
          className='input-field'
          type='text'
          placeholder='Förnamn / smeknamn'
          {...register('name', { required: true })}
        />
        <select className='select-field' {...register('gender')}>
          <option value='Pojke'>Pojke</option>
          <option value='Flicka'>Flicka</option>
          <option value='Binär'>Binär</option>
        </select>
        <input
          className='input-field'
          type='date'
          placeholder='Födelsedatum'
          {...register('birthDate')}
        />
        <AllergiesDropdown register={register} />
        <Button>Spara barn</Button>
      </form>
    </FormProvider>
  );
}

export default function AddKidsPage() {
  return (
    <>
      <HeaderWithBackButton title='Lägg till barn' />
      <main>
        <ChildDataForm />
      </main>
    </>
  );
}
