import React,{Component} from 'react';
import Logo from '../assets/images/updown.png'

 
class Home extends Component {
constructor(props) {
    super(props);
 
    this.state = {
      
    }
}





render() {
   

    return (
        <div className="container ">
            <center><img src ={Logo} alt ="Stock market"/></center>
            <div className="post card">
                <div className="card-content">
                <b></b>
                <center><h3><b>"Know what you own, and know why you own it." - Peter Lynch</b></h3></center>
                <p>Do your homework before making a decision. And once you've made a decision, make sure to re-evaluate your portfolio on a timely basis. A wise holding today may not be a wise holding in the future.</p>
                </div>
            </div>
                  
          
        </div>
    );
}
}
export default Home;