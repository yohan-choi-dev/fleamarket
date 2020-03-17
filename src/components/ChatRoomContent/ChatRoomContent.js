import React from 'react';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import './ChatRoomContent.css';

function ChatRoomContent(props) {
  const { loggedInUserId, otherUserId } = props;

  const messages = [];

  return (
    <div className="ChatRoomContent">
      <div className="ChatRoomContent-Message">
        {/* <div className="ChatRoomContent-MessageBox">
          <div className="ChatRoomContent-MessageBox-user">
            <div className="ChatRoomContent-MessageBox-user-profile-photo"></div>
            <span className="ChatRoomContent-MessageBox-user-name">Wing Tung Lau</span>
          </div>
          <p className="ChatRoomContent-MessageBox-message">hello my name is Wing Tung and I want to buy your product</p>
        </div> */}
      </div>
      {/* <div className="ChatRoom-Reply">
        <TextField text="Type your message..." size="80" />
        <Button>Reply</Button>
      </div> */}
    </div>
  );
}

export default ChatRoomContent;