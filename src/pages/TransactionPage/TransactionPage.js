import React, { useContext } from 'react';
import './TransactionPage.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import TransactionHistory from '../../components/TransactionHistory/TransactionHistory';

function TransactionPage(props) {
  const { appState } = useContext(AppContext);
  return (
    <div className="TransactionPage">
      <Navigation />
      <ProfileCard profile={appState.user} />
      <TransactionHistory items={[]} otherClassNames="container" />
      <Footer />
    </div>
  );
}

export default TransactionPage;