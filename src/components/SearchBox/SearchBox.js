import React, { useState, useEffect } from 'react';
import { ReactComponent as SearchIcon } from '@fortawesome/fontawesome-free/svgs/solid/search.svg';

import '../../vars/style.css';
import './SearchBox.css';

const SearchBox = () => {
  let controller;

  const [searchStatus, setSearchStatus] = useState({
    text: '',
    loading: false
  });

  const handleSearchInputChange = (event) => {
    const userInput = event.target.value;
    setSearchStatus({
      ...setSearchStatus,
      text: userInput,
      loading: true
    });
  }

  // const fetchSearchResults = async () => {
  //   controller.abort();
  //   controller = new AbortController();
  //   controller.abort.bind(controller);

  //   try {
  //     const response = await fetch(, {
  //       method: 'GET',
  //       signal: controller.signal
  //     });

  //     const body = await response.json();

  //     console.log(body);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (searchStatus.text.trim() == '') {
      setSearchStatus({
        ...searchStatus,
        loading: false
      })
    } else {
      if (searchStatus.loading) {
        fetch(`https://api.unsplash.com/search/photos?client_id=RF4MCBnafSRDlbW3c1TBS71GCxT63ydD7aFzuyJifPA&page=1&query=${searchStatus.text}`, {
          method: 'GET',
          signal: signal
        }).then((response) => {
          console.log(response);
        }).catch(err => {

        });
      }
    }

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
    </div>
  );
}

export default SearchBox;
