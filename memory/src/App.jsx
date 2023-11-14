import { useEffect, useState } from "react";
import "./App.scss";

const POKEMON_IDS = [5, 10, 35, 12, 45, 3, 15, 151, 143, 121, 74, 81];

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [clicked, setClicked] = useState(false);

  function increaseScore() {
    setScore(score + 1);
  }

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    try {
      const responses = await Promise.all(
        POKEMON_IDS.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((response) =>
            response.json()
          )
        )
      );

      const dataWithNames = responses.map((data) => ({
        name: data.name,
        image: data.sprites.front_default,
      }));

      setPokemonData(dataWithNames);
    } catch (error) {
      console.error(error);
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handlePokemonClick = (index) => {
    const shuffledData = shuffleArray(pokemonData);
    setPokemonData(shuffledData);
    if (!String(clicked).includes(index)) {
      setClicked((prevClickedPokemon) => {
        // Ensure prevClickedPokemon is an array
        if (!Array.isArray(prevClickedPokemon)) {
          return [index];
        }
        return [...prevClickedPokemon, index];
      });
      increaseScore();
    }
  };

  return (
    <>
      <div className="header">
        <div className="text">
          <h1 className="title">Memory Game</h1>
          <p>You must click on each card once. Test your memory!</p>
        </div>
        <div className="score">
          <p>Score: {score}</p>
          <p>Max Score: {maxScore}</p>
        </div>
      </div>

      <div className="grid">
        {pokemonData.map((pokemon, index) => (
          <div className="pokemon" key={index}>
            <img
              src={pokemon.image}
              alt=""
              className={`pokemon img ${
                String(clicked).includes(index) ? "clicked" : ""
              }`}
              onClick={() => {
                handlePokemonClick(index);
              }}
            />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
