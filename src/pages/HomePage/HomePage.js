import React from 'react';
import { Link } from 'react-router-dom';
import '../../vars/style.css';
import './HomePage.css';

// Components
import Logo from '../../components/Logo/Logo';
import SearchBox from '../../components/SearchBox/SearchBox';
import ItemCard from '../../components/ItemCard/ItemCard';

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
      <div className="HomePage-top-bar container">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="HomePage-navigation">
          <ul>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
      <header className="HomePage-header container">
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
      </main>
      <div className="HomePage-footer"></div>
    </div>
  );
}

export default HomePage;
