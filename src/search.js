import React, { useState } from 'react';

function Search() {
 const [input, setInput] = useState("");
 const [pokemon, setPokemon] = useState(null);
 const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    setError(null); // Reset error state before fetching
    try {
      const response = await fetch(
        `https://pokedex.mimo.dev/api/pokemon/${input.toLowerCase()}`
      );
      console.log("API Response:", response); // Log the API response
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched Data:", data); // Log the fetched data
      if (!data) {
        setError("Pokémon not found.");
      } else {
        setPokemon(data);
      }
    } catch (error) {
      setError("Failed to fetch Pokémon: " + error.message);
    }
  };

  return (
    <div className="search">
      <h2>Search a Pokemon</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Pokemon name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={fetchPokemon}>Search</button>
      </div>
      {error && <p>{error}</p>}
      {pokemon && (
        <div className="pokemon-card">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      )}    
    </div>
  );
}

export default Search;
