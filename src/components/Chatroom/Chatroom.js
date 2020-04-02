import React, { useState, useEffect, useContext } from 'react';
import './Chatroom.css';
import ChatroomContent from './ChatroomContent/ChatroomContent';

// Contexts
import AppContext from '../../contexts/AppContext';

// Utilities
import asyncForEach from '../../utils/async-for-each';
import APIRoute from '../../vars/api-routes';
import { getData } from '../../utils/fetch-data';

const Chatroom = (props) => {
  // Props
  const { chatrooms } = props;

  // Contexts
  const { appState } = useContext(AppContext);

  // States
  const [currentChatroom, setCurrentChatroom] = useState({
    id: 0,
    otherUser: {
      id: 0,
      name: '',
      image: ''
    }
  });
  const [chosenChatroomIndex, setChosenChatroomIndex] = useState(0);

  // Effects
  useEffect(() => {
    if (chatrooms.length > 0) {
      setCurrentChatroom({
        id: chatrooms[0].chatroomId,
        otherUser: {
          id: chatrooms[0].otherUserId,
          name: chatrooms[0].otherUserName,
          image: chatrooms[0].otherUserImage
        }
      });
    }
  }, [chatrooms]);

  useEffect(() => {
    if (chatrooms.length > 0) {
      setCurrentChatroom({
        id: chatrooms[chosenChatroomIndex].chatroomId,
        otherUser: {
          id: chatrooms[chosenChatroomIndex].otherUserId,
          name: chatrooms[chosenChatroomIndex].otherUserName,
          image: chatrooms[chosenChatroomIndex].otherUserImage
        }
      });
    }
  }, [chosenChatroomIndex]);

  // Actions
  const handleClick = (userIndex) => {
    setChosenChatroomIndex(userIndex);
  }

  const list = chatrooms.map((chatroom, index) => {
    return (
      <li className="Chatroom-Nav-User" onClick={() => handleClick(index)} key={`Chatroom-Nav-User-${index}`}>
        <div className='Chatroom-Nav-User-profile-photo' style={{
          backgroundImage: `url(${APIRoute}/${chatroom.otherUserImage})`
        }}></div>
        <span style={{
          color: index == chosenChatroomIndex ? '#8771A5' : '#CCCCCC'
        }}>{chatroom.otherUserName}</span>
      </li>
    );
  });

  return (
    <div className="Chatroom container">
      <div className="Chatroom-wrapper">
        <ul className="Chatroom-Nav">{list}</ul>
        <ChatroomContent
          chatroomId={currentChatroom.id}
          loggedInUserId={appState.user.id}
          loggedInUserName={appState.user.name}
          otherUserId={currentChatroom.otherUser.id}
          otherUserName={currentChatroom.otherUser.name}
        />
      </div>
    </div>
  );
}

export default Chatroom;

// INSERT INTO Messages (message, userId, chatroomId) VALUES("Hey how's it going? I am interested in your Vans sneakers", 74, 1);