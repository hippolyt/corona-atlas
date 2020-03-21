import React from 'react'
import './App.css'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

function App() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-right">
          <Nav.Link>Registrieren</Nav.Link>
          <Nav.Link>Anmelden</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default App;
