import React from 'react';
import './App.css';

// Components
import SampleComponent from '../SampleComponent/SampleComponent';
import Card from '../Card/Card';
import SearchBox from '../SearchBox/SearchBox';

function App() {
  return (
    <div className="App">
      <h1>FleaMarket</h1>
      <SearchBox />
      <Card />
     
    </div>
  );
}

export default App;
