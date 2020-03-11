import React from 'react';
import '../../vars/style.css';
import './Chatroom.css';
import ChatroomContent from '../ChatroomContent/ChatroomContent';
import TextField from '../TextField/TextField';

class Chatroom extends React.Component {
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
        <div className="Chatroom-Nav-User" id="wing" onClick={() => this.handleClick(u)}>
          <li>
            <img src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"></img>
            {u}
          </li>
        </div>
      );
    });

    return (
      <div className="Chatroom">
        <div className="Chatroom-Nav">{list}</div>
        <div className="Chatroom-Context">
          <ChatroomContent user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default Chatroom;