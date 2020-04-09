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
  const [openTrade, setOpenTrade] = useState(false);

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
    if (userItems.length > 0) {
      dispatch({
        type: 'USER_TRADING_ITEM_UPDATE',
        payload: {
          tradingItem: {
            id: userItems[0].id,
            name: userItems[0].name,
            image: userItems[0].image
          }
        }
      });
    }
  }, [userItems]);

  useEffect(() => {
    setOpenTrade(false);
  }, [chatState.currentChatroomId]);

  const startTrade = () => {
    setOpenTrade(true);
    chatState.tradeIO.emit(
      'select.item',
      // showTo
      chatState.currentChatroomId,
      { // item
        id: chatState.user.tradingItem.id,
        name: chatState.user.tradingItem.name,
        image: chatState.user.tradingItem.image
      }
    )
  }

  const confirmTrade = () => {
    chatState.tradeIO.emit(
      'user.request.confirm',
      {
        id: otherUserId
      }
    );

    if (
      chatState.chatrooms[chatState.currentChatroomId].otherUser.tradingItem &&
      chatState.chatrooms[chatState.currentChatroomId].otherUser.tradingItem.confirmed
    ) {
      chatState.tradeIO.emit(
        'user.confirm.trade',
        { // item 1
          userId: loggedInUserId,
          id: chatState.user.tradingItem.id,
          name: chatState.user.tradingItem.name
        },
        { // item 2
          userId: chatState.chatrooms[chatState.currentChatroomId].otherUser.id,
          id: chatState.chatrooms[chatState.currentChatroomId].otherUser.tradingItem.id,
          name: chatState.chatrooms[chatState.currentChatroomId].otherUser.tradingItem.name
        }
      );
    }
  }

  const selectTradingItem = (e) => {
    const index = e.target.value;
    setOpenTrade(false);

    dispatch({
      type: 'USER_TRADING_ITEM_UPDATE',
      payload: {
        tradingItem: {
          id: userItems[index].id,
          name: userItems[index].name,
          image: userItems[index].image,
        }
      }
    });
  }

  const completeTrade = () => {

  }

  console.log(chatState.currentTradeCompleted)

  return (
    <div className="ChatroomContent">
      {/* <button onClick={() => {
        chatState.chatIO.emit('leave', {
          id: chatState.chatrooms[chatState.currentChatroomId].otherUser.id
        });
      }}>Leave chat</button> */}
      <div className="ChatroomContent-trade">
        <div className="ChatroomContent-trade-bar">
          {userItems.length > 0 && <DropdownButton
            options={userItems.map((item, index) => {
              return {
                value: index,
                label: item.name
              }
            })}
            onChangeHandler={selectTradingItem}
          />}
          {
            (chatState.currentTradeCompleted ?
              (
                <Button handleOnClick={completeTrade} otherClassNames="green">
                  Complete Trade
                </Button>
              ) :
              (
                openTrade ?
                  (
                    <Button handleOnClick={confirmTrade} otherClassNames="purple">
                      Confirm Trade
                    </Button>
                  ) :
                  (
                    <Button handleOnClick={startTrade} otherClassNames="purple">
                      Trade with {otherUserName.split(' ')[0]}
                    </Button>
                  )
              )
            )
          }
        </div>
        {
          openTrade &&
          <div className="ChatroomContent-trade-panel">
            <div className="ChatroomContent-trade-panel-other-user">
              <h2 className="ChatroomContent-trade-panel-heading">{otherUserName}'s Item</h2>
              <div
                className="ChatroomContent-trade-panel-user-item-image"
                style={{
                  backgroundImage: `url('http://myvmlab.senecacollege.ca:6761/${chatState.chatrooms[chatState.currentChatroomId].otherUser.tradingItem.image}')`
                }}
              >
              </div>
              <p className="ChatroomContent-trade-panel-other-user-item-name">
                {chatState.chatrooms[chatState.currentChatroomId].otherUser.tradingItem.name}
              </p>
              {
                !chatState.chatrooms[chatState.currentChatroomId].otherUser.tradingItem.confirmed ?
                  <p className="ChatroomContent-trade-panel-status-message">Pending for user's confirmation...</p> :
                  <p className="ChatroomContent-trade-panel-status-message-confirmed">Confirmed ✅</p>
              }
            </div>
            <hr />
            <div className="ChatroomContent-trade-panel-current-user">
              <h2 className="ChatroomContent-trade-panel-heading">Your Item</h2>
              <div
                className="ChatroomContent-trade-panel-user-item-image"
                style={{
                  backgroundImage: `url('http://myvmlab.senecacollege.ca:6761/${chatState.user.tradingItem.image}')`
                }}
              >
              </div>
              <p className="ChatroomContent-trade-panel-current-user-item-name">
                {chatState.user.tradingItem.name}
              </p>
              {
                !chatState.user.tradingItem.confirmed ?
                  <p className="ChatroomContent-trade-panel-status-message">Click "Confirm Trade" to confirm this trade</p> :
                  <p className="ChatroomContent-trade-panel-status-message-confirmed">Confirmed ✅</p>
              }
            </div>
          </div>
        }
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