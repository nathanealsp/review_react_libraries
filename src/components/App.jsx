import React, { Component } from "react";
import PropTypes from "prop-types";
// COMPONENT IMPORT
import Order from "./Order";
import Header from "./Header";
import Inventory from "./Inventory";
import Fish from "./Fish";
import base from "../base";
import sampleFishes from "../sample-fishes";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  // PROP-TYPES
  static propTypes = {
    match: PropTypes.object
  };
  //***********LIFE CYCLE METHOD***********//
  //***********PERSISTING STATE WITH  FIREBASE***********//
  componentDidMount() {
    // SYNC WITH THE NAME OF THE STORE.
    // THIS IS PROPS OFF THE APP COMPONENT
    const { params } = this.props.match;

    // THIS .REF IS REFERENCEING THE PARTICULAR DB
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });

    // REINSTATE OUR LOCAL STORAGE IF IT EXISTS
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
  }

  //***********PERSISTING STATE WITH  LOCAL STORAGE***********//
  componentDidUpdate() {
    // console.log(this.state.order);

    // STORING TO LOCAL STORAGE,KEY -> URL, VALUE -> ORDER, AND VALUE ONE ACCEPTS STRINGS, BOOLEANS, NUMBERS
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
    // const order = JSON.parse(this.state.order);
    // this.setState({ order });
  }

  // TO PREVENT MEMORY LEAK, WE HAVE TO UNMOUNT IT
  componentWillUnMount() {
    base.removeBinding(this.ref);
  }

  //*********** ************TO ADD FISH***********************//
  addFish = fish => {
    // MAKE A COPY OF THE STATE, AVOID MUTATION (PERFORMACE ISSUES, AND THINGS UPDATING OUT OF ORDER)
    const fishes = { ...this.state.fishes };
    // ADD A NEW FISH (WE ARE USING DATE.NOW()TO CREATE UNIQUE KEY = FISH)
    fishes[`fish${Date.now()}`] = fish;
    // UPDATING THE FISHES.
    this.setState({ fishes: fishes });
  };

  //*******************TO LOAD SAMPLE FISH*******************//
  loadSamplesFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  //**********************ADD TO ORDER**********************//
  addToOrder = key => {
    //MAKE A COPY OF THE STATE & UPDATE OUR STATE
    const order = { ...this.state.order };
    //  UPDATE OR ADD THE NEW NUMBER OF FISH ORDERED
    order[key] = order[key] + 1 || 1; //THIS WILL EITHER INCREMENT OR CREATE A NEW FISH WHENEVER WE ADD TO ORDER.
    this.setState({ order });
  };

  //***********************UPDATE FISH***********************//
  updateFish = (key, updatedFish) => {
    // MAKE A COPY OF THE STATE, AVOID MUTATION (PERFORMACE ISSUES, AND THINGS UPDATING OUT OF ORDER)
    const fishes = { ...this.state.fishes };
    // UPDATE THAT STATE
    fishes[key] = updatedFish;
    // UPDATING THE FISHES.
    this.setState({ fishes: fishes });
  };

  //***********************REMOVE FISH***********************//
  removeFromOrder = key => {
    // MAKE A COPY OF THE STATE, AVOID MUTATION (PERFORMACE ISSUES, AND THINGS UPDATING OUT OF ORDER)
    const order = { ...this.state.order };
    // REMOVE FROM ORDER
    delete order[key];
    // UPDATING THE FISHES.
    this.setState({ order });
  };

  //***********************DELETING FISH***********************//
  deleteFish = key => {
    // MAKE A COPY OF THE STATE, AVOID MUTATION (PERFORMACE ISSUES, AND THINGS UPDATING OUT OF ORDER)
    const fishes = { ...this.state.fishes };
    // DELETING FROM BOTH FIREBASE AND STATE
    fishes[key] = null;
    // UPDATING THE FISHES AFTER THE DELETE
    this.setState({ fishes });
  };

  //********************MAIN COMPONENT********************//
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {/* CHANGING AN OBJECT INTO AN ARRAY AND USING THE KEY AS A UNIQUE KEY, REFER TO SAMPLE DATA FOR FORMAT */}
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSamplesFishes={this.loadSamplesFishes}
          addToOrder={this.addToOrder}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeId = {this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
