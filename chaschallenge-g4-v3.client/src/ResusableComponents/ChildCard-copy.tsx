//@ts-nocheck
import '../scss/Sass-Pages/_root.scss';
import '../scss/Sass-Pages/_ChildCard.scss';

import {} from 'module';

import React from 'react';

function ChildList() {
  return <></>;
}

function ChildCard() {
  return (
    <ul className='list-container'>
      <li>
        <div className='card'>
          <img
            className='avatar'
            src='https://img.pokemondb.net/sprites/ruby-sapphire/normal/venusaur.png'
            alt='Avatar'
          />
          <div>
            <h2>Barnets Namn</h2>
            <p>Pojke, 14 januari 2024</p>
          </div>
        </div>
        <div className='column'>
          <span className='allergy'>Allergi-1</span>
          <span className='allergy'>Allergi-2</span>
        </div>
      </li>
    </ul>
  );
}

export default ChildCard;
