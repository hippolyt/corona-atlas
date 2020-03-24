import React from 'react'
import './App.css'
import { Navbar, Nav, Col, Container, Row } from 'react-bootstrap'
import { BookingFlow, TimeWindowDialog } from './components/BookingFlow'
import { AppointmentOverview } from './components/AppointmentOverview'
import { DoctorManager } from "./components/DoctorManager";
import { Dashboard } from "./components/Dashboard"
import { useMe } from './flows/data'
import { LoginDialog } from './components/LoginDialog'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import { Footer } from './components/Footer'

function LoginLogoutButton() {
  const me = useMe()

  const onLogout = () => {
    console.log('logout')
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

function TimeWindowPage() {
  return (
    <div className='border p-2 rounded'>
      <TimeWindowDialog />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="md" style={{ minHeight: "5vh" }}>
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

      <Container fluid className="p-0" style={{ minHeight: "80vh" }}>
        <Switch>
          <Route path='/booking'>
            <BookingFlow />
          </Route>
          <Route path='/testcenter'>
            <AppointmentOverview />
          </Route>
          <Route path='/cases'>
            <TimeWindowPage />
          </Route>
          <Route path="/managedoctors">
            <DoctorManager />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <LoginDialog />
          </Route>
        </Switch>
      </Container>
      <Footer></Footer>
    </Router>
  );
}

export default App;


