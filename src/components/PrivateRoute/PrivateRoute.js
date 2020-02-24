import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

// Context
import AppContext from '../../contexts/AppContext';

function PrivateRoute(props) {
  const { children, ...rest } = props;
  const { appState } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={({ location }) => (
        appState.user.isLoggedIn ? (
          children
        ) : <Redirect
            to={{
              pathname: '/login',
              state: { background: location }
            }}
          />
      )}
    />
  );
}

export default PrivateRoute;