import React, { Fragment, Component } from "react";

// LEVEL 3 COMPONENT
class Teacher extends Component {
  render() {
    return (
      <div>
        My name is <strong>{this.props.person.name}</strong>
      </div>
    );
  }
}

// LEVEL 2 COMPONENT
class Topic extends Component {
  render() {
    return (
      <div>
        Talk is the about the <strong>{this.props.data.topic}</strong>
        <Teacher person={this.props.data} />
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
        <p>
          the <em>New React 16.3.1</em>
        </p>
        <Topic data={this.state} />
      </div>
    );
  }
}

export default App;
