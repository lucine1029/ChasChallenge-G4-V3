//@ts-nocheck
import '../scss/Components/_ChildCard.scss';

import {} from 'module';

import React from 'react';

function ChildCard() {
  return (
    <>
      <div className='container'>
        <div className='avatar'>
          <img src='https://img.pokemondb.net/sprites/ruby-sapphire/normal/venusaur.png' />
        </div>
        <div>
          <h2>Barnets Namn</h2>
          <p>Pojke</p>
          <p>January 2024</p>
          <p>
            <span>Allergi-1</span>
            <span>Allergi-2</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default ChildCard;
