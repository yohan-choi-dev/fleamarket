import React, { useState, useEffect, useContext } from 'react';
import '../../vars/style.css';
import './ChatRoom.css';
import ChatRoomContent from '../ChatRoomContent/ChatRoomContent';
import TextField from '../TextField/TextField';

// Contexts
import AppContext from '../../contexts/AppContext';

// Utilities
import asyncForEach from '../../utils/async-for-each';
import APIRoute from '../../vars/api-routes';

const ChatRoom = (props) => {
  // Props
  const { chatrooms } = props;

  // Contexts
  const { appState } = useContext(AppContext);

  // States
  const [detailedChatrooms, setDetailedChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState({
    id: 0,
    otherUser: {
      id: 0,
      name: '',
      image: ''
    }
  });
  const [chosenChatroomIndex, setChosenChatroomIndex] = useState(0);

  // Actions
  const fetchChatroomDetails = async (chatrooms) => {
    let results = chatrooms;

    await asyncForEach(chatrooms, async (chatroom, index) => {
      const response = await fetch(`${APIRoute}/api/users/${chatroom.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true
        }
      });

      const otherUserInfo = await response.json();

      results[index] = {
        ...results[index],
        otherUser: {
          name: otherUserInfo.name,
          image: otherUserInfo.image
        }
      }
    });

    setDetailedChatrooms(results);
  }

  // Effects
  useEffect(() => {
    fetchChatroomDetails(chatrooms);
  }, [chatrooms]);

  useEffect(() => {
    // setCurrentChatroom({
    //   ...currentChatroom,
    //   id: detailedChatrooms[chosenChatroomIndex].id,
    //   otherUser: {
    //     id: detailedChatrooms[chosenChatroomIndex].otherUser.id,
    //     name: detailedChatrooms[chosenChatroomIndex].otherUser.name,
    //     image: detailedChatrooms[chosenChatroomIndex].otherUser.image
    //   }
    // });
  }, [chosenChatroomIndex]);

  // Actions
  const handleClick = (userIndex) => {
    setChosenChatroomIndex(userIndex);
  }

  const list = detailedChatrooms.map((detailedChatroom, index) => {
    return (
      <li className="ChatRoom-Nav-User" onClick={() => handleClick(index)} key={`ChatRoom-Nav-User-${index}`}>
        <div className='ChatRoom-Nav-User-profile-photo' style={{
          backgroundImage: `url(${detailedChatroom.otherUser.image})`
        }}></div>
        <span style={{
          color: index == chosenChatroomIndex ? '#8771A5' : '#CCCCCC'
        }}>{detailedChatroom.otherUser.name}</span>
      </li>
    );
  });

  return (
    <div className="ChatRoom container">
      <div className="ChatRoom-wrapper">
        <ul className="ChatRoom-Nav">{list}</ul>
        <div className="ChatRoom-Context">
          <ChatRoomContent
            chatroomId={currentChatroom.id}
            loggedInUserId={appState.user.id}
            otherUserId={currentChatroom.otherUser.id}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;