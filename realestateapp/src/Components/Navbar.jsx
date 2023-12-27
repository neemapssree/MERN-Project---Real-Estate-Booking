import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';



const MainNavbar = () => {

  const {userDetails} = useSelector(state=>state.user);

  return (
    <Navbar expand="lg" className="navbar-light py-0">
      <Container className='justify-content-between'>
        <Navbar.Brand href="#home" className='logoImg'>ABC Properties</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
          <Nav style={{gap:'30px'}}>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/add-property">Add Property</Nav.Link>
            <Nav.Link href="#link">Projects</Nav.Link>
            <NavDropdown title="Communities" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Dubai</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              Abu Dhabi
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Sharjah</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          <button>{userDetails.name}</button>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNavbar