import React,{Component} from 'react';
import { Nav,Navbar,NavItem,Jumbotron} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component{
  constructor(props){
    super(props);
    this.state={
    
    }
    
  }
  

  render(){
    return(
      <React.Fragment>
    
      <Navbar dark expand="md">
      <div className="container">
      
    
     
      <Nav navbar>
      <NavItem>
      <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
      </NavItem>
      <NavItem>
      <NavLink className="nav-link" to='/stocks'><span className="fa fa-info fa-lg"></span> Stocks</NavLink>
      </NavItem>
      </Nav>
     
      </div>
      
      </Navbar>
      <Jumbotron>
      <div className="container">
      <div className="row row-header">
      <div className="col-12 col-sm-6">
      <h1>STOCK MARKET EXPLORER</h1>
      <p>Welcome to the Landing page of Stock Market Explorer. You may click on stocks to view all the stocks or search to
view the latest 100 days of activity.
</p>
      </div>
      </div>
      </div>
      </Jumbotron>


      </React.Fragment>

    )
  }
}
export default Header;
