import React, { useContext, useState, useEffect } from 'react';
import './ChatroomPage.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Chatroom from '../../components/Chatroom/Chatroom';

// Utilities
import APIRoute from '../../vars/api-routes';
import { getData } from '../../utils/fetch-data';

function ChatroomPage(props) {
  const { appState } = useContext(AppContext);

  // States
  const [chatrooms, setChatrooms] = useState([]);

  // Effect
  const fetchChatrooms = async (userId) => {
    const response = await fetch(`${APIRoute}/api/chatrooms?userId=${userId}`);
    const body = await response.json();
    setChatrooms(body);
  }

  useEffect(() => {
    fetchChatrooms(appState.user.id);
  }, []);

  return (
    <div className="ChatroomPage">
      <Navigation />
      <Chatroom chatrooms={chatrooms} />
      <Footer />
    </div>
  )
}

export default ChatroomPage;