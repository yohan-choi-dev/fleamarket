import React, { useContext, useState, useEffect } from 'react';
import './ChatroomPage.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ChatRoom from '../../components/ChatRoom/ChatRoom';

// APIRoute
import APIRoute from '../../vars/api-routes';

function ChatroomPage(props) {
  const { appState } = useContext(AppContext);

  // States
  const [chatrooms, setChatrooms] = useState([]);

  // Context
  useEffect(() => {
    fetchChatrooms(appState.user.id);
  }, []);

  const fetchChatrooms = async (userId) => {
    const response = await fetch(`${APIRoute}/api/chatrooms?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
      }
    });

    const body = await response.json();

    setChatrooms(body);
  }

  return (
    <div className="ChatroomPage">
      <Navigation />
      <ChatRoom chatrooms={chatrooms} />
      <Footer />
    </div>
  )
}

export default ChatroomPage;