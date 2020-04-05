import React, { useEffect, useReducer, useContext } from 'react';
import socketioclient from 'socket.io-client';

import AppContext from '../AppContext';
import ChatContextReducer from './ChatContextReducer';

import APIRoute from '../../vars/api-routes';
import { getData } from '../../utils/fetch-data';
import asyncForEach from '../../utils/async-for-each';

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
 *         email: 'lalala@gmail.com',
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
  io.on('user.getStatus.done', (id, status) => {
    console.log(id);
    console.log(status);
    const active = (!status || status == 'offline') ? 0 : 1;
    dispatch({ type: 'USER_ACTIVE_UPDATE', userId: id, active: active });
  });
}

function initializeUserSocketListeners({ io, dispatch }) {
  const fetchChatrooms = async (users, currentChatroomUserId) => {
    if (users.length > 0) {
      let allChatroomsInfo = {};
      users.forEach((user, index) => {
        if (user.id != io.query.id) {
          allChatroomsInfo[user.id] = {
            messages: [],
            otherUser: {
              id: user.id,
              name: user.name,
              image: user.image,
              email: user.email,
              active: false,
              tradingItem: {}
            }
          }
        }
      });

      dispatch({
        type: 'INITIAL_LOAD_CHATROOMS',
        chatroomsInfo: {
          ...allChatroomsInfo
        },
        currentChatroomId: currentChatroomUserId
      });
    }
  }

  io.on('message.load.done', (data) => {
    console.log(data);
    const transformedMessages = data.messages.map(message => {
      return {
        userId: message.user.id,
        message: message.message
      }
    });
    console.log(transformedMessages);
    dispatch({
      type: 'CHATROOM_MESSAGES_UPDATE',
      chatroomId: data.userId,
      messages: transformedMessages
    });
  });

  io.on('chat.get.list.done', async (data) => {
    const userIds = data.map((userId) => parseInt(userId));
    console.log(userIds);

    // Fetch all user's information
    let usersInfo = [];

    await asyncForEach(userIds, async (userId) => {
      const response = await fetch(`${APIRoute}/api/users/${userId}`);
      const userInfo = await response.json();
      usersInfo.push(userInfo);
    })

    console.log(usersInfo);
    fetchChatrooms(usersInfo, usersInfo[0].id);

    // 
  });

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
    if (appState.user.isLoggedIn) {
      // Initialize IO
      const defaultIO = socketioclient(`${APIRoute}/`, {
        query: {
          id: appState.user.id
        },
        transports: ['websocket'], upgrade: false
      });
      const userIO = socketioclient.connect(`${APIRoute}/chat`, {
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
    }
  }, [appState.user.isLoggedIn]);

  useEffect(() => {
    if (
      chatState.chatroomsInfo[chatState.currentChatroomId] &&
      chatState.chatroomsInfo[chatState.currentChatroomId].messages.length == 0
    ) {
      console.log('yeah');
      chatState.userIO.emit(
        'message.load',
        {
          id: chatState.currentChatroomId
        },
        0,
        10
      );
    }
  }, [chatState.currentChatroomId]);


  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export { ChatContext, ChatContextProvider };