import React, { useState } from 'react';
import AppContext from '../contexts/AppContext';

function AppContextProvider(props) {
  const [appState, setAppState] = useState({
    user: {
      isLoggedIn: false,
      name: ''
    }
  });

  return (
    <AppContext.Provider value={{ appState, setAppState }}>{props.children}</AppContext.Provider>
  );
}

export default AppContextProvider;
