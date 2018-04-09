import React, { Component, Fragment } from "react";

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
      <MyContext.Provider
        value={{
          state: this.state,
          talksGiven: () => {
            this.setState({
              talks: this.state.talks + 1
            });
          }
        }}
      >
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
            <Fragment>
              <p>
                I have given <strong>{context.state.talks}+</strong> talks
              </p>
              <button onClick={context.talksGiven}>Talkative</button>
              <p>
                Requirements: <strong>{context.state.notes}</strong>
              </p>
            </Fragment>
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
        <MyContext.Consumer>
          {context => (
            <p>
              My name: <strong>{context.state.name}</strong>
            </p>
          )}
        </MyContext.Consumer>
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
          <MyContext.Consumer>
            {context => (
              <p>
                Today's Topic: <strong>{context.state.topic}+</strong>
              </p>
            )}
          </MyContext.Consumer>
          <Topic />
        </div>
      </MyProvider>
    );
  }
}

export default App;
