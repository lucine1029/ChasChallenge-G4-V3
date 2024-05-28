// //@ts-nocheck
// import { useState } from 'react';
// import BackButton from '../../../ResusableComponents/HeaderWithBackButton';
// import { LiaEllipsisHSolid, LiaEdit, LiaTrashAlt } from 'react-icons/lia';
// import '../../../scss/Sass-Pages/_KidsList.scss';
// import { getUserWithChildren } from '../../../ResusableComponents/Requests/childRequest';

// const initialChildren = [
//   {
//     id: 118836,
//     image: 'https://img.pokemondb.net/sprites/home/normal/charmander.png',
//     firstName: 'Zoro',
//     birthdate: '14 january, 2022',
//     sex: 'Pojke',
//   },
//   {
//     id: 118846,
//     image: 'https://img.pokemondb.net/sprites/home/normal/wartortle.png',
//     firstName: 'Zara',
//     birthdate: '12 juni, 2020',
//     sex: 'Flicka',
//   },
// ];

// export default function KidsList() {
//   const [children, setChildren] = useState(initialChildren);

//   return (
//     <ul className='manage-children'>
//       {children.map((child) => (
//         <Child child={child} key={child.id} />
//       ))}
//     </ul>
//   );
// }

// function Child({ child }) {
//   const [showMenu, setShowMenu] = useState(false);
//   const toggleMenu = () => setShowMenu(!showMenu);

//   return (
//     <li className='card column'>
//       <div className='menu-container'>
//         <LiaEllipsisHSolid onClick={toggleMenu} />
//         {showMenu && (
//           <ul className='menu'>
//             <li onClick={() => console.log('Edit:', child.id)}>
//               <LiaEdit /> Edit
//             </li>
//             <li onClick={() => console.log('Remove:', child.id)}>
//               <LiaTrashAlt /> Remove
//             </li>
//           </ul>
//         )}
//       </div>
//       <div className='row row-divider'>
//         <div className='avatar-container'>
//           <img className='avatar' src={child.image} />
//         </div>

//         <div>
//           <h3>{child.firstName}</h3>
//           <p>
//             {child.sex}, född {child.birthdate}.
//           </p>
//         </div>
//       </div>
//       <div className='row'>
//         <span className='allergy'>Allergi-1</span>
//         <span className='allergy'>Allergi-2</span>
//       </div>
//     </li>
//   );
// }

// // --------------------------------------

// //@ts-nocheck
// import { useState, useEffect, useContext } from 'react';
// import BackButton from '../../../ResusableComponents/HeaderWithBackButton';
// import { LiaEllipsisHSolid, LiaEdit, LiaTrashAlt } from 'react-icons/lia';
// import '../../../scss/Sass-Pages/_KidsList.scss';
// import { getUserWithChildren } from '../../../ResusableComponents/Requests/childRequest';
// import { AuthContext } from '../../../ResusableComponents/AuthContext';

// const initialChildren = [
//   {
//     id: 118836,
//     image: 'https://img.pokemondb.net/sprites/home/normal/charmander.png',
//     firstName: 'Zoro',
//     birthdate: '14 january, 2022',
//     sex: 'Pojke',
//   },
//   {
//     id: 118846,
//     image: 'https://img.pokemondb.net/sprites/home/normal/wartortle.png',
//     firstName: 'Zara',
//     birthdate: '12 juni, 2020',
//     sex: 'Flicka',
//   },
// ];

// export default function KidsList() {
//   const [children, setChildren] = useState(initialChildren);

//   const authContext = useContext(AuthContext);
//   const [child, setChild] = useState<any>(null);

// useEffect(() => {
//   const fetchChild = async () => {
//     if (authContext?.userId) {
//       try {
//         const data = await getUserWithChildren(authContext.userId);
//         console.log('Fetched data:', data);
//         if (data) {
//           setChild(data);
//         } else {
//           console.log('No child found in the response');
//         }
//       } catch (error) {
//         console.error('Error fetching child data', error);
//       }
//     }
//   };
//   fetchChild();
// }, [authContext]);

//   return (
//     <ul className='manage-children'>
//       {children.map((child) => (
//         <Child child={child} key={child.id} />
//       ))}
//     </ul>

//       <div className='children-container'>
//         <h2>Barn:</h2>
//         {child ? (
//           <ul>
//           <li>Namn: {child.name}</li>
//           <li>Smeknamn: {child.nickName}</li>
//           <li>Kön: {child.gender}</li>
//           <li>Födelsedatum: {child.birthdate}</li>
//           <li>Allergier: {child.allergies.map((allergy: { name: string }, index: number) => (
//             <span key={index}>{allergy.name}{index < child.allergies.length - 1 ? ', ' : ''}</span>
//           ))}</li>
//         </ul>
//       ) : (
//         <p>No child found</p>
//       )}
//     </div>

//   );
// }

// function Child({ child }) {
//   const [showMenu, setShowMenu] = useState(false);
//   const toggleMenu = () => setShowMenu(!showMenu);

//   return (
//     <li className='card column'>
//       <div className='menu-container'>
//         <LiaEllipsisHSolid onClick={toggleMenu} />
//         {showMenu && (
//           <ul className='menu'>
//             <li onClick={() => console.log('Edit:', child.id)}>
//               <LiaEdit /> Edit
//             </li>
//             <li onClick={() => console.log('Remove:', child.id)}>
//               <LiaTrashAlt /> Remove
//             </li>
//           </ul>
//         )}
//       </div>
//       <div className='row row-divider'>
//         <div className='avatar-container'>
//           <img className='avatar' src={child.image} />
//         </div>

//         <div>
//           <h3>{child.firstName}</h3>
//           <p>
//             {child.sex}, född {child.birthdate}.
//           </p>
//         </div>
//       </div>
//       <div className='row'>
//         <span className='allergy'>Allergi-1</span>
//         <span className='allergy'>Allergi-2</span>
//       </div>
//     </li>
//   );
// }

import { useState, useEffect, useContext } from 'react';
import { LiaEllipsisHSolid, LiaEdit, LiaTrashAlt } from 'react-icons/lia';
import '../../../scss/Sass-Pages/_KidsList.scss';
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
