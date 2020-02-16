import React from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

export default {
  title: 'ProfileCard',
  component: ProfileCard
};

export const Normal = () => (
  <ProfileCard
    profile={{
      name: 'William To',
      rating: 'Rating: 4.5/5',
      description:
        'Hello, my name is William. Message me if you want to trade anything from my list!',
      imageUrl:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
    }}
  />
);
