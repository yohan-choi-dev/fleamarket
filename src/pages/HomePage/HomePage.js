import React, { useEffect, useState } from 'react';
import '../../vars/style.css';
import './HomePage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import SearchBox from '../../components/SearchBox/SearchBox';
import ItemCard from '../../components/ItemCard/ItemCard';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';

import APIRoute from '../../vars/api-routes';

function HomePage(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`${APIRoute}/api/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true
        }
      });

      const body = await response.json();

      setItems(body);
    }

    fetchItems();
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div className="HomePage">
      <Navigation />
      <header className="HomePage-header container">
        <h1 className="HomePage-header-title">
          Trade in your
          <br />
          secondhands for
          <br />
          something useful.
        </h1>
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
        {
          items.length > 6 ? <div className="HomePage-main-section-show-more">
            <Button>Show more</Button>
          </div> : ''
        }
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
