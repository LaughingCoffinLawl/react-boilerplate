import { useEffect, useState } from "react";
import "./App.scss";

const POKEMON_IDS = [5, 10, 35, 12, 45, 3, 15, 151, 143, 121, 74, 81];

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [clicked, setClicked] = useState(new Set());

  function increaseScore() {
    if (score === maxScore) {
      setMaxScore(maxScore + 1);
    }
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

  const shufflePokemon = () => {
    setPokemonData((prevData) => shuffleArray(prevData));
  };

  const handlePokemonClick = (pokemon) => {
    if (clicked.has(pokemon)) {
      // Reset everything if the pokemon is clicked twice
      setScore(0);
      setClicked(new Set());
      fetchPokemonData();
      setClicked(new Set());
      alert("Game Over!");
    } else {
      // Shuffle the pokemons on each click
      shufflePokemon();

      // Increment the score
      increaseScore();

      // Add the clicked pokemon to the `clicked` set
      setClicked((prevClicked) => new Set([...prevClicked, pokemon]));

      // Check if the player has clicked all the pokemons
      if (score === POKEMON_IDS.length - 1) {
        alert("You Won!");
        setPokemonData([]);
        setScore(0);
        setClicked(new Set());
        fetchPokemonData();
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setClicked(new Set());
    fetchPokemonData();
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
        <div className="buttons">
          <button onClick={resetGame}>Retry</button>
        </div>
      </div>

      <div className="grid">
        {pokemonData.map((pokemon, index) => (
          <div className="pokemon" key={index}>
            <img
              src={pokemon.image}
              alt=""
              className={`img ${clicked.has(pokemon) ? "clicked" : ""}`}
              onClick={() => {
                handlePokemonClick(pokemon);
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
