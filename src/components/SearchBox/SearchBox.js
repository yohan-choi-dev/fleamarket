import React from 'react';
import { ReactComponent as SearchIcon } from '@fortawesome/fontawesome-free/svgs/solid/search.svg';

import '../../vars/style.css';
import './SearchBox.css';

class SearchBox extends React.Component {
  render() {
    return (
      <div className="SearchBox">
        <input
          className="SearchBox-input"
          type="text"
          placeholder="What are you looking for today?"
        />
        <div className="SearchBox-search-button">
          <SearchIcon className="SearchBox-search-icon" />
        </div>
      </div>
    );
  }
}

export default SearchBox;
