import React, { useContext } from 'react';
import './ChatroomPage.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Chatroom from '../../components/Chatroom/Chatroom';

function ChatroomPage(props) {
  const { appState } = useContext(AppContext);

  return (
    <div className="ChatroomPage">
      <Navigation />
      <Chatroom />
      <Footer />
    </div>
  )
}

export default ChatroomPage;