const ChatContextReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'SOCKET_UPDATE': {
      return {
        ...state,
        defaultIO: payload.defaultIO,
        chatIO: payload.chatIO,
        tradeIO: payload.tradeIO
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
    case 'USER_TRADING_ITEM_UPDATE': {
      const { tradingItem } = payload;
      return {
        ...state,
        user: {
          ...state.user,
          tradingItem: {
            id: tradingItem.id,
            name: tradingItem.name,
            image: tradingItem.image,
            confirmed: false
          }
        }
      }
    }
    case 'USER_TRADING_ITEM_STATUS_UPDATE': {
      const { confirmedStatus } = payload;
      return {
        ...state,
        user: {
          ...state.user,
          tradingItem: {
            ...state.user.tradingItem,
            confirmed: confirmedStatus
          }
        }
      }
    }
    case 'OTHER_USER_TRADING_ITEM_UPDATE': {
      const { tradingItem, chatroomId } = payload;
      const updatedState = {
        ...state
      }
      if (state.chatrooms[chatroomId]) {
        updatedState.chatrooms[chatroomId].otherUser.tradingItem = {
          id: tradingItem.id,
          name: tradingItem.name,
          image: tradingItem.image,
          confirmed: false
        }
      }
      console.log(updatedState);
      return {
        ...updatedState
      }
    }
    case 'OTHER_USER_TRADING_ITEM_STATUS_UPDATE': {
      const { confirmedStatus } = payload;
      const updatedState = {
        ...state
      }
      updatedState.chatrooms[updatedState.currentChatroomId].otherUser.tradingItem.confirmed = confirmedStatus;
      return {
        ...updatedState
      }
    }
    case 'TRADING_COMPLETION_UPDATE': {
      const { completionStatus } = payload;

      return {
        ...state,
        currentTradeCompleted: completionStatus
      }
    }
    default:
      return state;
  }
}

export default ChatContextReducer;