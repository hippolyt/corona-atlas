import React, { useState } from 'react'
import { Form, Button, Card, Container, Row } from 'react-bootstrap'
import { PatientInformationForm } from './PatientInformationForm'
import { VerticallyCenteredModal } from './VerticallyCenteredModal'

export function AppointmentOverview() {

    return (
        <>
            <PatientIdentificationComponent></PatientIdentificationComponent>
            <Container>
                <TopRow />
                <div className='dropdown-divider mt-5 mb-5'></div>
                <MiddleRow />
                <div className='dropdown-divider mt-5 mb-5'></div>
                <BottomRow />
            </Container>
        </>
    )
}

function TopRow() {
    const exampleAppointment = { date: '27.03.20', time: '11:00 - 12:00', emergency: true }
    return (
        <Row className='mb-4 mt-3'>
            <AppointmentInfoBox appointment={exampleAppointment}></AppointmentInfoBox>
            <TestStatus></TestStatus>
        </Row>
    )
}

function MiddleRow() {
    return (
        <Row className="mb-4 mt-3">
            <div className="col mb-3">
                <div className="border rounded">
                    <PatientInformationForm></PatientInformationForm>
                </div>
            </div>
            <NotesComponent></NotesComponent>
        </Row>
    )
}

function BottomRow() {
    return (
        <Row className='mb-4 mt-3'>
            <CommunicationHistory></CommunicationHistory>
            <ManualCommunication></ManualCommunication>
        </Row>
    )
}

function PatientIdentificationComponent(props) {
    let Id = props.id ? props.id : 'Welt-Karten-Verein'
    return (
        <div className="jumbotron jumbotron-fluid bg-light p-2">
            <div className="container">
                <h1 className="display-4">Patienten-Id</h1>
                <h2 className="display-5 font-weight-bold text-info"> {Id} </h2>
            </div>
        </div>
    )
}

function AppointmentInfoBox(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className="col mb-3">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Covid-19-Test {
                        <span className={"badge " + (props.appointment.emergency ? "badge-danger" : "badge-warning")}>{props.appointment.emergency ? "Notfallpatient" : "Patient"}</span>
                    }</h2>
                    <table className='table table-hover mt-4'>
                        <tbody>
                            <tr>
                                <th scope='row'>Datum</th>
                                <td>27.03.20</td>
                            </tr>
                            <tr>
                                <th scope='row'>Uhrzeit</th>
                                <td>11:30</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={() => setModalShow(true)} type='button-primary' className='btn btn-primary btn-block btn-lg'>Patient umbuchen</button>
                </div>
            </div>
            <VerticallyCenteredModal
                confirmButtonText='Patient umbuchen'
                text='Sind Sie sicher, dass Sie diesen Patienten umbuchen möchten?'
                title='Patient umbuchen'
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

function TestStatus(props) {
    // const initialState = props.initialState;
    const [modalShow, setModalShow] = useState(false);
    const [tested, setTested] = useState(false);
    var modalCallback = () => {
        tested ? setTested(false) : setTested(true);
        //alert('Call some API');

    }
    return (
        <div className='col'>
            <div className={'card ' + (tested ? 'bg-success' : 'bg-warning')}>
                <div className='card-body'>
                    <h2 className='card-title'>Teststatus: {tested ? 'Test abgeschlossen' : 'Test ausstehend'}</h2>
                    <button onClick={() => { setModalShow(true) }} type='button-primary' className='btn btn-primary btn-block btn-lg'>Patient als {tested ? 'nicht' : ''} getestet markieren</button>
                </div>
                <VerticallyCenteredModal
                    confirmButtonText='Ja'
                    text={'Sind Sie sicher, dass Sie diesen Patienten als ' + (tested ? 'nicht' : '') + ' getestet markieren möchten?'}
                    title='Patient als getestet markieren'
                    callback={modalCallback}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </div>
    )
}

function NotesComponent() {
    const [modalShow, setModalShow] = useState(false);

    var modalCallback = () => {
        alert('Bald werden hier Notizen gespeichert')
    }
    return (
        <div className='col'>
            <div className='border p-4 rounded'>
                <h1>Notizen</h1>
                <Form.Group controlId='exampleForm.ControlTextarea1'>
                    <Form.Control as='textarea' rows='12' />
                </Form.Group>
                <button onClick={() => setModalShow(true)} type='button-primary' className='btn btn-primary btn-block btn-lg'>Notizen speichern</button>
                <VerticallyCenteredModal
                    confirmButtonText='Ja'
                    text={'Sind Sie sicher, dass Sie diese Notizen speichern möchten?'}
                    title='Notizen speichern.'
                    callback={modalCallback}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </div>
    )
}


function ManualCommunication() {
    const [modalShow, setModalShow] = useState(false);
    var modalCallback = () => {
        alert('Bald soll hier etwas passieren')
    }
    return (
        <div className='col mb-3'>
            <h1 className='mb-3'>Patient jetzt kontaktieren</h1>
            <Button onClick={() => setModalShow(true)} type='submit' className='btn-lg btn-block mb-3'>Email-Reminder @ patientzero@gmail.com</Button>
            <Button onClick={() => setModalShow(true)} type='submit' className='btn-lg btn-block mb-3'>Telefon-Reminder @ 123-456-789</Button>
            <VerticallyCenteredModal
                confirmButtonText='Ja'
                text={'Sind Sie sicher, dass Sie diese Aktion durchführen möchten?'}
                title='Aktion durchführen.'
                callback={modalCallback}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

function CommunicationHistory(props) {
    var dummyData = [
        { 'id': 1, 'timestamp': '09.09.2020; 18:30:23', 'comm_type': 'Email' },
        { 'id': 2, 'timestamp': '09.09.2020; 14:34:32', 'comm_type': 'Robo' },
        { 'id': 3, 'timestamp': '09.09.2020; 12:54:43', 'comm_type': 'Email' }
    ]
    var items = []

    for (const [index, value] of dummyData.entries()) {
        items.push(
            <Card key={index} className='mb-3'>
                <Card.Header as='h5'>{value.comm_type + '-Reminder'}</Card.Header>
                <Card.Body>
                    <Card.Title>Gesendet um: {value.timestamp}</Card.Title>
                    <Card.Text>
                        Dieser Patient ist benachrichtigt worden per: <b>{value.comm_type}</b>.
                </Card.Text>
                </Card.Body>
            </Card>)
    }
    return (
        <div className="col mb-3">
            <h1 className="mb-3">Kommunikations-Historie</h1>
            {items}
        </div>
    )
}