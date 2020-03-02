import React from 'react';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import './ChatRoomContent.css';

function ChatRoomContent(props) {
  return (
    <div className="ChatRoomContent">
      <div className="ChatRoom-Message">
        <div className="ChatRoom-MessageBox">
          <div className="username">
            <img src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"></img>
            Wing Tung Lau
          </div>
          <p>hello my name is Wing Tung and I want to buy your product</p>
        </div>
      </div>
      <div className="ChatRoom-Reply">
        <TextField text="Type your message..." size="80" />
        <Button>Reply</Button>
      </div>
    </div>
  );
}
export default ChatRoomContent;
