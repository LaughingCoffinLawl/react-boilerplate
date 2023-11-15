import React, { Component } from "react";
import Counter from "./counter";
import "./App.css";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["Just some demo task", "As an example"],
      inputVal: "",
      counter: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: "",
    }));
  }

  handleDelete(index) {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.filter((_, i) => i !== index);
      return {
        todos: updatedTodos,
      };
    });
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <Counter counter={this.state.todos.length} />
        <ul>
          {this.state.todos.map((todo, index) => (
            <div key={todo} className="task">
              <li key={todo}>{todo}</li>
              <button
                className="delete"
                onClick={() => this.handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
