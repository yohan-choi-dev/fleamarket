import React, { useContext } from 'react';
import './ChatroomPage.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ChatRoom from '../../components/ChatRoom/ChatRoom';

function ChatroomPage(props) {
  const { appState } = useContext(AppContext);

  const users = [
    {
      id: 1,
      name: 'Wing Tung Lau',
      profileImageURL: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      messages: []
    },
    {
      id: 2,
      name: 'Yohan Choi',
      profileImageURL: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      messages: []
    },
    {
      id: 3,
      name: 'Ahmad Anees',
      profileImageURL: 'https://images.unsplash.com/photo-1539605480396-a61f99da1041?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      messages: []
    }
  ];

  return (
    <div className="ChatroomPage">
      <Navigation />
      <ChatRoom users={users} />
      <Footer />
    </div>
  )
}

export default ChatroomPage;