import React, { useEffect, useState } from 'react';
import './HomePage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import SearchBox from '../../components/SearchBox/SearchBox';
import ItemCard from '../../components/ItemCard/ItemCard';
import Footer from '../../components/Footer/Footer';

// Utilities
import APIRoute from '../../vars/api-routes';
import { getData } from '../../utils/fetch-data';

function HomePage(props) {
  // State
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await getData(`${APIRoute}/api/items`);

      setItems(response);
    }

    fetchItems();
  }, []);

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
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
