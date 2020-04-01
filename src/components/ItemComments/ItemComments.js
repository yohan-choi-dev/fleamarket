import React, { useContext, useState } from 'react';
import './ItemComments.css';
import { ReactComponent as StarIcon } from '@fortawesome/fontawesome-free/svgs/solid/star.svg';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Button from '../Button/Button';
import LabeledInputField from '../LabeledInputField/LabeledInputField';

// Utilities
import APIRoute from '../../vars/api-routes';
import { postData } from '../../utils/fetch-data';

const ItemComments = (props) => {
  const { comments, itemId } = props;

  const { appState, setAppState } = useContext(AppContext);

  const [userComment, setUserComment] = useState('');

  const addComment = async () => {
    const response = await postData(
      `${APIRoute}/api/comments`,
      JSON.stringify({
        userId: appState.user.id,
        itemId: itemId,
        content: userComment
      }),
      'application/json'
    );

    if (response.status >= 200 && response.status <= 299) {
      const currentComments = [...comments, {
        userName: appState.user.name,
        userDescription: appState.user.description,
        userImage: appState.user.image,
        commentContent: userComment
      }];

      setAppState({
        ...appState,
        currentItem: {
          ...appState.currentItem,
          comments: currentComments
        }
      });

      setUserComment('');
    } else {
      window.alert('Cannot add comment. Please try again.');
    }
  }

  return (
    <div className="ItemComments">
      <div className="ItemComments-Detail-Container">
        {
          comments.map((c, index) => {
            return (
              <div className="ItemComments-Detail" key={`Comment-${index}`}>
                <div className="ItemComments-Detail-User">
                  <img src={`${APIRoute}/${c.userImage}`} />
                  <div className="ItemComments-Detail-User-Info">
                    <p className="ItemComments-Detail-User-Name">{c.userName}</p>
                    <p className="ItemComments-Detail-User-Rating"><span role="img"><StarIcon className="StarIcon" /></span>4.5</p>
                  </div>
                </div>
                <p className="ItemComments-Detail-Content">{c.commentContent}</p>
              </div>
            );
          })
        }
      </div>
      {appState.user.isLoggedIn ? <form onSubmit={(e) => {
        e.preventDefault();
        addComment();
      }} className='ItemComments-Reply'>
        <LabeledInputField
          labeled={false}
          inputField={{
            id: 'ItemComments-Reply-input',
            name: 'ItemComments-Reply-input',
            type: 'text',
            required: true,
            onChangeHandler: event => {
              setUserComment(event.target.value);
            },
            value: userComment
          }}
        />
        <Button type="submit" otherClassNames="purple">Comment</Button>
      </form> : ''}
    </div>
  );
}

export default ItemComments;
