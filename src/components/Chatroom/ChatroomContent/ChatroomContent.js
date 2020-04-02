import React, { useState, useEffect } from 'react';
import './ChatroomContent.css';

// Components
import ChatMessage from '../ChatMessage/ChatMessage';
import Button from '../../Button/Button';
import LabeledInputField from '../../LabeledInputField/LabeledInputField';

// Utilities
import { getData } from '../../../utils/fetch-data';
import APIRoute from '../../../vars/api-routes';

function ChatroomContent(props) {
  const { chatroomId, loggedInUserId, loggedInUserName, otherUserId, otherUserName } = props;

  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');

  // Effects
  useEffect(() => {
    fetchMessages(chatroomId);
  }, [chatroomId]);

  // Actions
  const fetchMessages = async (chatroomId) => {
    const results = await getData(`${APIRoute}/api/messages?chatroomId=${chatroomId}`);
    setMessages(results);
  }

  return (
    <div className="ChatroomContent">
      <div className="ChatroomContent-messages">
        {
          messages.map((message, index) => {
            const userName = message.userId == loggedInUserId ? loggedInUserName : otherUserName;
            return (
              <ChatMessage key={`ChatMessage-${index}`} byUser={message.userId == loggedInUserId} userName={userName} message={message.message} />
            );
          })
        }
      </div>
      <div className="ChatroomContent-reply">
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
        <Button otherClassNames="purple">Reply</Button>
      </div>
    </div>
  );
}

export default ChatroomContent;