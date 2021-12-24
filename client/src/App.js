import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Headers from './components/headers/Headers';
import Pages from './components/mainpages/Pages';

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="App"></div>
        <Headers />
        <Pages />
      </Router>
    </DataProvider>
  );
};
export default App;
