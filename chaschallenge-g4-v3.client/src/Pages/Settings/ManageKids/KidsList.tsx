import { useState, useEffect, useContext } from 'react';
import { LiaEllipsisHSolid, LiaEdit, LiaTrashAlt } from 'react-icons/lia';
import '../../../scss/Sass-Pages/_KidsList.scss';
// import { getUser } from '../../../ResusableComponents/Requests/userRequest';
import { getUsersChildren } from '../../../ResusableComponents/Requests/childRequest';
import { AuthContext } from '../../../ResusableComponents/AuthContext';

// Define an interface for the child object
interface ChildData {
  id: number;
  image: string;
  firstName: string;
  birthdate: string;
  sex: string;
  name: string;
  nickName: string;
  gender: string;
  allergies: { name: string }[];
}

export default function KidsList() {
  const authContext = useContext(AuthContext);
  const [child, setChild] = useState<ChildData | null>(null); // Specify the type

  useEffect(() => {
    const fetchChild = async () => {
      if (authContext?.userId) {
        try {
          // const data = await getUser(authContext.userId);
          const data = await getUsersChildren(authContext.userId);
          console.log('Fetched data:', data);
          if (data) {
            setChild(data);
          } else {
            console.log('No child found in the response');
          }
        } catch (error) {
          console.error('Error fetching child data', error);
        }
      }
    };
    fetchChild();
  }, [authContext]);

  return (
    <>
      <ul className='manage-children'>
        {/* Render the list of children dynamically */}
        {child && <Child child={child} />}
      </ul>
    </>
  );
}

function Child({ child }: { child: ChildData }) {
  // Specify the type of the prop
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <li className='card column'>
      <div className='menu-container'>
        <div className='children-container'>
          <h2>Barn:</h2>
          {child ? (
            <ul>
              <li>Namn: {child.name}</li>
              <li>Smeknamn: {child.nickName}</li>
              <li>Kön: {child.gender}</li>
              <li>Födelsedatum: {child.birthdate}</li>
              <li>
                Allergier:{' '}
                {child.allergies.map((allergy: { name: string }, index: number) => (
                  <span key={index}>
                    {allergy.name}
                    {index < child.allergies.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </li>
            </ul>
          ) : (
            <p>No child found</p>
          )}
        </div>

        <LiaEllipsisHSolid onClick={toggleMenu} />
        {showMenu && (
          <ul className='menu'>
            <li onClick={() => console.log('Edit:', child.id)}>
              <LiaEdit /> Edit
            </li>
            <li onClick={() => console.log('Remove:', child.id)}>
              <LiaTrashAlt /> Remove
            </li>
          </ul>
        )}
      </div>
      <div className='row row-divider'>
        <div className='avatar-container'>
          <img className='avatar' src={child.image} alt={child.name} />
        </div>

        <div>
          <h3>{child.firstName}</h3>
          <p>
            {child.sex}, född {child.birthdate}.
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
