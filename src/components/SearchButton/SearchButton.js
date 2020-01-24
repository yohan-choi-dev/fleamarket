import React from 'react';
import './SearchButton.css'


class SearchButton extends React.Component {
    handleClick = () => {
        
    }
    constructor(props) {
        super(props);
        this.state = {searchString: props}
        this.handleClick = this.handleClick.bind(this);
    }
    
    render() {
        return (
            <div id="SearchButton" >
                <div onClick={this.handleClick} className="hearth-circle">
                 <i class="fas fa-search"></i>
                </div>
            </div>
        )
    }
};

export default SearchButton;