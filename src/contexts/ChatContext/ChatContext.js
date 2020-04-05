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
 *   rootIO: io/,
 *   chatIO: io/chat,
 *   user: {
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
 *   chatrooms: {
 *     'userId': {
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
    const active = (!status || status == 'offline') ? 0 : 1;
    dispatch({
      type: 'OTHER_USER_ACTIVE_UPDATE',
      payload: {
        userId: id,
        active: active
      }
    });
  });

  io.on('user-disconnected', (data) => {
    dispatch({
      type: 'OTHER_USER_ACTIVE_UPDATE',
      payload: {
        userId: data,
        active: false
      }
    });
  })

  io.on('user-connected', (data) => {
    dispatch({
      type: 'OTHER_USER_ACTIVE_UPDATE',
      payload: {
        userId: data,
        active: true
      }
    });
  })
}

function initializeUserSocketListeners({ io, dispatch }) {
  io.on('join.done', (data) => {
    dispatch({
      type: 'CHATROOMS_ADD',
      payload: {
        user: {
          id: data.id,
          name: data.name,
          image: data.image,
          email: data.email
        }
      }
    });
  });

  io.on('message.load.done', (data) => {
    const transformedMessages = data.messages.map(message => {
      return {
        userId: message.from,
        message: message.message
      }
    });
    dispatch({
      type: 'CHATROOM_MESSAGES_LOAD',
      payload: {
        chatroomId: data.userId,
        messages: transformedMessages
      }
    });
  });

  io.on('message.update.done', (data) => {
    dispatch({
      type: 'CHATROOM_MESSAGES_ADD',
      payload: {
        chatroomId: data.from,
        userId: data.from,
        message: data.message
      }
    })
  });

  io.on('chat.get.list.done', async (data) => {
    const chatrooms = data.map(userId => parseInt(userId));
    // Fetch all users' information
    let usersInfo = [];

    await asyncForEach(chatrooms, async (userId) => {
      const response = await fetch(`${APIRoute}/api/users/${userId}`);
      const userInfo = await response.json();
      usersInfo.push(userInfo);
    })

    if (usersInfo.length > 0) {
      let allChatroomsInfo = {};
      usersInfo.forEach((user, index) => {
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
        type: 'CHATROOMS_UPDATE',
        payload: {
          chatrooms: {
            ...allChatroomsInfo
          },
          currentChatroomId: usersInfo[0].id
        }
      });
    }
  });

  io.on('disconnect', () => {

  });
}

function ChatContextProvider(props) {
  const defaultState = {
    rootIO: null,
    chatIO: null,
    user: {},
    chatrooms: {},
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

      const chatIO = socketioclient.connect(`${APIRoute}/chat`, {
        query: {
          id: appState.user.id,
          name: appState.user.name,
          email: appState.user.email
        }
      });

      initializeDefaultSocketListeners({ io: defaultIO, dispatch });
      initializeUserSocketListeners({ io: chatIO, dispatch });
      dispatch({
        type: 'SOCKET_UPDATE',
        payload: {
          chatIO,
          defaultIO
        }
      });
    }
  }, [appState.user.isLoggedIn]);

  useEffect(() => {
    if (
      chatState.chatrooms[chatState.currentChatroomId] &&
      chatState.chatrooms[chatState.currentChatroomId].messages.length == 0
    ) {
      chatState.chatIO.emit(
        'message.load',
        {
          id: chatState.currentChatroomId
        },
        0,
        10
      );
    }
  }, [chatState.currentChatroomId]);

  useEffect(() => {
    chatState.chatIO && chatState.chatIO.emit('chat.get.list');
    if (Object.keys(chatState.chatrooms).length > 0) {
      Object.keys(chatState.chatrooms).forEach(userId => {
        chatState.defaultIO.emit('user.getStatus', { id: userId });
      })
    }
  }, [chatState.chatrooms]);


  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export { ChatContext, ChatContextProvider };