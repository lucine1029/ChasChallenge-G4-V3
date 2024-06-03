// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton.tsx';
import '../../../scss/Sass-Pages/_AddKidsPage.scss';
import { Multiselect } from 'multiselect-react-dropdown';
import babyMonsters from '../../../baby-monsters.json';
import {
  createUserKid,
  updateUserKid,
} from '../../../ResusableComponents/Requests/childRequest.tsx';
import { useAuth } from '../../../ResusableComponents/authUtils.ts';
import '../../../scss/Sass-Pages/_AddKidsPage.scss';

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
  return (
    <button className='add-child-btn' onClick={onClick}>
      {children}
    </button>
  );
}

function FetchAvatarDropdown({ onAvatarChange, defaultAvatar }) {
  const [avatars, setAvatars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState({
    filename: '',
    url: defaultAvatar || '',
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

function AllergiesDropdown({ defaultAllergies }) {
  const { setValue } = useFormContext();
  const [selectedValues, setSelectedValues] = useState(defaultAllergies || []);

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

function KidDataForm({ defaultValues, isEditing, onSave }) {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: defaultValues || {
      name: '',
      nickName: '',
      gender: '',
      imageSource: '',
      birthdate: '',
      allergies: [], // Include allergies in the form, but we won't send it in the request
    },
  });
  const { register, handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

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
      if (isEditing) {
        await onSave(userId, defaultValues.id, kidDataWithoutAllergies);
      } else {
        await createUserKid(userId, kidDataWithoutAllergies);
        navigate('/settings/kids');
      }
    } catch (error) {
      console.error(
        'Failed to save child:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form className='add-child-card' onSubmit={handleSubmit(onSubmit)}>
        <FetchAvatarDropdown
          onAvatarChange={(url) => setValue('imageSource', url)} // Correct field name to imageSource
          defaultAvatar={defaultValues?.imageSource}
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
          defaultValue={defaultValues?.gender || ''}
        >
          <option value='' disabled hidden>
            Identitet
          </option>
          <option value='Binär'>Icke binär</option>
          <option value='Flicka'>Flicka</option>
          <option value='Pojke'>Pojke</option>
        </select>
        <input
          className='input-field'
          type='date'
          placeholder='Födelsedatum'
          {...register('birthdate')}
        />
        <AllergiesDropdown
          defaultAllergies={defaultValues?.allergies.map((a) => a.name)}
        />
        <Button>{isEditing ? 'Spara' : 'Lägg till barn'}</Button>
      </form>
    </FormProvider>
  );
}

export default function AddKidsPage({ defaultValues, isEditing, onSave }) {
  return (
    <>
      <HeaderWithBackButton
        title={isEditing ? 'Uppdatera barn' : 'Lägg till barn'}
      />
      <main>
        <KidDataForm
          defaultValues={defaultValues}
          isEditing={isEditing}
          onSave={onSave}
        />
      </main>
    </>
  );
}
