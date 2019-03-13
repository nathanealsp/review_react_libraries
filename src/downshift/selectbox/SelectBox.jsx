import React, { useContext, useState } from 'react';
import DownShift from 'downshift';
import AppContext from '../../context/AppContext';

const SelectBox = () => {
  const { accountUsers: users } = useContext(AppContext);
  const [selectedUser, setSelectedUser] = useState('select a name');
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);

  const handleSelected = selected => {
    setSelectedUser(selected.name);
    setSelectedUserInfo(selected);
  };
  return (
    <div className="searchbar">
      {/* Select Box */}
      <DownShift
        itemToString={user => (user ? user.name : '')}
        onChange={handleSelected}
      >
        {({ getToggleButtonProps, getItemProps, isOpen, highlightedIndex }) => (
          <div>
            <button style={{ width: '100%' }} {...getToggleButtonProps()}>
              {selectedUser}
            </button>
            {isOpen ? (
              <div className="items-container">
                {users.map((user, index) => (
                  <div
                    {...getItemProps({
                      key: user.name,
                      index,
                      item: user,
                      className:
                        highlightedIndex === index
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
      <div
        style={{
          marginTop: '40px',
          background: 'var(--dark)',
          color: 'var(--light',
          padding: selectedUserInfo && '10px',
          borderRadius: '3px',
          border: selectedUserInfo && '2px solid orange',
        }}
      >
        {selectedUserInfo ? JSON.stringify(selectedUserInfo) : null}
      </div>
    </div>
  );
};

export default SelectBox;
