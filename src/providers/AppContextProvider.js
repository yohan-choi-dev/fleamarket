import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import AppContext from '../contexts/AppContext';

function AppContextProvider(props) {
  const cookies = new Cookies();

  const [appState, setAppState] = useState({
    user: {
      isLoggedIn: cookies.get('fleamarket-authentication') ? cookies.get('fleamarket-authentication').isLoggedIn : false,
      token: cookies.get('fleamarket-authentication') ? cookies.get('fleamarket-authentication').token : '',
      name: cookies.get('fleamarket-authentication') ? cookies.get('fleamarket-authentication').username : ''
    }
  });

  return (
    <AppContext.Provider value={{ appState, setAppState }}>{props.children}</AppContext.Provider>
  );
}

export default AppContextProvider;
