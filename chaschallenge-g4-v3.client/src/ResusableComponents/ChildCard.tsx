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
          <p>14 January 2024</p>
          <div className='column'>
            <span className='allergy'>Allergi-1</span>
            <span className='allergy'>Allergi-2</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChildCard;
