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
import ValidatedInputField from '../../components/ValidatedInputField/ValidatedInputField';
import Button from '../../components/Button/Button';

// Contexts
import AppContext from '../../contexts/AppContext';

// Utilities
import APIRoute from '../../vars/api-routes';
import { getData, postData, deleteData } from '../../utils/fetch-data';

function HomePage(props) {
  // State
  const LIMIT = 6;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState({
    start: 0,
    end: LIMIT
  });
  const [totalItemsNum, setTotalItemsNum] = useState(0);

  // Context
  const { appState } = useContext(AppContext);

  const fetchItems = async () => {
    let itemList = [];
    let apiEndpoint = `${APIRoute}/api/items?notOwned=1&userId=${appState.user.id}&start=${page.start}&end=${page.end}`;
    if (appState.user.isLoggedIn) {
      itemList = await getData(apiEndpoint);
    } else {
      apiEndpoint = `${APIRoute}/api/items?start=${page.start}&end=${page.end}`;
      itemList = await getData(apiEndpoint);
    }

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

    return itemList;
  }

  useEffect(() => {
    fetchItems()
      .then(data => {
        setItems(data);
      });
  }, [totalItemsNum]);

  useEffect(() => {
    fetchItems()
      .then(data => {
        setItems([
          ...items,
          ...data
        ]);
      });
  }, [page]);

  useEffect(() => {
    const getTotalNumberOfItems = async () => {
      let totalItemsEndpoint = `${APIRoute}/api/items/count`;
      if (appState.user.isLoggedIn) {
        totalItemsEndpoint = `${APIRoute}/api/items/count?notOwned=1&userId=${appState.user.id}`;
      }
      let total = await getData(totalItemsEndpoint);
      setTotalItemsNum(total.numberOfItems);
    }

    getTotalNumberOfItems();
  }, [appState.user.isLoggedIn]);

  // useEffect(() => {

  // }, [page]);

  const handleLikedStatus = async (liked, itemId) => {
    if (liked) {
      await postData(
        `${APIRoute}/api/favorites`,
        JSON.stringify({
          userId: appState.user.id,
          itemId: itemId
        }),
        'application/json'
      );

    } else {
      await deleteData(
        `${APIRoute}/api/favorites`,
        JSON.stringify({
          userId: appState.user.id,
          itemId: itemId
        })
      )
    }
    const updatedItemList = items.map(item => (
      item.id === itemId ?
        {
          ...item,
          favoritedByUser: liked
        } :
        {
          ...item
        }
    ));
    setItems(updatedItemList);
  }

  const handleShowMore = () => {
    setPage({
      start: page.end,
      end: page.end * LIMIT
    });
  }

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
              <ItemCard item={item} key={`ItemCard-${index}`} showLikeButton={true} handleLikedStatus={handleLikedStatus} />
            ))
          }
        </div>
        {
          page.end < totalItemsNum ? <div className="HomePage-actions">
            <Button otherClassNames="purple" handleOnClick={handleShowMore}>Show More</Button>
          </div> : ''
        }
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
