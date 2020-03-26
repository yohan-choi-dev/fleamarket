import React from 'react';
import './ChatroomContent.css';

function ChatroomContent(props) {
  const { loggedInUserId, otherUserId } = props;

  const messages = [];

  return (
    <div className="ChatroomContent">
      <div className="ChatroomContent-Message">
        {/* <div className="ChatRoomContent-MessageBox">
          <div className="ChatRoomContent-MessageBox-user">
            <div className="ChatRoomContent-MessageBox-user-profile-photo"></div>
            <span className="ChatRoomContent-MessageBox-user-name">Wing Tung Lau</span>
          </div>
          <p className="ChatRoomContent-MessageBox-message">hello my name is Wing Tung and I want to buy your product</p>
        </div> */}
      </div>
      {/* <div className="ChatRoom-Reply">
        <Button>Reply</Button>
      </div> */}
    </div>
  );
}

export default ChatroomContent;