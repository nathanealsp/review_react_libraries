import React, { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';

const SearchBox = () => {
  const { accountUsers: users } = useContext(AppContext);
  const [filteredUser, setFilteredUser] = useState([]);
  const handleChange = e => {
    setFilteredUser(e.target.value.toLowerCase().replace(/\s/g, ''));
  };

  return (
    <div>
      <input type="search" name="" id="" onChange={handleChange} />
      <ul>
        {users
          .filter(user =>
            user.name
              .toLowerCase()
              .replace(/\s/g, '')
              .includes(filteredUser)
          )
          .map((user, idx) => (
            <li key={idx}>{user.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default SearchBox;
