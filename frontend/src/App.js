import React from 'react'
import './App.css'
import { Navbar, Nav, NavDropdown, FormControl, Form as BForm, Button, Col, Container, Row } from 'react-bootstrap'
import Calendar from 'react-calendar'
import Slider from 'react-slick'
import { Form, TextInput } from './components/form'
import { BookingFlow } from './components/BookingFlow'


function App() {
  return (
    <>
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="#home">Corona Atlas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link></Nav.Link>
          </Nav>
          <Nav >
            <Nav.Link>Anmelden</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container>
        <Row className="mb-4">
          <Col className="mt-4">
            <BookingFlow />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;


