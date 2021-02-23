import React from 'react';
import ItemComments from '../../components/ItemComments/ItemComments';

export default {
  title: 'ItemComments',
  component: ItemComments
};

export const Normal = () => (
  <ItemComments
    comments={{
      name: 'Yohan Chi',
      rating: '4.3',
      description:
        'Brunch hexagon hot chicken, church-key small batch fam chicharrones health goth 3 wolf moon. Fam put a bird on it woke cloud bread, leggings pork belly locavore yuccie unicorn pug artisan church-key iceland paleo cred'
    }}
  />
);