import React, { useEffect, useState, useContext } from 'react';
import { ReactComponent as HeartIcon } from '@fortawesome/fontawesome-free/svgs/regular/heart.svg';
import { ReactComponent as ChatIcon } from '@fortawesome/fontawesome-free/svgs/brands/weixin.svg';
import { ReactComponent as TradeIcon } from '@fortawesome/fontawesome-free/svgs/regular/handshake.svg';
import './HomePage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import SearchBox from '../../components/SearchBox/SearchBox';
import ItemCard from '../../components/ItemCard/ItemCard';
import Footer from '../../components/Footer/Footer';

// Contexts
import AppContext from '../../contexts/AppContext';

// Utilities
import APIRoute from '../../vars/api-routes';
import { getData } from '../../utils/fetch-data';
import asyncForEach from '../../utils/async-for-each';

function HomePage(props) {
  // State
  const [items, setItems] = useState([]);

  // Context
  const { appState } = useContext(AppContext);

  useEffect(() => {
    const fetchItems = async () => {
      let itemList = await getData(`${APIRoute}/api/items`);

      if (appState.user.isLoggedIn) {
        const itemsLikedByUser = await getData(`${APIRoute}/api/favorites?userId=${appState.user.id}`);
        itemList = itemList.map(item => {
          if (itemsLikedByUser.includes(item.id)) {
            return {
              ...item,
              favoritedByUser: true
            }
          } else {
            return {
              ...item,
              favoritedByUser: false
            }
          }
        });
      }

      setItems(itemList);
    }

    fetchItems();
  }, []);

  return (
    <div className="HomePage">
      <Navigation />
      <header className="HomePage-header container">
        <h1 className="HomePage-header-title">
          Your one-stop website for
          <br />
          online bartering
        </h1>
        <div className="HomePage-steps">
          <p className="HomePage-step HomePage-step-1">
            <span><HeartIcon /></span>
            1. Find something you like<br />and want to trade for
          </p>
          <p className="HomePage-step HomePage-step-2">
            <span><ChatIcon /></span>
            2. Reach out to the owner<br />for more information
          </p>
          <p className="HomePage-step HomePage-step-3">
            <span><TradeIcon /></span>
            3. Negotiate and complete<br />your trade!
          </p>
        </div>
        <SearchBox />
      </header>
      <main className="HomePage-main-section container">
        <h2 className="HomePage-main-section-heading">Items close to you</h2>
        <div className="HomePage-main-section-items">
          {
            items.map((item, index) => (
              <ItemCard item={item} key={`ItemCard-${index}`} />
            ))
          }
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
