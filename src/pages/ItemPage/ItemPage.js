import React from 'react';
import { useParams } from 'react-router-dom';
import './ItemPage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

function ItemPage(props) {
  let { itemId } = useParams();

  return (
    <div className="ItemPage">
      <Navigation />
      {itemId}
      <Footer />
    </div>
  );
}

export default ItemPage;