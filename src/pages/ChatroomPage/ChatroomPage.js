import React from 'react';
import './ChatroomPage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Chatroom from '../../components/Chatroom/Chatroom';

function ChatroomPage(props) {
  return (
    <div className="ChatroomPage">
      <Navigation />
      <Chatroom />
      <Footer />
    </div>
  )
}

export default ChatroomPage;