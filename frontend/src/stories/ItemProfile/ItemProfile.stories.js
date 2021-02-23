import React from 'react';
import ItemProfile from '../../components/ItemProfile/ItemProfile';

export default {
  title: 'ItemProfile',
  component: ItemProfile
};

export const Normal = () => (
  <ItemProfile
    comments={{
      pic: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.ca%2FApple-MB829LL-A-Magic-Mouse%2Fdp%2FB002TLTGM6&psig=AOvVaw2hbUO9NCgBSaeuuzTaWFrY&ust=1581983699160000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOD7gdWi1-cCFQAAAAAdAAAAABAD',
      name: 'William To',
      rating: '93',
      description:
        'Hell of echo park street art intelligentsia, heirloom hella sartorial listicle keytar humblebrag twee. Kitsch sustainable distillery affogato, humblebrag gastropub green juice organic. Vice asymmetrical etsy distillery migas quinoa polaroid. Slow-carb craft beer pour-over pok pok williamsburg sriracha migas fanny pack poutine tilde twee.',
      rate:'93'
    }}
  />
);