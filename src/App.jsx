import React, { Component } from "react";

// CREATE A CONTEXT
const MyContext = React.createContext();

// CREATE A CONTEXT PROVIDER COMPONENT (JUST LIKE REDUX)
class MyProvider extends Component {
  state = {
    name: "Nathaneals",
    topic: "New Context API",
    talks: 100,
    notes: ["react@next", "react-dom@next"]
  };

  render() {
    return (
      <MyContext.Provider value={{ state: this.state }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

// LEVEL 4 COMPONENT
class Teacher extends Component {
  render() {
    return (
      <div>
        <MyContext.Consumer>
          {context => (
            <p>
              Talk is the about the <strong>{context.state.name}</strong>
            </p>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}

// LEVEL 3 COMPONENT
class Topic extends Component {
  render() {
    return (
      <div>
        Talk is the about the <strong>Hey</strong>
        <Teacher />
      </div>
    );
  }
}

// MAIN COMPONENT

class App extends Component {
  render() {
    return (
      <MyProvider>
        <div className="App">
          <p>
            the <em>New React 16.3.1</em>
          </p>
          <Topic />
        </div>
      </MyProvider>
    );
  }
}

export default App;
