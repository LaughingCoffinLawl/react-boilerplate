import { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./App.css";

// Hello world exercise
function HelloWorld() {
  return (
    <div className="div">
      <h1>Hello World!</h1>
    </div>
  );
}

// JSX and Props exercise
function PropsComponent(props) {
  return (
    <div className="div">
      <p>Greetings {props.name}!</p>
    </div>
  );
}
PropsComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

PropsComponent.defaultProps = {
  name: "Marco",
};

// State and Event Handling exercise
function ButtonComponent() {
  const [clicked, setClicked] = useState(0);
  return (
    <div className="div">
      <button onClick={eventHandler}>Click</button>
      {clicked}
    </div>
  );

  function eventHandler() {
    setClicked(clicked + 1);
  }
}

// List and Mapping exercise
function ListAndMap({ items }) {
  return (
    <div className="div">
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

ListAndMap.propTypes = {
  items: PropTypes.array.isRequired,
};

ListAndMap.defaultProps = {
  items: [1, 2, 3, 4, 5, 6, 7],
};

// Conditional Rendering exercise
function BooleanState() {
  const [clickedTwo, setClickedTwo] = useState(false);
  return (
    <div className="div">
      <button
        onClick={() => {
          setClickedTwo(!clickedTwo);
        }}
      >
        Click me!
      </button>
      {clickedTwo ? <p>cliccato</p> : <p>non-cliccato</p>}
    </div>
  );
}

// Form Handling exercise
function SubmitCredential() {
  return (
    <div className="div">
      <form
        action=""
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          alert(
            "Username: " +
              event.target.querySelector("#username").value +
              " | Password: " +
              event.target.querySelector("#password").value
          );
        }}
      >
        <label htmlFor="username"> Username </label>
        <input type="text" id="username" className="username" />
        <label htmlFor="password"> Password </label>
        <input type="password" id="password" className="password" />
        <input type="submit" className="submit" value="Submit" />
      </form>
    </div>
  );
}

// Lifecycle Methods exercise
class LifeCycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => response.json())
      .then((data) => {
        // Update state with the fetched data
        this.setState({ data: data, loading: false, error: null });
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        this.setState({ data: null, loading: false, error });
      });
  }

  render() {
    const { data, loading, error } = this.state;
    return (
      <div className="div">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <div>
            <h2>{data.name}</h2>
            <img src={data.sprites.front_default} alt={`${data.name} sprite`} />
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
          </div>
        )}
      </div>
    );
  }
}

function DataFetcher() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/140", {
      mode: "cors",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("404 server not found");
        }
        return response.json();
      })
      .then((response) => setData(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="div">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>Data:</h2>
          <p>User ID: {data.userId}</p>
          <p>ID: {data.id}</p>
          <p>Title: {data.title}</p>
          <p>Completed: {data.completed ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}

const App = () => {
  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are some examples of links to other pages</p>
      <nav>
        <ul>
          <li>
            <Link to="profile">Profile page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export {
  HelloWorld,
  PropsComponent,
  ButtonComponent,
  ListAndMap,
  BooleanState,
  SubmitCredential,
  LifeCycle,
  App,
  DataFetcher,
};
