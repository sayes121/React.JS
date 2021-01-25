import React, { Component } from 'react';
import Header from './components/HeaderComponent';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import { STOCKSDATA } from './shared/stocksData';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: STOCKSDATA
    };
  }
  render() {
    return (

     
      <BrowserRouter>
      <div className="App">
        <Header />
        <Main stocks={this.state.stocks}/>

      </div>
    </BrowserRouter>
    

  );
  }
}

export default App;
