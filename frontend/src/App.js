import React from 'react'
import './App.css'
import { Navbar, Nav, NavDropdown, FormControl, Form as BForm, Button, Col, Container, Row } from 'react-bootstrap'
import Calendar from 'react-calendar'
import Slider from 'react-slick'
import { useForm } from 'informed'
import { Form, TextInput } from './components/form'

function PatientInformationForm() {
  const years = new Array(100)
  for (let i = 0; i < 100; i++) {
    const y = 2020 - i
    years[i] = <option key={y} value={y}>{y}</option>
  }

  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "July",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ].map(m => <option key={m} value={m}>{m}</option>)

  const days = new Array(31)
  for (let i = 0; i < 31; i++) {
    const d = i + 1
    days[i] = <option key={d} value={d}>{d}</option>
  }

  return (
    <>
      <h1>Patientendaten </h1>
      <Form>
        <Row>
          <BForm.Group as={Col} controlId="name">
            <BForm.Label>Name</BForm.Label>
            <TextInput field="name" />
          </BForm.Group>
          <BForm.Group as={Col} controlId="givenName">
            <BForm.Label>Vorname</BForm.Label>
            <TextInput field="givenName" />
          </BForm.Group>
        </Row>
        <Row>
          <BForm.Group as={Col} controlId="givenName">
            <BForm.Label>Email</BForm.Label>
            <TextInput field="givenName" />
          </BForm.Group>
        </Row>
        <BForm.Group>
          <BForm.Label>Geburtstag</BForm.Label>
          <Row>
            <Col>
              <BForm.Control defaultValue="" as="select" placeholder="Year" field="birthDay">
                <option value="" disabled>Jahr</option>
                {years}
              </BForm.Control>
            </Col>
            <Col>
              <BForm.Control defaultValue="" as="select" field="birthMonth" >
                <option value="" disabled>Monat</option>
                {months}
              </BForm.Control>
            </Col>
            <Col>
              <BForm.Control defaultValue="" as="select" field="birthMonth" >
                <option value="" disabled>Tag</option>
                {days}
              </BForm.Control>
            </Col>
          </Row>
        </BForm.Group>
        <Row>
          <BForm.Group as={Col} controlId="givenName">
            <BForm.Label>Handy</BForm.Label>
            <TextInput field="givenName" />
          </BForm.Group>
          <BForm.Group as={Col} controlId="name">
            <BForm.Label>Festnetz</BForm.Label>
            <TextInput field="name" />
          </BForm.Group>
        </Row>
        <div className="text-right">
          <Button variant="primary" type="submit">
            Weiter
          </Button>
        </div>
      </Form >
    </>
  )
}

function SlotSelector(props) {
  const { slots } = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <Slider {...settings}>
      {slots.map((d, i) => (
        <div key={d.name} className={"short-day-pick " + (d.selected ? "short-day-pick-selected" : "")} style={i === 0 ? { "borderLeft": "solid 1px" } : {}}>{d.name}</div>
      ))}
    </Slider>
  )
}

function DatePicker() {
  return (
    <div className="m-auto calendar-container">
      <Calendar />
    </div>
  )
}

function TimeSelectionDialog() {
  const timeSlots = [
    {
      name: "08 - 09"
    },
    {
      name: "09 - 10"
    },
    {
      name: "10 - 11"
    },
    {
      name: "11 - 12"
    },
    {
      name: "12 - 13"
    },
    {
      name: "13 - 14"
    },
    {
      name: "14 - 15"
    },
    {
      name: "16 - 17"
    },
    {
      name: "17 - 18"
    },
    {
      name: "18 - 19"
    },
    {
      name: "19 - 20"
    },
  ]

  return (
    <>
      <h1>Zeitslot</h1>
      <ul className="time-pick">
        {timeSlots.map((d, i) => (
          <li key={d.name} className={"short-day-pick-v " + (d.selected ? "short-day-pick-selected" : "")} style={i === 0 ? { "borderLeft": "solid 1px" } : {}}>{d.name}</li>
        ))}
      </ul>
      <div className="text-right">
        <Button variant="primary" type="submit">
          Weiter
          </Button>
      </div>
    </>
  )
}

function DaySelectionDialog() {
  const calDates = [1, 2, 3, 4]

  const shortSelection = [
    {
      name: "Heute",
      selected: true
    },
    {
      name: "So",
    },
    {
      name: "Mo",
    },
    {
      name: "Di",
    },
    {
      name: "Mi",
    },
  ]

  return (
    <>
      <h1>Termin</h1>
      <h6>Wählen Sie einen Tag aus</h6>
      <SlotSelector slots={shortSelection} />

      <h6>oder clicking Sie auf ein Datum im Kalender</h6>
      <DatePicker />
      <div className="text-right">
        <Button variant="primary" type="submit">
          Weiter
          </Button>
      </div>
    </>
  )
}

function BookingSummary() {
  return (
    <>
      <h1>Zusammenfassung</h1>
      <div className="mb-2 mt-4">
        <strong className="h4">Termin</strong> <a href=""><small>ändern</small></a>
      </div>
      <dl className="row">
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9">Doe</dd>

        <dt className="col-sm-3">Vorname</dt>
        <dd className="col-sm-9">John</dd>

        <dt className="col-sm-3">Email</dt>
        <dd className="col-sm-9">john@doe.com</dd>

        <dt className="col-sm-3">Handy</dt>
        <dd className="col-sm-9">01736454</dd>

        <dt className="col-sm-3">Festnetz</dt>
        <dd className="col-sm-9">09117463926</dd>
      </dl>

      <div className="mb-2 mt-4">
        <strong className="h4">Patientendaten</strong> <a href=""><small>ändern</small></a>
      </div>
      <dl className="row">
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9">Doe</dd>

        <dt className="col-sm-3">Vorname</dt>
        <dd className="col-sm-9">John</dd>

        <dt className="col-sm-3">Email</dt>
        <dd className="col-sm-9">john@doe.com</dd>

        <dt className="col-sm-3">Handy</dt>
        <dd className="col-sm-9">01736454</dd>

        <dt className="col-sm-3">Festnetz</dt>
        <dd className="col-sm-9">09117463926</dd>
      </dl>


      <div className="text-right">
        <Button className="mr-2" variant="secondary">Abbrechen</Button>
        <Button variant="danger">Buchen</Button>
      </div>
    </>
  )
}

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
            <div className="border p-2 rounded">
              <DaySelectionDialog />
              {/* <TimeSelectionDialog /> */}
              {/* <PatientInformationForm /> */}
              {/* <BookingSummary /> */}
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="mt-4">
            <div className="border p-2 rounded">
              {/* <DaySelectionDialog /> */}
              <TimeSelectionDialog />
              {/* <PatientInformationForm /> */}
              {/* <BookingSummary /> */}
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="mt-4">
            <div className="border p-2 rounded">
              {/* <DaySelectionDialog /> */}
              {/* <TimeSelectionDialog /> */}
              <PatientInformationForm />
              {/* <BookingSummary /> */}
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="mt-4">
            <div className="border p-2 rounded">
              {/* <DaySelectionDialog /> */}
              {/* <TimeSelectionDialog /> */}
              {/* <PatientInformationForm /> */}
              <BookingSummary />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;


