import React from 'react'
import './App.css'
import { Navbar, Nav, Col, Container, Row } from 'react-bootstrap'
import { BookingFlow } from './components/BookingFlow'
import { AppointmentOverview } from './components/AppointmentOverview'
import { DoctorManager } from "./components/DoctorManager";
import { useMe } from './flows/data'
import { LoginDialog } from './components/LoginDialog'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'

function LoginLogoutButton() {
  const me = useMe()

  const onLogout = () => {
    console.log("logout")
    window.location = '/auth/logout'
  }

  const onLogin = () => {
    window.location = '/'
  }

  if (me.loggedIn) {
    return <Nav.Link onClick={() => onLogout()}>Abmelden</Nav.Link>
  } else {
    return <Nav.Link onClick={() => onLogin()}>Anmelden</Nav.Link>
  }
}

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="#home">CoTip</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link></Nav.Link>
          </Nav>
          <Nav >
            <LoginLogoutButton />
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <Switch>
          <Route path="/booking">
            <BookingFlow />
          </Route>
          <Route path="/testcenter">
            <AppointmentOverview />
          </Route>
          <Route path="/">
            <LoginDialog />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;


