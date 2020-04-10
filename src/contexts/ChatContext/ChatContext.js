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
 *           image: 'image/wiehfowe',
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

  io.on('chat.get.list.and.join.done', async (data) => {
    const chatrooms = data.userIds.map(userId => parseInt(userId));
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
          currentChatroomId: data.newUserId
        }
      });
    }
  });

  io.on('disconnect', () => {

  });
}

function initializeTradeSocketListeners({ io, dispatch }) {
  io.on('select.item.done', (fromUserId, item) => {
    console.log(fromUserId);
    console.log(item);
    dispatch({
      type: 'OTHER_USER_TRADING_ITEM_UPDATE',
      payload: {
        chatroomId: fromUserId,
        tradingItem: {
          id: item.id,
          name: item.name,
          image: item.image
        }
      }
    })
  });

  io.on('user.request.confirm.sent', () => {
    dispatch({
      type: 'USER_TRADING_ITEM_STATUS_UPDATE',
      payload: {
        confirmedStatus: true
      }
    });
  });

  io.on('status', (status) => {
    if (status == 3) {
      dispatch({
        type: 'OTHER_USER_TRADING_ITEM_STATUS_UPDATE',
        payload: {
          confirmedStatus: true
        }
      })
    }
  })

  io.on('user.confirm.trade.done', () => {
    dispatch({
      type: 'TRADING_COMPLETION_UPDATE',
      payload: {
        completionStatus: true
      }
    })
  })
}

function ChatContextProvider(props) {
  const defaultState = {
    rootIO: null,
    chatIO: null,
    tradeIO: null,
    user: {},
    chatrooms: {},
    currentChatroomId: 0,
    notifications: [],
    currentTradeCompleted: false
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

      const chatIO = socketioclient(`${APIRoute}/chat`, {
        query: {
          id: appState.user.id,
          name: appState.user.name,
          email: appState.user.email
        },
        transports: ['websocket'], upgrade: false
      });

      const tradeIO = socketioclient(`${APIRoute}/trade`, {
        query: {
          id: appState.user.id
        },
        transports: ['websocket'], upgrade: false
      });

      initializeDefaultSocketListeners({ io: defaultIO, dispatch });
      initializeUserSocketListeners({ io: chatIO, dispatch });
      initializeTradeSocketListeners({ io: tradeIO, dispatch });

      dispatch({
        type: 'SOCKET_UPDATE',
        payload: {
          chatIO,
          defaultIO,
          tradeIO
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
      dispatch({
        type: 'TRADING_COMPLETION_UPDATE',
        payload: {
          completionStatus: false
        }
      });
    }
  }, [chatState.currentChatroomId]);

  useEffect(() => {
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