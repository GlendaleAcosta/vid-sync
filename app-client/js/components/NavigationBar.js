import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
import logo from 'images/yourface.png';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
       <Navbar color="light" light expand="md" className="w-100 shadow-sm">
         <NavbarBrand href="/"><img src={logo} style={{height: '30px'}}alt="logo"/></NavbarBrand>
         <NavbarToggler onClick={this.toggle} />
         <Collapse isOpen={this.state.isOpen} navbar>
           <Nav className="ml-auto" navbar>
             <NavItem>
               <NavLink >Create Room</NavLink>
             </NavItem>
             <NavItem>
               <NavLink href="/components/">Sign Up</NavLink>
             </NavItem>
             <NavItem>
               <NavLink href="https://github.com/reactstrap/reactstrap">Login</NavLink>
             </NavItem>
           </Nav>
         </Collapse>
       </Navbar>
     </div>
    );
  }

}

export default NavigationBar;
