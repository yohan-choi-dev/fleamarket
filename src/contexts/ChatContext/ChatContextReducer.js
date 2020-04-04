const ChatContextReducer = (state, action) => {
  switch (action.type) {
    case 'SOCKETIO_UPDATE':
      {
        return {
          ...state,
          defaultIO: action.defaultIO,
          userIO: action.userIO
        };
      }
    case 'CURRENT_CHATROOM_ID_UPDATE':
      {
        const updatedState = {
          ...state,
          currentChatroomId: action.chatroomId
        };
        return updatedState;
      }
    case 'CHATROOM_MESSAGES_UPDATE':
      {
        const updatedState = {
          ...state,
        };
        updatedState.chatroomsInfo[action.chatroomId].messages = [...action.messages];
        return updatedState;
      }
    case 'INITIAL_LOAD_CHATROOMS':
      {
        const updatedState = {
          ...state,
          chatroomsInfo: {
            ...action.chatroomsInfo
          },
          currentChatroomId: action.currentChatroomId
        }
        console.log('ChatContext Dispatch: INITIAL_LOAD_CHATROOMS');
        console.log(updatedState);
        return updatedState;
      }
    case 'CURRENT_USER_UPDATE':
      {
        return {
          ...state,
          currentUser: {
            id: action.currentUser.id,
            name: action.currentUser.name,
            image: action.currentUser.image,
            active: action.currentUser.active
          }
        };
      }
    case 'OTHER_USER_CONNECTION_UPDATE':
      {
        const updatedState = {
          ...state
        };
        if (updatedState.chatroomsInfo[action.chatroomId]) {
          updatedState.chatroomsInfo[action.chatroomId].otherUser.active = action.connectionStatus;
        }
        return {
          ...updatedState,
        };
      }
    case 'CHATROOM_MESSAGES_ADD':
      {
        const chatroomId = action.chatroomId;
        const updatedState = {
          ...state
        };
        if (updatedState.chatroomsInfo[chatroomId]) {
          updatedState.chatroomsInfo[chatroomId].messages.push({
            userId: action.userId,
            message: action.message
          });
        }
        return {
          ...updatedState
        };
      }
    case 'USER_ACTIVE_UPDATE':
      {
        const active = action.active;
        const userId = action.userId;
        const updatedState = {
          ...state
        };
        Object.keys(updatedState.chatroomsInfo).forEach(chatroom => {
          if (updatedState.chatroomsInfo[chatroom].otherUser.id == userId) {
            updatedState.chatroomsInfo[chatroom].otherUser.active = active;
          }
        });
        console.log('Dispatch: USER_ACTIVE_UPDATE');
        console.log(updatedState);
        return {
          ...updatedState
        };
      }
    default:
      return state;
  }
}

export default ChatContextReducer;