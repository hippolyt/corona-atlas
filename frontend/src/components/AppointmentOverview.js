import React, { useState } from 'react'
import { Form, Button, Col, Container, Row } from 'react-bootstrap'
import { PatientInformationForm } from './PatientInformationForm'
import { VerticallyCenteredModal } from './VerticallyCenteredModal'

export function AppointmentOverview() {

    return (
        <>
            <PatientIdentificationComponent></PatientIdentificationComponent>
            <Container>
                <TopRow />
                <div className="dropdown-divider mt-5 mb-5"></div>
                <MiddleRow />
                <div className="dropdown-divider mt-5 mb-5"></div>
                <BottomRow />
            </Container>
        </>
    )
}

function TopRow() {
    const exampleAppointment = { date: "27.03.20", time: "11:00 - 12:00", emergency: true }
    return (
        <Row className="mb-4 mt-3">
            <AppointmentInfoBox appointment={exampleAppointment}></AppointmentInfoBox>
            <TestStatus></TestStatus>
        </Row>
    )
}

function MiddleRow() {
    return (
        <Row className="mb-4 mt-3">
            <div className="col">
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
        <Row className="mb-4 mt-3">
            <ManualCommunication></ManualCommunication>
            <CommunicationHistory></CommunicationHistory>
        </Row>
    )
}

function PatientIdentificationComponent(props) {
    let Id = props.id ? props.id : "Welt-Karten-Verein"
    return (
        <div className="jumbotron jumbotron-fluid bg-light p-2">
            <div className="container">
                <h1 className="display-3">Patientenerkennungsphrase</h1>
                <h2 className="display-4 font-weight-bold text-info"> {Id} </h2>
            </div>
        </div>
    )
}

function AppointmentInfoBox(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Covid-19-Test {
                        <span className={"badge " + (props.appointment.emergency ? "badge-danger" : "badge-warning")}>{props.appointment.emergency ? "Notfallpatient" : "Patient"}</span>
                    }</h2>
                    <table className="table table-hover mt-4">
                        <tbody>
                            <tr>
                                <th scope="row">Datum</th>
                                <td>27.03.20</td>
                            </tr>
                            <tr>
                                <th scope="row">Uhrzeit</th>
                                <td>11:30</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={() => setModalShow(true)} type="button-primary" className="btn btn-primary btn-block btn-lg">Patient umbuchen</button>
                </div>
            </div>
            <VerticallyCenteredModal
                confirmButtonText="Patient umbuchen"
                text="Sind Sie sicher, dass Sie diesen Patienten umbuchen möchten?"
                title="Patient umbuchen"
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
        //alert("Call some API");

    }
    return (
        <div className="col">
            <div className={"card " + (tested ? "bg-success" : "bg-warning")}>
                <div className="card-body">
                    <h2 className="card-title">Teststatus: {tested ? "Test abgeschlossen" : "Test ausstehend"}</h2>
                    <button onClick={() => { setModalShow(true) }} type="button-primary" className="btn btn-primary btn-block btn-lg">Patient als {tested ? "nicht" : ""} getestet markieren</button>
                </div>
                <VerticallyCenteredModal
                    confirmButtonText="Ja"
                    text={"Sind Sie sicher, dass Sie diesen Patienten als " + (tested ? "nicht" : "") + " getestet markieren möchten?"}
                    title="Patient als getestet markieren"
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
        alert("Bald werden hier Notizen gespeichert")
    }
    return (
        <div className="col">
            <div className="border p-4 rounded">
                <h1>Notizen</h1>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows="12" />
                </Form.Group>
                <button onClick={() => setModalShow(true)} type="button-primary" className="btn btn-primary btn-block btn-lg">Notizen speichern</button>
                <VerticallyCenteredModal
                    confirmButtonText="Ja"
                    text={"Sind Sie sicher, dass Sie diese Notizen speichern möchten?"}
                    title="Notizen speichern."
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
        alert("Bald soll hier etwas passieren")
    }
    return (
        <div className="col">
            <h1>Manuelle Kommunikationsoptionen</h1>
            <Button onClick={() => setModalShow(true)} type="submit" className="btn-lg btn-block mb-3">Email-Reminder @ patientzero@gmail.com</Button>
            <Button onClick={() => setModalShow(true)} type="submit" className="btn-lg btn-block mb-3">Telefon-Reminder @ 123-456-789</Button>
            <VerticallyCenteredModal
                confirmButtonText="Ja"
                text={"Sind Sie sicher, dass Sie diese Aktion durchführen möchten?"}
                title="Aktion durchführen."
                callback={modalCallback}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

function CommunicationHistory() {
    return (
        <div className="col">
            <h1>Kommunikationshistorie</h1>

        </div>
    )
}