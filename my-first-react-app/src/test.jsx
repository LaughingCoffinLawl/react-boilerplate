import React, { useState } from "react";
import "./App.css";

const COLORS = ["pink", "green", "blue", "yellow", "purple"];

function App() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
  const [counter, setCounter] = useState(0);
  const onButtonClick = (color) => () => {
    setBackgroundColor(color);
    setCounter(counter + 1);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor,
      }}
    >
      {COLORS.map((color) => (
        <button
          type="button"
          key={color}
          onClick={onButtonClick(color)}
          className={backgroundColor === color ? "selected" : ""}
        >
          {color}
        </button>
      ))}
      <h1>Counter: </h1> {counter}
    </div>
  );
}

function Person() {
  const [person, setPerson] = useState({
    name: "",
    lastname: "",
    age: 100,
  });

  // GOOD - Do this!
  const handleIncreaseAge = () => {
    // copy the existing person object into a new object
    // while updating the age property
    const newPerson = { ...person, age: person.age + 1 };
    setPerson(newPerson);
  };

  return (
    <>
      <input
        type="text"
        value={person.name}
        onChange={(event) => setPerson({ ...person, name: event.target.value })}
      />
      <input
        type="text"
        value={person.lastname}
        onChange={(event) =>
          setPerson({ ...person, lastname: event.target.value })
        }
      />
      <h1>{person.name}</h1>
      <h1>{person.lastname}</h1>
      <h2>{person.age}</h2>
      <button onClick={handleIncreaseAge}>Increase age</button>
    </>
  );
}

export default Person;
