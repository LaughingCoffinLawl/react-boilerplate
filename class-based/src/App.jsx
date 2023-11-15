import React, { Component } from "react";
import { useState } from "react";
import Counter from "./counter";
import "./App.css";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["Just some demo task", "As an example"],
      inputVal: "",
      counter: 0,
      edit: 0,
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

  handleEdit(index) {
    // Set editIndex to the clicked task index
    this.setState({
      editIndex: index,
      inputVal: this.state.todos[index], // Set inputVal to the task content
    });
  }

  handleSave(index) {
    this.setState((prevState) => {
      const updatedTodos = [...prevState.todos];
      updatedTodos[index] = prevState.inputVal;

      return {
        todos: updatedTodos,
        editIndex: -1, // Reset the editIndex after saving
        inputVal: "",
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
              <>
                {this.state.editIndex !== index ? (
                  <li key={todo}>{todo}</li>
                ) : (
                  <input
                    type="text"
                    key={todo}
                    value={this.state.inputVal}
                    onChange={this.handleInputChange}
                  />
                )}
                {this.state.editIndex !== index ? (
                  <button
                    className="delete"
                    onClick={() => this.handleDelete(index)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className="save"
                    onClick={() => this.handleSave(index)}
                  >
                    Save
                  </button>
                )}
                <button className="edit" onClick={() => this.handleEdit(index)}>
                  Edit
                </button>
              </>
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
