import { useState, useEffect } from 'react';
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

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function FetchAvatarDropdown({ onAvatarChange }) {
  const [avatars, setAvatars] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState({
    name: '',
    url: 'https://via.placeholder.com/100', // Default placeholder image
  });

  useEffect(() => {
    const fetchAvatars = async () => {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=50'
      );
      const avatarData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const detail = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            url: detail.data.sprites.front_default,
          };
        })
      );
      setAvatars(avatarData);
    };
    fetchAvatars();
  }, []);

  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar);
    onAvatarChange(avatar.url);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      <div
        style={{
          cursor: 'pointer',
          padding: '10px',
          //border: '1px solid #ccc',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={selectedAvatar.url || 'https://via.placeholder.com/100'}
          alt={selectedAvatar.name}
          style={{ width: '100px', height: '100px', marginRight: '10px' }}
        />
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            border: '1px solid #ccc',
            maxHeight: '300px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            zIndex: '1000',
          }}
        >
          {avatars.map((avatar, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => handleSelect(avatar)}
            >
              <img
                src={avatar.url}
                alt={avatar.name}
                style={{ width: '100px', height: '100px', marginRight: '10px' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChildDataForm() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FetchAvatarDropdown onAvatarChange={(url) => setValue('avatar', url)} />
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

      <select {...register('allergies')} multiple>
        {allergies.map((allergy, index) => (
          <option key={index} value={allergy}>
            {allergy}
          </option>
        ))}
      </select>

      <Button>Save Child</Button>
    </form>
  );
}

export default function AddChildPage() {
  return (
    <div>
      <h1>Add Child</h1>
      <ChildDataForm />
    </div>
  );
}
