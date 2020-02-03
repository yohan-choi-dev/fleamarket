import React from 'react';
import '../../vars/style.css';
import './HomePage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import SearchBox from '../../components/SearchBox/SearchBox';
import ItemCard from '../../components/ItemCard/ItemCard';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';

const item = {
  name: 'NIKE PEACEMINUSONE - Para Noise sneaker',
  owner: 'William To',
  description:
    'Kombucha woke forage tacos disrupt tumblr tousled, try-hard pork belly ennui tote bag knausgaard. Man bun lo-fi helvetica, pop-up chia venmo church-key.',
  imageUrl:
    'https://www.kicksonfire.com/wp-content/uploads/2019/11/PEACEMINUSONE-X-Nike-Air-Force-1-Low-Para-Noise.jpg'
};

function HomePage() {
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
          <ItemCard item={item} />
          <ItemCard item={item} />
          <ItemCard item={item} />
          <ItemCard item={item} />
          <ItemCard item={item} />
          <ItemCard item={item} />
        </div>
        <div className="HomePage-main-section-show-more">
          <Button text="Show More" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
