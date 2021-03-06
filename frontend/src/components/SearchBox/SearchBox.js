import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '@fortawesome/fontawesome-free/svgs/solid/search.svg';

import './SearchBox.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Utilities
import APIRoute from '../../vars/api-routes';

const SearchBox = () => {
  const [searchStatus, setSearchStatus] = useState({
    text: '',
    loading: false
  });
  const [searchItems, setSearchItems] = useState([]);

  const { appState } = useContext(AppContext);

  const handleSearchInputChange = event => {
    const userInput = event.target.value;
    setSearchStatus({
      ...setSearchStatus,
      text: userInput,
      loading: true
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (searchStatus.text.trim() === '') {
      setSearchStatus({
        ...searchStatus,
        loading: false
      });
      setSearchItems([]);
    } else {
      if (searchStatus.loading) {
        const searchEndpoint = appState.user.isLoggedIn ? `${APIRoute}/api/items?name=${searchStatus.text}&notOwned=1&userId=${appState.user.id}` : `${APIRoute}/api/items?name=${searchStatus.text}`;
        fetch(searchEndpoint, {
          method: 'GET',
          signal: signal
        })
          .then(response => {
            response.json().then(data => {
              if (!data.message) {
                setSearchItems(data);
                setSearchStatus({
                  ...searchStatus,
                  loading: false
                });
              }
            });
          })
          .catch(err => {
            console.error(err);
          });
      }
    }

    // This is the magic, every time the component updates, it will abort
    // the last fetch request.
    return function cleanup() {
      controller.abort();
    };
  }, [searchStatus.text]);

  var noMatchItem = false;
  if (searchItems.length === 0 && searchStatus.text && !searchStatus.loading) noMatchItem = true;

  return (
    <div className="SearchBox">
      <input
        className="SearchBox-input"
        type="text"
        placeholder="What are you looking for today?"
        value={searchStatus.text}
        onChange={handleSearchInputChange}
        autoFocus={true}
      />
      <div className="SearchBox-search-button">
        <SearchIcon className="SearchBox-search-icon" />
      </div>
      <div className="SearchBox-search-results">
        <ul className="SearchBox-search-results-items">
          {searchItems.map((item, index) => {
            const itemImageUrl = `${APIRoute}/${item.imageUrl}`;
            return (
              <li className="SearchBox-results-item" key={`SearchBox-results-item-${index}`}>
                <img className="SearchBox-results-item-image" src={itemImageUrl} alt="item" />
                <div className="SearchBox-results-item-info">
                  <Link className="SearchBox-results-item-info-name" to={`/item/${item.id}`}>
                    {item.name}
                  </Link>
                  <p className="SearchBox-results-item-info-username">
                    posted by <span>{item.userName}</span>
                  </p>
                </div>
              </li>
            );
          })}
          {noMatchItem ? <li className="SearchBox-results-item">No matching item is found.</li> : ""}
        </ul>
      </div>
    </div>
  );
};

export default SearchBox;
