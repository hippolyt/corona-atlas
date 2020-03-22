import React from 'react'
import './App.css'
import { Navbar, Nav, Col, Container, Row } from 'react-bootstrap'
import { BookingFlow } from './components/BookingFlow'
import {DoctorManager} from "./components/DoctorManager";

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
            <DoctorManager />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;


