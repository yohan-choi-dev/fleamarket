import React, { useEffect, useContext } from 'react';
import './Chatroom.css';
import ChatroomContent from './ChatroomContent/ChatroomContent';

// Contexts
import AppContext from '../../contexts/AppContext';
import { ChatContext } from '../../contexts/ChatContext/ChatContext';

// Utilities
import asyncForEach from '../../utils/async-for-each';
import APIRoute from '../../vars/api-routes';
import { getData } from '../../utils/fetch-data';

const Chatroom = (props) => {
  // Contexts
  const { appState } = useContext(AppContext);
  const { chatState, dispatch } = useContext(ChatContext);

  let chatroomList;

  // useEffect(() => {
  //   chatroomList = Object.keys(chatState.chatroomsInfo).map(chatroom => {
  //     let currentChatroom = chatState.chatroomsInfo[chatroom];
  //     return (
  //       <li className="Chatroom-Nav-User" onClick={() => handleClick(chatroom)} key={`Chatroom-Nav-User-${chatroom}`}>
  //         <div className='Chatroom-Nav-User-profile-photo' style={{
  //           backgroundImage: `url(${APIRoute}/${currentChatroom.otherUserImage})`
  //         }}></div>
  //         <span style={{
  //           color: chatroom == chatState.currentChatroomId ? '#8771A5' : '#CCCCCC'
  //         }}>{currentChatroom.otherUserName}</span>
  //       </li>
  //       <div>jajaja</div>
  //     )
  //   });
  // }, [chatState.chatroomsInfo]);

  // Actions
  const handleClick = (chatroomId) => {
    dispatch({ type: 'CURRENT_CHATROOM_ID_UPDATE', chatroomId });
  }

  return (
    <div className="Chatroom container">
      <div className="Chatroom-wrapper">
        <ul className="Chatroom-Nav">
          {
            Object.keys(chatState.chatroomsInfo).map(chatroom => {
              let currentChatroom = chatState.chatroomsInfo[chatroom];
              console.log(currentChatroom);
              return (
                <li className="Chatroom-Nav-User" onClick={() => handleClick(chatroom)} key={`Chatroom-Nav-User-${chatroom}`}>
                  <div className='Chatroom-Nav-User-profile-photo' style={{
                    backgroundImage: `url(${APIRoute}/${currentChatroom.otherUser.image})`
                  }}></div>
                  <span style={{
                    color: chatroom == chatState.currentChatroomId ? '#8771A5' : '#CCCCCC'
                  }}>{currentChatroom.otherUser.name}</span>
                </li>
              )
            })
          }
        </ul>
        <ChatroomContent
          chatroomId={chatState.currentChatroomId}
          loggedInUserId={appState.user.id}
          loggedInUserName={appState.user.name}
          otherUserId={chatState.chatroomsInfo[chatState.currentChatroomId] && chatState.chatroomsInfo[chatState.currentChatroomId].otherUser.id}
          otherUserName={chatState.chatroomsInfo[chatState.currentChatroomId] && chatState.chatroomsInfo[chatState.currentChatroomId].otherUser.name || ''}
        />
      </div>
    </div>
  );
}

export default Chatroom;

// INSERT INTO Messages (message, userId, chatroomId) VALUES("Hey how's it going? I am interested in your Vans sneakers", 74, 1);