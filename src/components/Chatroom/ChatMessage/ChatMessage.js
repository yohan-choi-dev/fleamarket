import React from 'react';
import './ChatMessage.css';

// Utilities
import APIRoute from '../../../vars/api-routes';

const ChatMessage = (props) => {
  const { userName, userImage, message, byUser } = props;

  return (
    <div className="ChatMessage" style={{
      alignItems: byUser ? 'flex-end' : 'flex-start'
    }}>
      <div className="ChatMessage-container">
        <div className="ChatMessage-user-info">
          <div className="ChatMessage-user-image" style={{
            backgroundImage: `url('${APIRoute}/${userImage}')`
          }}></div>
          <p className="ChatMessage-user-name">{userName}</p>
        </div>
        <p className="ChatMessage-message">{message}</p>
      </div>
    </div>
  )
}

export default ChatMessage;