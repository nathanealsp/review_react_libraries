import React, { useState } from 'react';
import SearchBar from './downshift/searchbar/SearchBar';
// import AppContext from './context/AppContext';
// MAIN COMPONENT
const App = () => {
  const [title] = useState('DownShift use cases');

  return (
    <div className="container">
      {title}
      <SearchBar />
    </div>
  );
};

export default App;
