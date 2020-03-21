import React, { useState } from 'react'
import './BookingFlow.css'
import { Form as BForm, Button, Col, Container, Row } from 'react-bootstrap'
import Calendar from 'react-calendar'
import { Form, TextInput } from './form'
import { useStage, useSlotDate } from '../flows/book'

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

    const dayIdx = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]



    const content = slots.map((d, i) => {

        const demand = d.booked / d.capacity

        let bgColor
        if (demand <= 0.5) {
            bgColor = "rgb(0,195,27)"
        } else if (demand <= 0.8) {
            bgColor = "rgb(255,242,170)"
        } else {
            bgColor = "rgb(255,170,170)"
        }

        const contentStyle = {
            backgroundColor: bgColor,
            borderStyle: "solid",
            ...(d.selected ? {
                borderColor: "rgb(0,136,238)",
                borderRightWidth: "5px",
                borderTopWidth: "5px",
                borderBottomWidth: "5px",
                borderLeftWidth: "5px",
                paddingTop: "0px",
            } : {
                    borderColor: "black",
                    borderRightWidth: "1px",
                    borderTopWidth: "1px",
                    borderBottomWidth: "1px",
                    borderLeftWidth: i === 0 ? "1px" : "0",
                    paddingTop: "4px",

                }),

        }

        const headStyle = {
            display: d.selected ? "block" : "none"
        }

        return (
            <div key={d.value} className="short-day-pick-container">
                <div style={headStyle} className="short-day-pick-selected">
                    <h1>Ausgewählt</h1>
                </div>
                <div
                    onClick={() => { d.onClick() }}
                    className={"short-day-pick"}
                    style={contentStyle}
                >
                    <h1>{d.value.getDate()}.</h1>
                    {dayIdx[d.value.getDay()]}
                    <br />
                    <br />
                    <br />
                    <br />
                    <p>{d.booked}/{d.capacity}</p>
                    <p>Termine<br />vergeben</p>
                </div>
            </div>
        )
    })

    return (
        <div className="short-day-container">
            {content}
        </div>
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
    const [slotDate, setSlotDate] = useSlotDate()

    const shortSelection = [
        {
            name: "Heute",
            value: new Date('2020-03-21'),
            capacity: 50,
            booked: 45
        },
        {
            name: "So",
            value: new Date('2020-03-22'),
            capacity: 50,
            booked: 40
        },
        {
            name: "Mo",
            value: new Date('2020-03-23'),
            capacity: 50,
            booked: 5
        },
        {
            name: "Di",
            value: new Date('2020-03-24'),
            capacity: 50,
            booked: 0
        },
        {
            name: "Mi",
            value: new Date('2020-03-25'),
            capacity: 50,
            booked: 0
        },
    ]

    shortSelection.forEach(s => {
        s.selected = s.value?.getTime() === slotDate?.getTime()
        s.onClick = () => { setSlotDate(s.value) }
    })

    const [showCal, setShowCal] = useState(false)

    const cal = !showCal ? null : (
        <>
            <h6>oder clicking Sie auf ein Datum im Kalender</h6>
            <DatePicker />
        </>
    )

    return (
        <>
            <h1>Termin</h1>
            <h6>Wählen Sie einen Tag aus</h6>
            <SlotSelector slots={shortSelection} />

            <span onClick={() => { setShowCal(!showCal) }}>{showCal ? <>&#9660;</> : <>&#9654;</>}</span>weitere optionen

            {cal}

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

function CompletionDialog() {
    return (
        <>
            <h1>Done!</h1>
            <div className="text-right">
                <Button variant="primary">OK</Button>
            </div>
        </>
    )
}


export function BookingFlow() {
    const [stage, setStage] = useStage()


    let view
    switch (stage) {
        case "DAY_SELECTION":
            view = <DaySelectionDialog />
            break
        case "SLOT_SELECTION":
            view = <TimeSelectionDialog />
            break

        case "PATIENT_DATA":
            view = <PatientInformationForm />
            break
        case "SUMMARY":
            view = <BookingSummary />
            break
        case "COMPLETED":
            view = <CompletionDialog />
            break
    }

    return (
        <div className="border p-2 rounded">
            {view}
        </div>
    )
}