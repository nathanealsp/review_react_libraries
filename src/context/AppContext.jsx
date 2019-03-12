import React from 'react';
import users from '../data';

const AppContext = React.createContext({
  accountUsers: users,
});

export default AppContext;
