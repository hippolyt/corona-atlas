import React from 'react'
import './App.css'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { BookingFlow } from './components/booking/BookingFlow'
import { TimeWindowDialog } from './components/TimeWindowDialog'
import { AppointmentOverview } from './components/AppointmentOverview'
import { DoctorManager } from "./components/DoctorManager";
import { Dashboard } from "./components/Dashboard"
import { SimpleDashboard } from "./components/demo/SimpleDashboard"
import { useMe } from './flows/data'
import { LoginDialog } from './components/LoginDialog'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Footer } from './components/Footer'
import { DemoRootPage } from './components/demo/DemoRootPage'
import { DemoPage } from './components/demo/DemoPage'

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
      <Navbar className="navbar navbar-dark bg-dark" style={{ height: "5vh" }}>
        <Link to="/"><Navbar.Brand >CoTip</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link></Nav.Link>
          </Nav>
          
        <Link to="/demo"><Navbar.Brand >Zur Demo</Navbar.Brand>

        </Link>

          <Nav >
            <LoginLogoutButton />
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className="p-0" style={{ minHeight: "75vh" }}>
        <Switch>
          <Route path='/booking'>
            <BookingFlow />
          </Route>
          <Route path='/appointmentoverview'>
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
          <Route path="/simpledashboard">
            <SimpleDashboard></SimpleDashboard>
          </Route>
          <Route path="/demo-arzt">
            <DemoPage type="arzt" />
          </Route>
          <Route path="/demo-gesundheitsamt">
            <DemoPage type="gesundheitsamt" />
          </Route>
          <Route path="/demo-teststation">
            <DemoPage type="teststation" />
          </Route>
          <Route path="/demo-patient">
            <DemoPage type="patient" />
          </Route>
          <Route path="/demo">
            <DemoRootPage />
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


