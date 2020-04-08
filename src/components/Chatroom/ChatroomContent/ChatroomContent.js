import React, { useState, useEffect, useContext, useRef } from 'react';
import './ChatroomContent.css';

// Components
import ChatMessage from '../ChatMessage/ChatMessage';
import Button from '../../Button/Button';
import LabeledInputField from '../../LabeledInputField/LabeledInputField';
import DropdownButton from '../../DropdownButton/DropdownButton';

// Utilities
import { getData } from '../../../utils/fetch-data';
import APIRoute from '../../../vars/api-routes';

// Contexts
import { ChatContext } from '../../../contexts/ChatContext/ChatContext';

function ChatroomContent(props) {
  const { chatroomId, loggedInUserId, loggedInUserName, otherUserId, otherUserName } = props;
  const messagesPanel = useRef(null);

  // States
  const [replyMessage, setReplyMessage] = useState('');
  const [userItems, setUserItems] = useState([]);
  const [tradingItem, setTradingItem] = useState({});

  // Contexts
  const { chatState, dispatch } = useContext(ChatContext);

  const sendMessage = async () => {
    const message = replyMessage.trim();
    setReplyMessage('');
    const data = {
      user: {
        id: chatState.chatrooms[chatState.currentChatroomId].otherUser.id,
        name: chatState.chatrooms[chatState.currentChatroomId].otherUser.name,
        email: chatState.chatrooms[chatState.currentChatroomId].otherUser.email
      },
      from: loggedInUserId,
      time: Date.now(),
      message: message
    }
    chatState.chatIO.emit('message.update', data);
    dispatch({
      type: 'CHATROOM_MESSAGES_ADD',
      payload: {
        chatroomId: data.user.id,
        userId: data.from,
        message: data.message
      }
    });
  }

  const fetchUserItems = async (userId) => {
    const allUserItems = await getData(`${APIRoute}/api/items?user=${userId}`);
    const filteredResults = allUserItems.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.imageUrls[0]
      }
    });
    setUserItems(filteredResults);
  }

  useEffect(() => {
    fetchUserItems(loggedInUserId);
  }, []);

  useEffect(() => {
    setTradingItem(userItems[0]);
  }, [userItems]);

  const selectTradingItem = (e) => {
    const index = e.target.value;
    setTradingItem(userItems[index]);
  }

  return (
    <div className="ChatroomContent">
      {/* <button onClick={() => {
        chatState.chatIO.emit('leave', {
          id: chatState.chatrooms[chatState.currentChatroomId].otherUser.id
        });
      }}>Leave chat</button> */}
      <div className="ChatroomContent-trade">
        <DropdownButton
          options={userItems.map((item, index) => {
            return {
              value: index,
              label: item.name
            }
          })}
          onChangeHandler={selectTradingItem}
        />
        <Button otherClassNames="purple">
          Trade with {otherUserName.split(' ')[0]}
        </Button>
      </div>
      <div className="ChatroomContent-messages" ref={messagesPanel}>
        {
          chatState.chatrooms[chatState.currentChatroomId] && chatState.chatrooms[chatState.currentChatroomId].messages.slice(0).reverse().map((message, index) => {
            const userName = message.userId == loggedInUserId ? loggedInUserName : otherUserName;
            return (
              <ChatMessage key={`ChatMessage-${index}`} byUser={message.userId == loggedInUserId} userName={userName} message={message.message} />
            );
          })
        }
      </div>
      <form className="ChatroomContent-reply" onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}>
        <LabeledInputField
          labeled={false}
          inputField={{
            id: 'Chatroom-reply-input',
            name: 'Chatroom-reply-input',
            type: 'text',
            required: true,
            onChangeHandler: event => {
              setReplyMessage(event.target.value);
            },
            value: replyMessage
          }}
        />
        <Button type="submit" otherClassNames="purple">Reply</Button>
      </form>
    </div>
  );
}

export default ChatroomContent;