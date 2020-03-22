import React, { useState } from 'react'
import './BookingFlow.css'
import { Form as BForm, Button, Col, Container, Row } from 'react-bootstrap'
import Calendar from 'react-calendar'
import { Form, TextInput } from './form'
import { useStage, useSlotDate, useBookingState, useSlotId, usePreviousStage } from '../flows/book'

function BackButton() {
    const { canGoBack, back } = useStage()

    if (!canGoBack) {
        return <></>
    }

    return (
        <Button onClick={() => back()} className="mr-2" variant="warning">
            Zurück
        </Button>
    )
}

function NextButton(props) {
    const { enabled } = props
    const { next } = useStage()

    return (
        <Button disabled={!enabled} variant="primary" onClick={() => next()}>
            Weiter
        </Button>
    )
}

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
            <BForm>
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
                    <NextButton enabled={true} />
                </div>
            </BForm >
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

function formatDateAsHourFace(date) {
    let res = ""

    const hours = date.getHours()
    const min = date.getMinutes()

    if (hours < 10) {
        res = res + "0"
    }
    res = res + hours + ":"

    if (min < 10) {
        res = res + "0"
    }
    res = res + min

    return res + " h"
}

function TimeSlot(props) {
    const { time, capacity, booked, selected, onSelect } = props

    const label = formatDateAsHourFace(time)

    const contentStyle = {
        borderStyle: "solid",
        ...(selected ? {
            borderColor: "rgb(0,136,238)",
            borderWidth: "5px",
            marginLeft: "0",
            padding: "0"
        } : {
                borderColor: "black",
                borderColor: "black",
                borderWidth: "1px",
                marginLeft: "60px",
                padding: "4px 0 0 4px"
            }),
    }

    const selectorStyle = {
        display: selected ? "inline-block" : "none"
    }

    return (
        <div className="tslot-container">
            <div style={selectorStyle} className="tslot-selector">
                <h1>&#10003;</h1>
            </div>
            <div style={contentStyle} onClick={() => onSelect()} className="tslot-content">
                <h1>{label}</h1>
                <p className="tslot-stats">{booked}/{capacity}</p>
                <p className="tslot-label">Termine<br />vergeben</p>
            </div>
        </div>
    )
}

function TimeSelectionDialog() {
    const [slotId, setSlotId] = useSlotId()

    const [slotDate] = useSlotDate()

    const timeSlots = [
        {
            time: new Date("2020-03-22T08:00"),
            slotId: 1,
            capacity: 10,
            booked: 2,
        },
        {
            time: new Date("2020-03-22T09:00"),
            slotId: 2,
            capacity: 10,
            booked: 2,
        },
        {
            time: new Date("2020-03-22T10:00"),
            slotId: 3,
            capacity: 10,
            booked: 2,
        },
        {
            time: new Date("2020-03-22T11:00"),
            slotId: 4,
            capacity: 10,
            booked: 2,
        },
        {
            time: new Date("2020-03-22T12:00"),
            slotId: 5,
            capacity: 10,
            booked: 2,
        },
        {
            time: new Date("2020-03-22T13:00"),
            slotId: 6,
            capacity: 10,
            booked: 2,
        },
        {
            time: new Date("2020-03-22T14:00"),
            slotId: 7,
            capacity: 10,
            booked: 2,
        },
        {
            time: new Date("2020-03-22T15:00"),
            slotId: 8,
            capacity: 10,
            booked: 2,
        },
        {
            time: new Date("2020-03-22T16:00"),
            slotId: 9,
            capacity: 10,
            booked: 2,
        },
        {
            time: new Date("2020-03-22T17:00"),
            slotId: 10,
            capacity: 10,
            booked: 2,
        },
        {
            time: new Date("2020-03-22T18:00"),
            slotId: 11,
            capacity: 10,
            booked: 2,
        },
    ].map(s => ({
        ...s,
        selected: s.slotId === slotId
    }))

    return (
        <>
            <h1>Zeitslot</h1>
            <p>{slotDate.toString()}</p>
            <ul className="time-pick">
                {timeSlots.map((d, i) => (
                    <TimeSlot key={d.slotId} selected={d.selected} onSelect={() => setSlotId(d.slotId)} time={d.time} capacity={d.capacity} booked={d.booked} />
                ))}
            </ul>
            <div className="text-right">
                <BackButton />
                <NextButton enabled={slotId !== null} />
            </div>
        </>
    )
}

function DaySelectionDialog(props) {
    const { next } = useStage()

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
                <BackButton />
                <NextButton enabled={slotDate !== null} />
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
    const { stage } = useStage()

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