import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ItemPage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import ItemInfo from '../../components/ItemInfo/ItemInfo';

// Contexts
import AppContext from '../../contexts/AppContext';

// API Route
import APIRoute from '../../vars/api-routes';

function ItemPage(props) {
  const { itemId } = useParams();
  const { appState, setAppState } = useContext(AppContext);

  const fetchItemById = async (id) => {
    const response = await fetch(`${APIRoute}/api/items/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
      }
    });

    const body = await response.json();

    return body;
  }

  useEffect(() => {
    fetchItemById(itemId)
      .then(data => {
        const fetchedItem = data[0];

        setAppState({
          ...appState,
          currentItem: {
            ...appState.currentItem,
            id: fetchedItem.id,
            name: fetchedItem.name,
            description: fetchedItem.description
          }
        });
      }).catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className="ItemPage">
      <Navigation />
      <div className="container">
        <ItemInfo item={appState.currentItem} />
      </div>
      <Footer />
    </div>
  );
}

export default ItemPage;