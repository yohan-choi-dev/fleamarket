import React from 'react';
import './LikeButtons.css'


class LikeButtons extends React.Component {
    handleClick = () => {
        this.setState ({liked: !this.state.liked})
    }
    constructor(props) {
        super(props);
        this.state = {liked: false}
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        let style = {}, 
        styleLike = {}
        if (!this.state.liked) {
            styleLike = {
                color: "#CCCCCC",
                border:"2px solid #CCCCCC"
            }
        } else {
            style = {
                background: "white",

            }
            styleLike = {
                color: "#8771A5",
                animation: "like 1s"
            }
        }
        return (
            <div className='likeButton'>
                <div onClick={this.handleClick} style={style} className="hearth-circle">
                    <i style={styleLike} className="fas fa-heart" id="like"></i>
                </div>
            </div>
        )
    }
};

export default LikeButtons;