import React, { useState } from 'react'
import './BookingFlow.css'
import { Form as BForm, Button, Col, Container, Row } from 'react-bootstrap'
import Calendar from 'react-calendar'
import { Form, TextInput, SelectInput } from './form'
import { useStage, useSlotDate, useBookingState, useSlotId, usePreviousStage, usePatient, useBookAppointment, useIsLoading } from '../flows/book'
import { Option } from 'informed'
import { useSlot, useTestCenterAddress } from '../flows/data'

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

function ResetButton() {
    const [_state, _setState, reset] = useBookingState()

    return <Button onClick={() => reset()} className="mr-2" variant="secondary">Abbrechen</Button>
}

function PatientInformationForm() {
    const [patient, setPatient] = usePatient()
    const { next } = useStage()

    const years = new Array(100)
    for (let i = 0; i < 100; i++) {
        const y = 2020 - i
        years[i] = <Option key={y} value={y}>{y}</Option>
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
    ].map((m, i) => <option key={m} value={i}>{m}</option>)

    const days = new Array(31)
    for (let i = 0; i < 31; i++) {
        const d = i + 1
        days[i] = <option key={d} value={i + 1}>{d}</option>
    }

    const onSubmit = values => {
        const {
            name,
            givenName,
            email,
            birthYear,
            birthMonth,
            birthDay,
            mobileNumber,
            phoneNumber
        } = values

        const dateOfBirth = new Date(
            parseInt(birthYear),
            parseInt(birthMonth),
            parseInt(birthDay)
        )

        const patient = {
            givenName,
            name,
            email,
            birthDay: dateOfBirth,
            mobileNumber,
            phoneNumber,
        }

        setPatient(patient)
        next()
    }

    const p = {
        name: "Maier",
        givenName: "Lukas",
        email: "lukas@maier.de",
        birthDay: "1",
        birthMonth: "8",
        birthYear: "1962",
        mobileNumber: "+49 123 45687",
        phoneNumber: "+49 936 09465",
    }

    return (
        <>
            <h1>Patientendaten </h1>
            <Form initialValues={p} onSubmit={onSubmit}>
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
                    <BForm.Group as={Col} controlId="email">
                        <BForm.Label>Email</BForm.Label>
                        <TextInput field="email" />
                    </BForm.Group>
                </Row>
                <BForm.Group>
                    <BForm.Label>Geburtstag</BForm.Label>
                    <Row>
                        <Col>
                            <SelectInput as="select" placeholder="Year" field="birthYear">
                                <option value="" disabled>Jahr</option>
                                {years}
                            </SelectInput>
                        </Col>
                        <Col>
                            <SelectInput as="select" field="birthMonth" >
                                <option value="" disabled>Monat</option>
                                {months}
                            </SelectInput>
                        </Col>
                        <Col>
                            <SelectInput as="select" field="birthDay" >
                                <option value="" disabled>Tag</option>
                                {days}
                            </SelectInput>
                        </Col>
                    </Row>
                </BForm.Group>
                <Row>
                    <BForm.Group as={Col} controlId="givenName">
                        <BForm.Label>Handy</BForm.Label>
                        <TextInput field="mobileNumber" />
                    </BForm.Group>
                    <BForm.Group as={Col} controlId="name">
                        <BForm.Label>Festnetz</BForm.Label>
                        <TextInput field="phoneNumber" />
                    </BForm.Group>
                </Row>
                <div className="text-right">
                    <BackButton />
                    <Button type="submit" >Weiter</Button>
                    {/* <NextButton enabled={true} /> */}
                </div>
            </Form>
        </>
    )
}

