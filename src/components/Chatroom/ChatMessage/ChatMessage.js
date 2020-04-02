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
          {/* <img className="ChatMessage-user-image" src={`${APIRoute}/${userImage}`} /> */}
          <div className="ChatMessage-user-image" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`
          }}></div>
          <p className="ChatMessage-user-name">{userName}</p>
        </div>
        <p className="ChatMessage-message">{message}</p>
      </div>
    </div>
  )
}

export default ChatMessage;