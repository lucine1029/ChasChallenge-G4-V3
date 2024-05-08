//@ts-nocheck

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

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

function AvatarDropdown({ onAvatarChange }) {
  const [avatars, setAvatars] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState({
    url: 'https://via.placeholder.com/50',
  });

  useEffect(() => {
    const fetchPokemonAvatars = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=50'
        );
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url);
            return {
              url: detailResponse.data.sprites.front_default,
            };
          })
        );
        setAvatars(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemonAvatars();
  }, []);

  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar);
    onAvatarChange(avatar.url);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          cursor: 'pointer',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          display: 'flex',
          //justifyContent: 'center', // Center the image
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={selectedAvatar.url || 'https://via.placeholder.com/50'}
          alt='Selected Avatar'
          style={{ width: '100px', height: '100px' }}
        />
      </div>

      {isOpen && (
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            border: '1px solid #ccc',
            maxHeight: '200px',
            overflowY: 'auto',
            padding: '0',
            margin: '0',
            listStyle: 'none',
            backgroundColor: '#fff',
            zIndex: '1000',
          }}
        >
          {avatars.map((avatar, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center', // Center the image
              }}
              onClick={() => handleSelect(avatar)}
            >
              <img
                src={avatar.url}
                alt={`Avatar ${index}`}
                style={{ width: '50px', height: '50px' }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AllergiesComp({ register, watch, setValue }) {
  // Use React Hook Form to manage form state for allergies
  return (
    <div>
      <form>
        {allergies.map((allergen, index) => (
          <div key={index}>
            <label>
              <input
                type='checkbox'
                {...register(allergen.allergen)}
                checked={watch(allergen.allergen)}
                onChange={() =>
                  setValue(allergen.allergen, !watch(allergen.allergen))
                }
              />
              {allergen.allergen}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
}

function ChildDataForm({ register, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Förnamn / smeknamn'
        {...register('name', { required: true })}
      />
      <select {...register('gender')}>
        <option value='Pojke'>Pojke</option>
        <option value='Flicka'>Flicka</option>
        <option value='Binär'>Binär</option>
      </select>
      <input
        type='number'
        placeholder='Födelsedatum'
        {...register('birthDate')}
      />
      <input type='submit' value='Save Child' />
    </form>
  );
}

function AddChildPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleAvatarChange = (avatarUrl) => {
    setValue('avatar', avatarUrl);
    console.log('Avatar selected:', avatarUrl);
  };

  return (
    <div>
      <AvatarDropdown onAvatarChange={handleAvatarChange} />
      <ChildDataForm
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
      />
      <AllergiesComp register={register} watch={watch} setValue={setValue} />
    </div>
  );
}

export default AddChildPage;
