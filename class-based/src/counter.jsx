// Counter.js
import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <>
        <h1>Counter: {this.props.counter}</h1>
      </>
    );
  }
}

export default Counter;
