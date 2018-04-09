import React, { Component } from "react";

// LEVEL 3 COMPONENT
class Teacher extends Component {
  render() {
    return (
      <div>
        {/* My name is <strong>{this.props.person.name}</strong> */}
        <Consumer>
          Talk is the about the <strong>{this.value.name}</strong>
        </Consumer>
      </div>
    );
  }
}

// LEVEL 2 COMPONENT
class Topic extends Component {
  render() {
    return (
      <div>
        {/* Talk is the about the <strong>{this.props.data.topic}</strong>
        <Teacher person={this.props.data} /> */}

        <Consumer>
          Talk is the about the <strong>{this.value.name}</strong>
        </Consumer>
        <Teacher />
      </div>
    );
  }
}

// MAIN COMPONENT

class App extends Component {
  state = {
    name: "Nathaneals",
    topic: "New Context API",
    talks: 100,
    notes: ["react@next", "react-dom@next"]
  };
  render() {
    return (
      <div className="App">
        <Provider value={this.state}>
          <p>
            the <em>New React 16.3.1</em>
          </p>
          {this.props.children}
        </Provider>
        <Topic />
      </div>
    );
  }
}

export default App;
