import React from 'react';
import logo from './logo.svg';
import './App.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import World from './components/world'
import Country from './components/country'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={World} />
         <Route path="/country/:country" component={Country} />
      </div>
    </Router>
  );
}

export default App;
