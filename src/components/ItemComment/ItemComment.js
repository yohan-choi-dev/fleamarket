import React from 'react';
import './ItemComment.css';
import { ReactComponent as StarIcon } from '@fortawesome/fontawesome-free/svgs/solid/star.svg';
import Button from '../Button/Button';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const comments = this.props.comment;
    const list = comments.map(c => {
      return (
        <div className="ItemComment-Detail">
          <div className="ItemComment-Detail-User">
            <img src={c.user}></img> <b>{c.name}</b>
            <StarIcon className="StarIcon" />
            <p>{c.rate}</p>
          </div>
          <div className="ItemComment-Detail-Content">
            <p>{c.content}</p>
          </div>
        </div>
      );
    });

    return (
      <div className="ItemComment">
        <div className="ItemComment-Detail-Container">{list}</div>
        <div className='ItemComment-Reply'>
          <input placeholder="Write a comment" size="120" />
          <Button>Comment</Button>
        </div>
      </div>
    );
  }
}

export default Item;
