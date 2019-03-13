import React, { useContext, useState, useEffect } from 'react';
import DownShift from 'downshift';
import AppContext from '../../context/AppContext';

const SearchBox = () => {
  const { accountUsers: users } = useContext(AppContext);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelected = selectedItem => {
    setSelectedUser(selectedItem);
  };

  useEffect(() => console.log('loaded'), [selectedUser]);

  return (
    <div className="searchbar">
      {/* Search Box */}
      <DownShift
        itemToString={item => (item ? item.name : '')}
        onChange={handleSelected}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div>
            <input
              name="Search Bar"
              {...getInputProps({
                type: 'search',
                placeholder: 'Find a user',
                className: isOpen ? 'searchbar-input-open' : 'searchbar-input',
              })}
            />
            {isOpen ? (
              <div className="items-container">
                {users
                  .filter(
                    user =>
                      !inputValue ||
                      user.name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((user, idx) => (
                    <div
                      {...getItemProps({
                        item: user,
                        index: idx,
                        key: user.id,
                        className:
                          highlightedIndex === idx
                            ? 'items-selected itemStyle'
                            : 'items itemStyle',
                      })}
                    >
                      {user.name}
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        )}
      </DownShift>
      {selectedUser ? (
        <div
          style={{
            marginTop: '40px',
            background: 'var(--dark)',
            color: 'var(--light',
            padding: selectedUser && '10px',
            borderRadius: '3px',
            border: selectedUser && '2px solid orange',
          }}
        >
          {JSON.stringify(selectedUser)}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBox;
