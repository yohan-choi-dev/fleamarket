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
    chatState.chatIO && chatState.chatIO.emit('chat.get.list');
    if (otherUser) {
      // Page is visited from item's page or user's page
      // Fetch chatrooms/users
      if (chatState.chatIO) {
        chatState.chatIO.emit('join', {
          id: otherUser.id,
          name: otherUser.name,
          image: otherUser.image,
          email: otherUser.email
        });
      }
    }
  }, [chatState.chatIO]);

  return (
    <div className="ChatroomPage">
      <Navigation />
      <Chatroom />
      <Footer />
    </div>
  )
}

export default ChatroomPage;