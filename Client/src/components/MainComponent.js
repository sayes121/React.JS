import React, { Component } from 'react';
import {Switch,Route,Redirect, withRouter } from 'react-router-dom';
import Stock from './StockComponent';
import Home from './HomeComponent';
import StockDetails from './StockDetailsComponent';

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
     
    }
  }

  render() {
    const StockWithSymbol = ({match}) => {
         return(
        <StockDetails matchParam={match.params}
        />
      );
    };
    return (
      <div>
     
        <Switch location={this.props.location}>
          <Route path='/home' component={Home}/>
          <Route exact path='/stocks' component={Stock}/>
          <Route path='/stocks/:stocksSymbol' component={StockWithSymbol}/>
          <Redirect to="/home" />
       </Switch>
    
      </div>
    );
  }
}

export default withRouter(Main);
