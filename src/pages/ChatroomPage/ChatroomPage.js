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

    if (otherUser) {
      // Page is visited from item's page or user's page
      // Fetch chatrooms/users
      if (chatState.chatIO) {
        chatState.chatIO.emit('chat.get.list.and.join', {
          id: otherUser.id
        });
      }
    } else {
      chatState.chatIO && chatState.chatIO.emit('chat.get.list');
      if (Object.keys(chatState.chatrooms).length > 0) {
        dispatch({
          type: 'CURRENT_CHATROOM_ID_UPDATE',
          payload: {
            chatroomId: Object.keys(chatState.chatrooms)[0]
          }
        });
      }
    }
  }, [chatState.chatIO]);

  return (
    <div className="ChatroomPage">
      <Navigation />
      {
        Object.keys(chatState.chatrooms).length > 0
          ? <Chatroom />
          : <div className="ChatroomPage-nothing-msg container">
            <span>😭</span><br />
            Oops! Seems like you have not contacted anyone yet.<br />
              Click "Contact User" on a user's profile or an item's page to start trading!
            </div>
      }
      <Footer />
    </div>
  )
}

export default ChatroomPage;