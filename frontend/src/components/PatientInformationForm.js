import React, { useState } from 'react'
import { Form as BForm, Button, Col, Container, Row, Check } from 'react-bootstrap'
import { Form, TextInput } from './form'

export function PatientInformationForm() {
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
            <h1 className="p-4">Patientendaten </h1>
            <Form className="p-4">
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
                <BForm.Check
                    type="switch"
                    id="mailConsent"
                    label="Einverständnis Emailkontakt"
                />
                <BForm.Check
                    type="switch"
                    id="telephoneConsent"
                    label="Einverständnis Telefonkontakt"
                />
                <div className="text-right btn-lg">
                    <Button variant="primary" type="submit">
                        Daten ändern
            </Button>
                </div>
            </Form >
        </>
    )
}