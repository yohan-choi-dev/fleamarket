import React from 'react';
import '../../vars/style.css';
import './Item.css';
import LikeButton from '../LikeButton/LikeButton';
import Button from '../Button/Button';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(props) {

    this.setState({ url:props });

  }
  render() {
    const url = this.props.url;
    const imageList = url.map(u => {
      return (
        <div className="Item-Photo-Box" onClick={() => this.handleClick(u)}>
          <img src={u}></img><span></span>
        </div>
      );
    });

    return (
      <div className="Item">
        <div className="Item-Photo">
            <img src={this.state.url}></img>

        </div>
        <div className="Item-Photo-Nav">{imageList}</div>

        <div className="Item-Detail">
          <h1>item title</h1>
          by william
          <br></br>
          <p>Hell of echo park street art intelligentsia, heirloom hella sartorial listicle keytar humblebrag twee. Kitsch sustainable distillery affogato, humblebrag gastropub green juice organic. Vice asymmetrical etsy distillery migas quinoa polaroid. Slow-carb craft beer pour-over pok pok williamsburg sriracha migas fanny pack poutine tilde twee.</p>
          <LikeButton className='LikeButton'/> 90
          <div className="Item-Detail-Button">
              <Button>Contact User</Button>
             
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
