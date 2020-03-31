import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ItemPage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ItemInfo from '../../components/ItemInfo/ItemInfo';
import ItemComment from '../../components/ItemComment/ItemComment';

// Contexts
import AppContext from '../../contexts/AppContext';

// Utilities
import APIRoute from '../../vars/api-routes';
import { getData } from '../../utils/fetch-data';

function ItemPage(props) {
  const { itemId } = useParams();
  const { appState, setAppState } = useContext(AppContext);

  const fetchItem = async (id) => {
    const item = await getData(`${APIRoute}/api/items/${id}`);
    const comments = await getData(`${APIRoute}/api/comments/${id}`);
    setAppState({
      ...appState,
      currentItem: {
        ...appState.currentItem,
        id: item.id,
        name: item.name,
        description: item.description,
        imageUrls: item.imageUrls.map(itemImage => `${APIRoute}/${itemImage}`),
        owner: {
          id: item.userId,
          name: item.userName
        },
        comments:comments
      }
      
    });
  }

  useEffect(() => {
    fetchItem(itemId);
  }, [itemId]);

  return (
    <div className="ItemPage">
      <Navigation />
      <div className="container">
        <ItemInfo item={appState.currentItem} />
        <ItemComment comments={appState.currentItem.comments}/>
    
      </div>
      <Footer />
    </div>
  );
}

export default ItemPage;