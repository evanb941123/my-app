import { useState, useEffect } from 'react'
import './App.css'

//https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0

const convertName = (name) => {
  return name.split("-").map(item => item.charAt(0).toUpperCase() + item.slice(1)).join("-");
}

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=100");
        if (!response.ok) {
          throw new Error(`HTTP error! ${response.status}, ${response.statusText}`);
        }
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonList();
  }, []);

  if (loading) return <p>Loading Pokemons...</p>

  if (error) {
    return (
      <div>
        <h3>Failed to load data</h3>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Pokemon List</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Detail URL</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{convertName(pokemon.name)}</td>
              <td>
                <a href={pokemon.url}>View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
