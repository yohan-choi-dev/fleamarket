import React from 'react';
import AppContext from '../contexts/AppContext';

function AppContextProvider(props) {
  const state = {
    user: {
      isLoggedIn: false
    }
  };

  return <AppContext.Provider value={state}>{props.children}</AppContext.Provider>;
}

export default AppContextProvider;