function SlotSelector(props) {
    const { slots } = props

    const dayIdx = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
    let aSlotIsSelected = false
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

        if (d.selected) {
            aSlotIsSelected = true
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


    const containerStyle = {
        paddingTop: aSlotIsSelected ? "0" : "56px",
    }

    return (
        <div style={containerStyle} className="short-day-container">
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

function formatDateAsReadableDisplay(date) {
    const dayIdx = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
    const monthIdx = [
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
    ]

    return `${dayIdx[date.getDay()]} ${date.getDate()}. ${monthIdx[date.getMonth()]}`
}

function TimeSlot(props) {
    const { time, capacity, booked, selected, onSelect } = props

    const label = formatDateAsHourFace(time)

    const demand = booked / capacity

    let bgColor
    if (demand <= 0.5) {
        bgColor = "rgb(0,195,27)"
    } else if (demand <= 0.7) {
        bgColor = "rgb(255,242,170)"
    } else {
        bgColor = "rgb(255,170,170)"
    }

    const contentStyle = {
        backgroundColor: bgColor,
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
            capacity: 5,
            booked: 5,
        },
        {
            time: new Date("2020-03-22T09:00"),
            slotId: 2,
            capacity: 5,
            booked: 3,
        },
        {
            time: new Date("2020-03-22T10:00"),
            slotId: 3,
            capacity: 5,
            booked: 3,
        },
        {
            time: new Date("2020-03-22T11:00"),
            slotId: 4,
            capacity: 5,
            booked: 3,
        },
        {
            time: new Date("2020-03-22T12:00"),
            slotId: 5,
            capacity: 5,
            booked: 3,
        },
        {
            time: new Date("2020-03-22T13:00"),
            slotId: 6,
            capacity: 5,
            booked: 2,
        },
        {
            time: new Date("2020-03-22T14:00"),
            slotId: 7,
            capacity: 5,
            booked: 1,
        },
        {
            time: new Date("2020-03-22T15:00"),
            slotId: 8,
            capacity: 5,
            booked: 0,
        },
        {
            time: new Date("2020-03-22T16:00"),
            slotId: 9,
            capacity: 5,
            booked: 0,
        },
        {
            time: new Date("2020-03-22T17:00"),
            slotId: 10,
            capacity: 5,
            booked: 0,
        },
    ].map(s => ({
        ...s,
        selected: s.slotId === slotId
    }))

    return (
        <>
            <h1 className="mb-4">Zeitslot <u>{formatDateAsReadableDisplay(slotDate)}</u></h1>
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
    const [slotDate, setSlotDate] = useSlotDate()

    const shortSelection = [
        {
            name: "So",
            value: new Date('2020-03-22'),
            capacity: 50,
            booked: 45
        },
        {
            name: "Mo",
            value: new Date('2020-03-23'),
            capacity: 50,
            booked: 40
        },
        {
            name: "Di",
            value: new Date('2020-03-24'),
            capacity: 50,
            booked: 20
        },
        {
            name: "Mi",
            value: new Date('2020-03-25'),
            capacity: 50,
            booked: 0
        },
        {
            name: "Mi",
            value: new Date('2020-03-26'),
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

            {/* <span onClick={() => { setShowCal(!showCal) }}>{showCal ? <>&#9660;</> : <>&#9654;</>}</span>weitere optionen

            {cal} */}

            <div className="text-right">
                <BackButton />
                <NextButton enabled={slotDate !== null} />
            </div>
        </>
    )
}

function BookingSummary() {
    const [patient] = usePatient()
    const [slotId] = useSlotId()
    const [slot] = useSlot(slotId)

    const [book] = useBookAppointment()

    const dayIdx = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
    const monthIdx = [
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
    ]

    const t = slot.time
    const date = `${dayIdx[t.getDay()]} ${t.getDate()}. ${monthIdx[t.getMonth()]}`
    const clockTime = formatDateAsHourFace(t)

    return (
        <>
            <h1>Zusammenfassung</h1>
            <div className="mb-2 mt-4">
                <strong className="h4">Termin</strong> {/*<a href=""><small>ändern</small></a> */}
            </div>
            <dl className="row">
                <dt className="col-sm-3">Datum</dt>
                <dd className="col-sm-9">{date}</dd>

                <dt className="col-sm-3">Uhrzeit</dt>
                <dd className="col-sm-9">{clockTime}</dd>
            </dl>

            <div className="mb-2 mt-4">
                <strong className="h4">Patientendaten</strong>
            </div>
            <dl className="row">
                <dt className="col-sm-3">Name</dt>
                <dd className="col-sm-9">{patient.name}</dd>

                <dt className="col-sm-3">Vorname</dt>
                <dd className="col-sm-9">{patient.givenName}</dd>

                <dt className="col-sm-3">Email</dt>
                <dd className="col-sm-9">{patient.email}</dd>

                <dt className="col-sm-3">Handy</dt>
                <dd className="col-sm-9">{patient.mobileNumber}</dd>

                <dt className="col-sm-3">Festnetz</dt>
                <dd className="col-sm-9">{patient.phoneNumber}</dd>
            </dl>

            <div className="text-right">
                <ResetButton />
                <Button onClick={() => book()} variant="danger">Buchen</Button>
            </div>
        </>
    )
}

function BookingConfirmationDialog() {
    const [_state, _setState, reset] = useBookingState()
    const [patient] = usePatient()
    const [slotId] = useSlotId()
    const [slot] = useSlot(slotId)

    const addr = useTestCenterAddress()

    return (
        <center>

            <h1 className="mb-4">Buchung erfolgreich abgeschlossen</h1>

            <p className="font-weight-bold h4">{patient.givenName} {patient.name} </p>
            <p> wird am</p>
            <p className="font-weight-bold h4">{formatDateAsReadableDisplay(slot.time)}</p>
            <p>um</p>
            <p className="font-weight-bold h4">{formatDateAsHourFace(slot.time)}</p>
            <p>im Test-Center</p>
            <p className="font-weight-bold h4">{addr}</p>
            <p>auf SarsCovid-19 getested</p>

            <div className="mb-5 mt-5">
                <Button onClick={() => reset()} className="mr-2" variant="primary">Nächsten Patienten Buchen</Button>
            </div>
        </center>
    )
}

function BookingFailureDialog() {
    const [_state, _setState, reset] = useBookingState()

    return (
        <>
            <center>

                <h1>Das hat nicht funktioniert</h1>
                <p>Die IT wurde verständigt</p>
                <p className="mt-5 mb-4">Versuchen Sie es bitte erneut:</p>

                <div className="mb-5">
                    <Button onClick={() => reset()} className="mr-2" variant="primary">Ich gebe nicht auf</Button>
                </div>
            </center>
        </>
    )
}

export function LoadingScreen() {
    return (
        <center className="spinner-container">
            <div className="spinner"></div>
            <p className="mt-4">Wir arbeiten...</p>
        </center>
    )
}

export function BookingFlow() {
    const { stage } = useStage()
    const [isLoading] = useIsLoading()


    let view
    if (isLoading) {
        view = <LoadingScreen />
    } else {
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
                view = <BookingConfirmationDialog />
                break
        }
    }

    return (
        <div className="border p-2 rounded">
            {view}
            {/* <BookingConfirmationDialog /> */}
        </div>
    )
}