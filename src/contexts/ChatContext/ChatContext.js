import React, { useEffect, useReducer, useContext } from 'react';
import socketioclient from 'socket.io-client';

import AppContext from '../AppContext';
import ChatContextReducer from './ChatContextReducer';

import APIRoute from '../../vars/api-routes';

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
 *   }
 * }
 * 
 */

function initializeSocketListeners({ io, dispatch }) {
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
    dispatch({ type: 'OTHER_USER_CONNECTION_UPDATE', chatroomId, connectionStatus: true });
  });

  io.on('message', (data) => {
    console.log(data);
  });
}

function ChatContextProvider(props) {
  const defaultState = {
    userIO: {},
    currentUser: {},
    chatroomsInfo: {},
  }

  const { appState } = useContext(AppContext);
  const [chatState, dispatch] = useReducer(ChatContextReducer, defaultState);

  useEffect(() => {
    const io = socketioclient.connect(`${APIRoute}/chat`, {
      query: {
        id: appState.user.id,
        name: appState.user.name,
        email: appState.user.email,
        to: 11
      }
    });
    console.log('eh?');

    initializeSocketListeners({ io, dispatch });
    dispatch({ type: 'SOCKETIO_UPDATE', io }); // Can be accessed by action.type & action.io in the reducer
    dispatch({
      type: 'CURRENT_USER_UPDATE',
      currentUser: {
        id: appState.user.id,
        name: appState.user.name,
        image: appState.user.image,
        active: true
      }
    });
  }, []);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export { ChatContext, ChatContextProvider };