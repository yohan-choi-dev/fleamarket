import React, { useState, useEffect, useContext } from 'react';
import '../../vars/style.css';
import './ChatRoom.css';
import ChatRoomContent from '../ChatRoomContent/ChatRoomContent';
import TextField from '../TextField/TextField';

// Contexts
import AppContext from '../../contexts/AppContext';

const ChatRoom = (props) => {
  // Props
  const { users } = props;

  // Contexts
  const { appState } = useContext(AppContext);

  // States
  const [chosenUserIndex, setChosenUserIndex] = useState(0);
  const [chosenUser, setchosenUser] = useState({
    id: 0,
    name: '',
    profileImageURL: ''
  });

  // Effects
  useEffect(() => {
    setchosenUser({
      ...users[chosenUserIndex]
    });
  }, [chosenUserIndex]);

  // Actions
  const handleClick = (userIndex) => {
    setChosenUserIndex(userIndex);
  }

  const list = users.map((user, index) => {
    return (
      <li className="ChatRoom-Nav-User" onClick={() => handleClick(index)} key={`ChatRoom-Nav-User-${index}`}>
        <div className='ChatRoom-Nav-User-profile-photo' style={{
          backgroundImage: `url(${user.profileImageURL})`
        }}></div>
        <span style={{
          color: index == chosenUserIndex ? '#8771A5' : '#CCCCCC'
        }}>{user.name}</span>
      </li>
    );
  });

  return (
    <div className="ChatRoom container">
      <div className="ChatRoom-wrapper">
        <ul className="ChatRoom-Nav">{list}</ul>
        <div className="ChatRoom-Context">
          <ChatRoomContent
            loggedInUserId={appState.user.id}
            otherUserId={chosenUser.id}
          />
        </div>
      </div>
    </div>
  );
}

// class ChatRoom extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {}
//     this.handleClick = this.handleClick.bind(this);
//   }
//   handleClick(props) {

//   }
//   render() {
//     const users = this.props.users;
//     const list = users.map(u => {
//       return (
//         <div className="ChatRoom-Nav-User" id="wing" onClick={() => this.handleClick(u)}>
//           <li>
//             <img src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"></img>
//             {u}
//           </li>
//         </div>
//       );
//     });

//     return (
//       <div className="ChatRoom">
//         <div className="ChatRoom-Nav">{list}</div>
//         <div className="ChatRoom-Context">
//           <ChatRoomContent user={this.state.user} />
//         </div>
//       </div>
//     );
//   }
// }

export default ChatRoom;