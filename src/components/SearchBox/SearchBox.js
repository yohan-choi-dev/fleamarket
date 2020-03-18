import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '@fortawesome/fontawesome-free/svgs/solid/search.svg';

import '../../vars/style.css';
import './SearchBox.css';

import APIRoute from '../../vars/api-routes';

const SearchBox = () => {

  const [searchStatus, setSearchStatus] = useState({
    text: '',
    loading: false
  });
  const [searchItems, setSearchItems] = useState([]);

  const handleSearchInputChange = (event) => {
    const userInput = event.target.value;
    setSearchStatus({
      ...setSearchStatus,
      text: userInput,
      loading: true
    });
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (searchStatus.text.trim() == '') {
      setSearchStatus({
        ...searchStatus,
        loading: false
      });
      setSearchItems([]);
    } else {
      if (searchStatus.loading) {
        fetch(`/api/items?name=${searchStatus.text}`, {
          method: 'GET',
          signal: signal
        }).then((response) => {
          response.json().then((data) => {
            if (!data.message) {
              setSearchItems(data);
              setSearchStatus({
                ...searchStatus,
                loading: false
              });
            }
          });
        }).catch(err => {
          console.error(err);
        });
      }
    }

    // This is the magic, every time the component updates, it will abort
    // the last fetch request.
    return function cleanup() {
      controller.abort();
    }

  }, [searchStatus.text]);

  return (
    <div className="SearchBox">
      <input
        className="SearchBox-input"
        type="text"
        placeholder="What are you looking for today?"
        value={searchStatus.text}
        onChange={handleSearchInputChange}
      />
      <div className="SearchBox-search-button">
        <SearchIcon className="SearchBox-search-icon" />
      </div>
      <div className="SearchBox-search-results">
        <ul className="SearchBox-search-results-items">
          {
            searchItems.map((item, index) => {
              const itemImageUrl = `${APIRoute}/${item.url}`;
              return (
                <li className="SearchBox-results-item" key={`SearchBox-results-item-${index}`}>
                  <img className="SearchBox-results-item-image" src={itemImageUrl} alt="item" />
                  <div className="SearchBox-results-item-info">
                    <Link className="SearchBox-results-item-info-name" to={`/item/${item.id}`}>{item.name}</Link>
                    <p className="SearchBox-results-item-info-username">posted by <span>{item.userName}</span></p>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default SearchBox;
