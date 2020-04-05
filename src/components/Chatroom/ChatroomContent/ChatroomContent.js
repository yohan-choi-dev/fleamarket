import React, { useState, useEffect, useContext, useRef } from 'react';
import './ChatroomContent.css';

// Components
import ChatMessage from '../ChatMessage/ChatMessage';
import Button from '../../Button/Button';
import LabeledInputField from '../../LabeledInputField/LabeledInputField';

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

  // Contexts
  const { chatState, dispatch } = useContext(ChatContext);

  const sendMessage = async () => {
    const message = replyMessage.trim();
    setReplyMessage('');
    const dispatchData = {
      userId: loggedInUserId,
      otherUserId: otherUserId,
      message: message,
      chatroomId: chatroomId,
      dateCreated: Date.now()
    }
    const data = {
      user: {
        id: chatState.chatroomsInfo[chatState.currentChatroomId].otherUser.id,
        name: chatState.chatroomsInfo[chatState.currentChatroomId].otherUser.name,
        email: chatState.chatroomsInfo[chatState.currentChatroomId].otherUser.email
      },
      from: loggedInUserId,
      time: Date.now(),
      message: message
    }
    console.log('datatatata:');
    console.log(loggedInUserId);
    chatState.userIO.emit('message.update', data);
    dispatch({
      type: 'CHATROOM_MESSAGES_ADD',
      chatroomId: dispatchData.chatroomId,
      userId: dispatchData.userId,
      message: dispatchData.message
    });
  }

  return (
    <div className="ChatroomContent">
      <div className="ChatroomContent-messages" ref={messagesPanel}>
        {
          chatState.chatroomsInfo[chatState.currentChatroomId] && chatState.chatroomsInfo[chatState.currentChatroomId].messages.slice(0).reverse().map((message, index) => {
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