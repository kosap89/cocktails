import './App.css';
import React, { useState } from 'react'
import Search from '../src/Components/Search'
import Cocktail from '../src/Components/Cocktail'

function App() {
  const [cocktailQuery, setCocktailQuery] = useState(null);

  const handleSearch = query => {
    setCocktailQuery(query);
  };
  
  return (
    <div className='app'>
      <Search onSearch={handleSearch} />
      <Cocktail query={cocktailQuery} />
    </div>
  );
}

export default App;