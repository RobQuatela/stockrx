import React, { useEffect } from 'react';
import './App.css';
import TitleBar from './common/components/title-bar';
import * as stocksService from './common/services/stocks-service';

function App() {

  useEffect(() => {
    stocksService.findall();
  }, [])
  return (
    <div className="app">
      <TitleBar />
    </div>
  );
}

export default App;
