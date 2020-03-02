import React from 'react';
import '../../vars/style.css';
import './ChatRoom.css';
import ChatRoomContent from '../ChatRoomContent/ChatRoomContent';
import TextField from '../TextField/TextField';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: '' };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(props) {
    document.getElementById(this.state.user).style.color = '#aeaeae';
    this.setState({ user: props });
    document.getElementById(props).style.color = '#8771a5';
  }
  render() {
    const users = this.props.users;
    const list = users.map(u => {
      return (
        <div className="ChatRoom-Nav-User" id="wing" onClick={() => this.handleClick(u)}>
          <li>
            <img src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"></img>
            {u}
          </li>
        </div>
      );
    });

    return (
      <div className="ChatRoom">
        <div className="ChatRoom-Nav">{list}</div>
        <div className="ChatRoom-Context">
          <ChatRoomContent user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default ChatRoom;
