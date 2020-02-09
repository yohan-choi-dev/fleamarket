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
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjV4ta9qbHnAhXXlXIEHTqOBkkQjRx6BAgBEAQ&url=https%3A%2F%2Funsplash.com%2Fphotos%2F27QcqVqgVg4&psig=AOvVaw2oX21Bj93CQoX4f3UB4A5L&ust=1580679820844529'
    }}
  />
);
