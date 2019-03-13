import React, { useState } from 'react';
import { Router, Link } from '@reach/router';
import SearchBar from './downshift/searchbar/SearchBar';
import Dropdown from './downshift/dropdown/Dropdown';
// import AppContext from './context/AppContext';
// MAIN COMPONENT
const App = () => {
  const [title] = useState('DownShift use cases');

  return (
    <div className="container">
      <h1
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bolder',
          margin: '20px',
        }}
      >
        {title}
      </h1>
      <div className="links">
        <button>
          <Link className="linkStyle" to="/">
            Search Bar
          </Link>
        </button>
        <button>
          <Link className="linkStyle" to="dropdown">
            Drop down
          </Link>
        </button>
      </div>
      <Router>
        <SearchBar path="/" />
        <Dropdown path="dropdown" />
      </Router>
    </div>
  );
};

export default App;
