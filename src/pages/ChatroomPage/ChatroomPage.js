import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './ChatroomPage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Chatroom from '../../components/Chatroom/Chatroom';

// Contexts
import AppContext from '../../contexts/AppContext';
import { ChatContext } from '../../contexts/ChatContext/ChatContext';

function ChatroomPage(props) {
  const location = useLocation();
  let otherUser;

  if (location.state) {
    otherUser = location.state.otherUser;
  }

  // Contexts
  const { appState } = useContext(AppContext);
  const { chatState, dispatch } = useContext(ChatContext);

  useEffect(() => {
    chatState.userIO && chatState.userIO.emit('chat.get.list');
    if (otherUser) {
      // Page is visited from item's page or user's page

      // Fetch chatrooms/users
      chatState.userIO.emit('join', {
        id: otherUser.id
      });
      // Fetch first room's messages
    } else {
      // Page is visited from "Chatroom" menu option

    }
  }, [chatState.userIO]);

  return (
    <div className="ChatroomPage">
      <Navigation />
      <Chatroom />
      <Footer />
    </div>
  )
}

export default ChatroomPage;