import React from 'react'
import { Option } from 'informed'
import { Button, Col, Form as BForm, Row } from 'react-bootstrap'

import { Form, SelectInput, TextInput } from '../form'
import { useStage, usePatient } from '../../flows/book'
import { BackButton } from './navigation'


export function PatientInformationForm() {
    const [patient, setPatient] = usePatient()
    const { next } = useStage()

    const years = new Array(100)
    for (let i = 0; i < 100; i++) {
        const y = 2020 - i
        years[i] = <Option key={y} value={y}>{y}</Option>
    }

    const months = [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'July',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
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
            mobileNumber,
            phoneNumber,
            street,
            streetNumber,
            city,
            zipCode
        } = values


        const patient = {
            givenName,
            name,
            email,
            mobileNumber,
            phoneNumber,
            street,
            streetNumber,
            city,
            zipCode
        }

        setPatient(patient)
        next()
    }

    return (
        <>
            <h1>Patientendaten </h1>
            <Form initialValues={patient} onSubmit={onSubmit}>
                <Row>
                    <BForm.Group className="col-sm" controlId="name">
                        <BForm.Label>Name</BForm.Label>
                        <TextInput field='name' />
                    </BForm.Group>
                    <BForm.Group className="col-sm" controlId="givenName">
                        <BForm.Label>Vorname</BForm.Label>
                        <TextInput field='givenName' />
                    </BForm.Group>
                </Row>
                <Row>
                    <BForm.Group as={Col} controlId='email'>
                        <BForm.Label>Email</BForm.Label>
                        <TextInput field='email' />
                    </BForm.Group>
                </Row>
                <BForm.Group>
                    <BForm.Label>Adresse</BForm.Label>
                    <Row>
                        <Col sm>
                            <TextInput placeholder="Straße" field="street" />
                        </Col>
                        <Col sm>
                            <TextInput placeholder="Hausnummer" field="streetNumber" />
                        </Col>
                    </Row>
                </BForm.Group>
                <BForm.Group>
                    <Row>
                        <Col sm>
                            <TextInput placeholder="Stadt" field="city" />
                        </Col>
                        <Col sm>
                            <TextInput placeholder="PLZ" field="zipCode" />
                        </Col>
                    </Row>
                </BForm.Group>
                <Row>
                    <BForm.Group className="col-sm" controlId="givenName">
                        <BForm.Label>Handy</BForm.Label>
                        <TextInput field='mobileNumber' />
                    </BForm.Group>
                    <BForm.Group className="col-sm" controlId="name">
                        <BForm.Label>Festnetz</BForm.Label>
                        <TextInput field='phoneNumber' />
                    </BForm.Group>
                </Row>
                <div className='text-right'>
                    <BackButton />
                    <Button type='submit'>Weiter</Button>
                    {/* <NextButton enabled={true} /> */}
                </div>
            </Form>
        </>
    )
}
