// @ts-nocheck
import { useState, useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton.tsx';
import '../../../scss/Sass-Pages/_AddKidsPage.scss';
import { Multiselect } from 'multiselect-react-dropdown';
import babyMonsters from '../../../baby-monsters.json';
import { createUserKid } from '../../../ResusableComponents/Requests/childRequest.tsx';
import { useAuth } from '../../../ResusableComponents/authUtils.ts';

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

  useEffect(() => {
    const avatarData = babyMonsters.map((avatar) => ({
      filename: avatar.filename,
      url: avatar.url,
      id: avatar.id,
    }));
    setAvatars(avatarData);
  }, []);

  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar);
    onAvatarChange(avatar.url);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);

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
    setValue('allergies', selectedList); // Set selected allergies
  };

  const onRemove = (selectedList) => {
    setSelectedValues(selectedList);
    setValue('allergies', selectedList); // Set selected allergies
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

function KidDataForm() {
  const { userId } = useAuth();
  console.log(userId);

  const methods = useForm({
    defaultValues: {
      name: '',
      nickName: '',
      gender: '',
      imageSource: '',
      birthdate: '',
      allergies: [], // Include allergies in the form, but we won't send it in the request
    },
  });

  const { register, handleSubmit, setValue } = methods;

  const onSubmit = async (data) => {
    const { allergies, ...kidDataWithoutAllergies } = {
      ...data,
      birthdate: new Date(data.birthdate).toISOString(), // Ensure date format is correct
    };

    console.log(
      'Data being sent to the server:',
      JSON.stringify(kidDataWithoutAllergies, null, 2)
    );

    try {
      const response = await createUserKid(userId, kidDataWithoutAllergies);
      console.log('Response:', response);
    } catch (error) {
      console.error(
        'Failed to create child:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FetchAvatarDropdown
          onAvatarChange={(url) => setValue('imageSource', url)} // Correct field name to imageSource
        />
        <input
          className='input-field'
          type='text'
          placeholder='Förnamn'
          {...register('name', { required: true })}
        />
        <input
          className='input-field'
          type='text'
          placeholder='Smeknamn'
          {...register('nickName', { required: true })}
        />
        <select
          className='select-field'
          {...register('gender')}
          defaultValue=''
        >
          <option value='' disabled hidden>
            Identitet
          </option>
          <option value='Binär'>Binär</option>
          <option value='Flicka'>Flicka</option>
          <option value='Pojke'>Pojke</option>
        </select>
        <input
          className='input-field'
          type='date'
          placeholder='Födelsedatum'
          {...register('birthdate')}
        />
        <AllergiesDropdown />
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
        <KidDataForm />
      </main>
    </>
  );
}
