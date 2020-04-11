import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';

// Pages
import HomePage from '../../pages/HomePage/HomePage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import VerifyYourEmailPage from '../../pages/VerifyYourEmailPage/VerifyYourEmailPage';
import AccountSettingsPage from '../../pages/AccountSettingsPage/AccountSettingsPage';
import ItemUploadPage from '../../pages/ItemUploadPage/ItemUploadPage';
import ItemPage from '../../pages/ItemPage/ItemPage';
import ChatroomPage from '../../pages/ChatroomPage/ChatroomPage';
import TransactionPage from '../../pages/TransactionPage/TransactionPage';
import RecoverAccountPage from '../../pages/RecoverAccountPage/RecoverAccountPage';
import RecoverPasswordPage from '../../pages/RecoverPasswordPage/RecoverPasswordPage';
import AboutUsPage from '../../pages/AboutUsPage/AboutUsPage';
import PrivacyPolicyPage from '../../pages/PrivacyPolicyPage/PrivacyPolicyPage';

// Components
import CreateAccountModal from '../CreateAccountModal/CreateAccountModal';
import LoginModal from '../LoginModal/LoginModal';
import UpdateUserProfile from '../UpdateUserProfile/UpdateUserProfile';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

// Contexts
import { ChatContextProvider } from '../../contexts/ChatContext/ChatContext';
import OtherProfilePage from '../../pages/OtherProfilePage/OtherProfilePage';

function ModalSwitch() {
  let location = useLocation();

  // Credit/Documentation: https://reacttraining.com/react-router/web/example/modal-gallery
  let background = location.state && location.state.background;

  return (
    <div>
      <Switch location={background || location}>
        <ChatContextProvider>
          <Route path="/verify-your-email">
            <VerifyYourEmailPage />
          </Route>
          <Route path="/about-us">
            <AboutUsPage />
          </Route>
          <Route path="/privacy-policy">
            <PrivacyPolicyPage />
          </Route>
          <Route path={`/item/:itemId`}>
            <ItemPage />
          </Route>
          <Route exact path="/recover-account">
            <RecoverAccountPage />
          </Route>
          <Route path="/reset-password">
            <RecoverPasswordPage />
          </Route>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>

          <PrivateRoute path="/profile/:userId">
            <OtherProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/profile" exact={true}>
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/account-settings">
            <AccountSettingsPage />
          </PrivateRoute>
          <PrivateRoute path="/upload-item">
            <ItemUploadPage />
          </PrivateRoute>
          <PrivateRoute path="/chatroom">
            <ChatroomPage />
          </PrivateRoute>
          <PrivateRoute path="/transaction-history">
            <TransactionPage />
          </PrivateRoute>
        </ChatContextProvider>

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>

      {background && <Route path="/signup" children={<CreateAccountModal />} />}
      {background && <Route path="/login" children={<LoginModal />} />}
      {background && <Route path="/profile-edit" children={<UpdateUserProfile />} />}
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
