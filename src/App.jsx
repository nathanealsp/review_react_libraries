import React, { useState } from 'react';
import { Router, Link } from '@reach/router';
import SearchBar from './downshift/searchbar/SearchBar';
import SelectBox from './downshift/selectbox/SelectBox';
// import AppContext from './context/AppContext';
// MAIN COMPONENT
const App = ({ children }) => {
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
          <Link className="linkStyle" to="selectbox">
            Select Box
          </Link>
        </button>
      </div>
      <Router>
        <SearchBar path="/" />
        <SelectBox path="selectbox" />
      </Router>
    </div>
  );
};

export default App;
