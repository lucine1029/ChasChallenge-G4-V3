//@ts-nocheck
import { useState, useEffect } from 'react';
import axios from 'axios';
import AvatarCard from './AvatarCard';

function AvatarList() {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchPokemonAvatars = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=50'
        ); // Fetch 50 pokemons
        const pokemonEntries = response.data.results;
        const pokemonData = await Promise.all(
          pokemonEntries.map(async (pokemon) => {
            const pokemonDetail = await axios.get(pokemon.url); // Fetch details for each pokemon
            return {
              name: pokemon.name,
              imageUrl: pokemonDetail.data.sprites.front_default, // Get the default front sprite
            };
          })
        );
        setAvatars(pokemonData);
      } catch (error) {
        console.error('Failed to fetch pokemons:', error);
      }
    };

    fetchPokemonAvatars();
  }, []);

  return (
    <div>
      {avatars.map((avatar, index) => (
        <AvatarCard key={index} name={avatar.name} imageUrl={avatar.imageUrl} />
      ))}
    </div>
  );
}

export default AvatarList;
