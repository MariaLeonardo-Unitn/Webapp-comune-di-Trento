import React, { useState, useEffect } from "react";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  const fetchPokemons = async () => {
    try {
      const response = await fetch("https://pokedex.mimo.dev/api/pokemon");
      console.log("API Response:", response); // Log the API response
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched Data:", data); // Log the fetched data
      if (data.length === 0) {
        setError("No Pokémon found.");
      } else {
        setPokemons(data);
      }
    } catch (error) {
      setError("Failed to fetch Pokémon: " + error.message);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="pokedex">
      <h2>All Pokemon</h2>
      {error && <p>{error}</p>}
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <img
              src={`https://raw.githubusercontent.com/getmimo/things-api/main/files/pokedex/sprites/master/sprites/pokemon/${
                pokemon.url.split("/").filter(Boolean).pop()
              }.png`}
              alt={pokemon.name}
            />
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pokedex;
