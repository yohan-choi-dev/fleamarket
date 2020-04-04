import React, { useEffect, useReducer, useContext } from 'react';
import socketioclient from 'socket.io-client';

import AppContext from '../AppContext';
import ChatContextReducer from './ChatContextReducer';

import APIRoute from '../../vars/api-routes';
import { getData } from '../../utils/fetch-data';

const ChatContext = React.createContext();

/**
 * Shape:
 * {
 *   userIO: io,
 *   currentUser: {
 *     id: 11,
 *     name: 'William',
 *     image: 'images/owejfoiwej32few.jpg',
 *     active: [true|false],
 *     tradingItem: {
 *       id: 22,
 *       name: 'Airpods',
 *       confirmed: [true|false]
 *     }
 *   },
 *   chatroomsInfo: {
 *     'chatroomId': {
 *       messages: [
 *         {
 *           message: '',
 *           userId: ''
 *         },
 *         ...
 *       ],
 *       otherUser: {
 *         id: 12,
 *         name: 'Yohan',
 *         image: 'images/ewfkjkewnoifj.jpg',
 *         active: [true|false],
 *         tradingItem: {
 *           id: 23,
 *           name: 'Pods',
 *           confirmed: [true|false]
 *         }
 *       }
 *     },
 *     ...
 *   },
 *   currentChatroomId: 1
 * }
 * 
 */

function initializeDefaultSocketListeners({ io, dispatch }) {
  io.on('user.getStatus.done', (data) => {
    dispatch({ type: 'USER_ACTIVE_UPDATE', userId: data.userId, active: data.status });
  });
}

function initializeUserSocketListeners({ io, dispatch }) {
  io.on('disconnect', () => {
    dispatch({ type: 'SOCKETIO_UPDATE', io: {} });
    dispatch({
      type: 'CURRENT_USER_UPDATE',
      currentUser: {
        id: 0,
        name: '',
        image: '',
        active: false
      }
    });
    console.log('You are disconnected.');
  });

  io.on('connection-update-other-user', (chatroomId) => {
    dispatch({
      type: 'OTHER_USER_CONNECTION_UPDATE',
      chatroomId,
      connectionStatus: true
    });
  });

  io.on('message', (data) => {
    console.log(data);
  });
}

function ChatContextProvider(props) {
  const defaultState = {
    defaultIO: null,
    userIO: null,
    currentUser: {},
    chatroomsInfo: {},
    currentChatroomId: 0
  };

  const { appState } = useContext(AppContext);
  const [chatState, dispatch] = useReducer(ChatContextReducer, defaultState);

  useEffect(() => {
    // Initialize IO
    const defaultIO = socketioclient(`${APIRoute}`, {
      query: {
        id: appState.user.id
      }
    })
    const userIO = socketioclient(`${APIRoute}/chat`, {
      query: {
        id: appState.user.id,
        name: appState.user.name,
        email: appState.user.email
      }
    });

    initializeDefaultSocketListeners({ io: defaultIO, dispatch });
    initializeUserSocketListeners({ io: userIO, dispatch });
    dispatch({ type: 'SOCKETIO_UPDATE', userIO, defaultIO }); // Can be accessed by action.type & action.io in the reducer
    dispatch({
      type: 'CURRENT_USER_UPDATE',
      currentUser: {
        id: appState.user.id,
        name: appState.user.name,
        image: appState.user.image,
        active: true
      }
    });

    // Fetch chatrooms
    fetchChatrooms(appState.user.id);
  }, []);

  useEffect(() => {
    async function updateChatroomMessages(chatroomId) {
      if (
        chatState.chatroomsInfo[chatroomId] &&
        chatState.chatroomsInfo[chatroomId].messages.length == 0) {
        const chatroomMessages = await getData(`${APIRoute}/api/messages?chatroomId=${chatroomId}`);
        const transformedMessages = chatroomMessages.map(message => {
          return {
            userId: message.userId,
            message: message.message
          }
        });
        dispatch({
          type: 'CHATROOM_MESSAGES_UPDATE',
          chatroomId: chatroomId,
          messages: transformedMessages
        });
      }
    }

    updateChatroomMessages(chatState.currentChatroomId);

    if (chatState.defaultIO) {
      Object.keys(chatState.chatroomsInfo).forEach(chatroom => {
        chatState.defaultIO && chatState.defaultIO.emit('user.getStatus', {
          id: chatState.chatroomsInfo[chatroom].otherUserId
        });
      })
    }
  }, [chatState.currentChatroomId]);

  const fetchChatrooms = async (userId) => {
    const response = await fetch(`${APIRoute}/api/chatrooms?userId=${userId}`);
    const results = await response.json();

    if (results.length > 0) {
      let allChatroomsInfo = {};
      results.forEach((chatroom, index) => {
        allChatroomsInfo[chatroom.chatroomId] = {
          messages: [],
          otherUser: {
            id: chatroom.otherUserId,
            name: chatroom.otherUserName,
            image: chatroom.otherUserImage,
            active: false,
            tradingItem: {}
          }
        }
      });

      const firstChatroomMessages = await getData(`${APIRoute}/api/messages?chatroomId=${results[0].chatroomId}`);
      allChatroomsInfo[results[0].chatroomId].messages = firstChatroomMessages.map(message => {
        return {
          userId: message.userId,
          message: message.message
        }
      });

      dispatch({
        type: 'INITIAL_LOAD_CHATROOMS',
        chatroomsInfo: {
          ...allChatroomsInfo
        },
        currentChatroomId: results[0].chatroomId
      });
    }
  }
  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export { ChatContext, ChatContextProvider };