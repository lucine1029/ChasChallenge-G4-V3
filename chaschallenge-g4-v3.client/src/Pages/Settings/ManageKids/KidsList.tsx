//@ts-nocheck
import { useState, useEffect } from 'react';
import { getUser } from '../../../ResusableComponents/Requests/userRequest';
import { LiaEllipsisHSolid, LiaEdit, LiaTrashAlt } from 'react-icons/lia';
import '../../../scss/Sass-Pages/_KidsList.scss';
import { useAuth } from '../../../ResusableComponents/authUtils';

const initialChildren = [
  {
    id: 118836,
    image: 'https://img.pokemondb.net/sprites/home/normal/charmander.png',
    firstName: 'Zoro',
    birthdate: '14 january, 2022',
    sex: 'Pojke',
  },
  {
    id: 118846,
    image: 'https://img.pokemondb.net/sprites/home/normal/wartortle.png',
    firstName: 'Zara',
    birthdate: '12 juni, 2020',
    sex: 'Flicka',
  },
];

export default function KidsList() {
  const [kids, setKids] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser(userId);
        setKids(userData.children);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <ul className='manage-kids'>
      {kids.map((kid, index) => (
        <Kid
          key={index}
          kid={{
            id: index,
            image: 'https://img.pokemondb.net/sprites/home/normal/pikachu.png',
            firstName: kid.name,
            birthdate: new Date(kid.birthdate).toLocaleDateString('sv-SE'),
            gender: kid.gender,
          }}
        />
      ))}
    </ul>
  );
}

function Kid({ kid }) {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <li className='card column'>
      <div className='menu-container'>
        <LiaEllipsisHSolid onClick={toggleMenu} />
        {showMenu && (
          <ul className='menu'>
            <li onClick={() => console.log('Edit:', kid.id)}>
              <LiaEdit /> Edit
            </li>
            <li onClick={() => console.log('Remove:', kid.id)}>
              <LiaTrashAlt /> Remove
            </li>
          </ul>
        )}
      </div>
      <div className='row row-divider'>
        <div className='avatar-container'>
          <img className='avatar' src={kid.image} />
        </div>

        <div>
          <h3>{kid.firstName}</h3>
          <p>
            {kid.gender}, född {kid.birthdate}.
          </p>
        </div>
      </div>
      <div className='row'>
        <span className='allergy'>Allergi-1</span>
        <span className='allergy'>Allergi-2</span>
      </div>
    </li>
  );
}
