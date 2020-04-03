const ChatContextReducer = (state, action) => {
  switch (action.type) {
    case 'SOCKETIO_UPDATE':
      return {
        ...state,
        userIO: action.io
      };
    case 'CURRENT_USER_UPDATE':
      return {
        ...state,
        currentUser: {
          id: action.currentUser.id,
          name: action.currentUser.name,
          image: action.currentUser.image,
          active: action.currentUser.active
        }
      };
    case 'OTHER_USER_CONNECTION_UPDATE':
      const updatedState = {
        ...state
      };
      if (updatedState.chatroomsInfo[action.chatroomId]) {
        updatedState.chatroomsInfo[action.chatroomId].otherUser.active = action.connectionStatus;
      }
      return {
        ...updatedState,
      };
    default:
      return state;
  }
}

export default ChatContextReducer;