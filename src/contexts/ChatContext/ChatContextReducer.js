const ChatContextReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'SOCKET_UPDATE': {
      return {
        ...state,
        defaultIO: payload.defaultIO,
        chatIO: payload.chatIO
      }
    }
    case 'CURRENT_CHATROOM_ID_UPDATE': {
      return {
        ...state,
        currentChatroomId: payload.chatroomId
      }
    }
    case 'CHATROOM_MESSAGES_LOAD': {
      const updatedState = {
        ...state,
      };
      updatedState.chatrooms[payload.chatroomId].messages = [...payload.messages];
      return updatedState;
    }
    case 'CHATROOM_MESSAGES_ADD': {
      const chatroomId = payload.chatroomId;
      const updatedState = {
        ...state
      };
      if (updatedState.chatrooms[chatroomId]) {
        updatedState.chatrooms[chatroomId].messages.push({
          userId: payload.userId,
          message: payload.message
        });
      }
      return {
        ...updatedState
      };
    }
    case 'CHATROOMS_UPDATE': {
      return {
        ...state,
        chatrooms: { ...payload.chatrooms },
        currentChatroomId: payload.currentChatroomId
      }
    }
    case 'CHATROOMS_ADD': {
      const { id, name, image, email } = payload.user;
      const updatedState = {
        ...state
      };
      if (!updatedState.chatrooms[id]) {
        updatedState.chatrooms[id] = {
          messages: [],
          otherUser: {
            id: id,
            name: name,
            image: image,
            email: email,
            active: false,
            tradingItem: {}
          },
        };
      }
      console.log(updatedState);
      return {
        ...updatedState
      };
    }
    case 'CURRENT_USER_UPDATE': {

    }
    case 'OTHER_USER_ACTIVE_UPDATE': {
      const active = payload.active;
      const userId = payload.userId;
      const updatedState = {
        ...state
      };
      Object.keys(updatedState.chatrooms).forEach(chatroom => {
        if (updatedState.chatrooms[chatroom].otherUser.id == userId) {
          updatedState.chatrooms[chatroom].otherUser.active = active;
        }
      });
      return {
        ...updatedState
      };
    }
    default:
      return state;
  }
}

export default ChatContextReducer;