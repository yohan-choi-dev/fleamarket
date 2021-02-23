import React from 'react';
import ItemCard from '../../components/ItemCard/ItemCard';

export default {
  title: 'ItemCard',
  component: ItemCard
};

export const Normal = () => (
  <ItemCard
    item={{
      name: 'NIKE PEACEMINUSONE - Para Noise sneaker',
      owner: 'William To',
      description:
        'Kombucha woke forage tacos disrupt tumblr tousled, try-hard pork belly ennui tote bag knausgaard. Man bun lo-fi helvetica, pop-up chia venmo church-key.',
      imageUrl:
        'https://www.kicksonfire.com/wp-content/uploads/2019/11/PEACEMINUSONE-X-Nike-Air-Force-1-Low-Para-Noise.jpg'
    }}
  />
);
