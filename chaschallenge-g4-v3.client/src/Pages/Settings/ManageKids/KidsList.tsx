//@ts-nocheck
import { useState, useEffect } from 'react';
import { getUser } from '../../../ResusableComponents/Requests/userRequest';
import { LiaEllipsisHSolid, LiaEdit, LiaTrashAlt } from 'react-icons/lia';
import '../../../scss/Sass-Pages/_KidsList.scss';
import { useAuth } from '../../../ResusableComponents/authUtils';

export default function KidsList({ onEditClick }) {
  const [kids, setKids] = useState([]);
  const { userId } = useAuth();
  const [refresh, setRefresh] = useState(false); // State to trigger rerender

  const fetchData = async () => {
    try {
      const userData = await getUser(userId);
      setKids(userData.children);
      console.log(userData.children);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, refresh]); // Add refresh to dependencies to refetch data

  return (
    <ul className='manage-kids'>
      {kids.map((kid, index) => (
        <Kid
          key={index}
          kid={{
            id: kid.id,
            imageSource: kid.imageSource,
            name: kid.name,
            nickName: kid.nickName || '',
            birthdate: new Date(kid.birthdate).toLocaleDateString('sv-SE'),
            gender: kid.gender,
            allergies: kid.allergies || [],
          }}
          onEditClick={onEditClick}
        />
      ))}
    </ul>
  );
}

function Kid({ kid, onEditClick }) {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <li className='card column'>
      <div className='menu-container'>
        <LiaEllipsisHSolid onClick={toggleMenu} />
        {showMenu && (
          <ul className='menu'>
            <li onClick={() => onEditClick(kid)}>
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
          <img className='avatar' src={kid.imageSource} />
        </div>

        <div>
          <h3>{kid.name}</h3>
          <p>
            {kid.gender}, född {kid.birthdate}.
          </p>
        </div>
      </div>
      <div className='row'>
        {kid.allergies.length > 0 ? (
          kid.allergies.map((allergy, index) => (
            <span key={index} className='allergy'>
              {allergy.name}
            </span>
          ))
        ) : (
          <span className='no-allergy'>Inga allergier</span>
        )}
      </div>
    </li>
  );
}
