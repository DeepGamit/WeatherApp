import React, { Component } from 'react';
import WeatherDay from './WeatherDay';
import SearchBar from './SearchBar';
import WeatherHourly from './WeatherHourly';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  render(){
    return(
      <BrowserRouter>

          <div className="App">
              <Route exact path="/" component={SearchBar}/>
              <Route exact path="/" component={WeatherDay}/>
              <Route exact path="/:day" component={WeatherHourly}/>

            </div>
          
      </BrowserRouter>
        
    )
  }
}

export default App;
