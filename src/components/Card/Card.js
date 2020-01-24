import React from 'react';
import './Card.css';
import LikeButtons from '../LikeButtons/LikeButtons.js'

function Card(props) {
  const { item } = props;
  return (
    <div className="Card">
        <img src="item.photo"></img>
        <h1>Nike PEACEMINUSONE - Para Noise</h1>
        <p id="poster">posted by William To</p>
        <p id="detail">Kombucha woke forage tacos disrupt tumblr tousled, try-hard pork belly ennui tote bag knausgaard. Man bun lo-fi helvetica, pop-up chia venmo church-key.</p>
        <div id="buttons"><LikeButtons /></div>

        {/* when we have the var we need to pass the like 
        or unliked to the LikeButton */}

        
    </div>
  );
}

export default Card;