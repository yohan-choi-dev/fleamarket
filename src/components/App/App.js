import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import dotenv from 'dotenv';
dotenv.config();

// Pages
import HomePage from '../../pages/HomePage/HomePage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import CreateAccountModal from '../../components/CreateAccountModal/CreateAccountModal';

function ModalSwitch() {
  let location = useLocation();

  // Credit/Documentation: https://reacttraining.com/react-router/web/example/modal-gallery
  let background = location.state && location.state.background;

  return (
    <div>
      <Switch location={background || location}>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>

      {background && <Route path="/signup" children={<CreateAccountModal />} />}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <ModalSwitch />
      </Router>
    </div>
  );
}

export default App;
