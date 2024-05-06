//@ts-nocheck
import { useState } from 'react';
import '../scss/Sass-Pages/_ChildCard.scss';

const initialChildren = [
  {
    id: 118836,
    image: 'https://img.pokemondb.net/sprites/home/normal/charmander.png',
    firstName: 'Zoro',
    birthdate: '14 january, 2022',
  },
  {
    id: 118836,
    image: 'https://img.pokemondb.net/sprites/home/normal/wartortle.png',
    firstName: 'Zara',
    birthdate: '12 juni, 2020',
  },
];

export default function ChildList() {
  const [children, setChildren] = useState(initialChildren);

  return (
    <ul>
      {children.map((child) => (
        <Child child={child} key={child.id} />
      ))}
    </ul>
  );
}

function Child({ child }) {
  return (
    <li className='container'>
      <div className='avatar'>
        <img src={child.image} />
      </div>
      <div className='text-follow-avatar'>
        <h2>{child.firstName}</h2>
        <p>{child.birthdate}</p>
        <div className='column'>
          <span className='allergy'>Allergi-1</span>
          <span className='allergy'>Allergi-2</span>
        </div>
      </div>
    </li>
  );
}
