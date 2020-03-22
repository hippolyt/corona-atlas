import React, {useState} from "react";
import {Button, Col, Form as BForm, Row} from "react-bootstrap";
import {Form, TextInput} from "./form";
import {useDoctorList} from "../flows/admin";
import Table from "react-bootstrap/Table";
import {FaBan} from "react-icons/all";
import Modal from "react-bootstrap/Modal";

function AddDoctor() {

    const [, , , addDoctor,] = useDoctorList();

    const onSubmit = values => {
        const {
            email,
            office,
        } = values;

        const doctor = {
            email,
            office,
        };

        addDoctor(doctor);
    };

    return (
        <Form onSubmit={onSubmit}>
            <Row>
                <BForm.Group as={Col} controlId="email">
                    <BForm.Label>Email</BForm.Label>
                    <TextInput field="email"/>
                </BForm.Group>
                <BForm.Group as={Col} controlId="office">
                    <BForm.Label>Praxis</BForm.Label>
                    <TextInput field="office"/>
                </BForm.Group>
                <BForm.Group>
                    <BForm.Label></BForm.Label>
                    <div>
                        <Button type="submit">Zugriff erteilen</Button>
                    </div>
                </BForm.Group>

            </Row>
        </Form>
    )
}

function FilterDoctor() {

    const [, , , , , setSearchTerm] = useDoctorList();

    const onSubmit = values => {

        const {
            search_term
        } = values;

        setSearchTerm(search_term);

    };

    return (
        <Form onSubmit={onSubmit}>
            <Row>
                <BForm.Group as={Col} controlId="search_term">
                    <BForm.Label>Suche</BForm.Label>
                    <TextInput field="search_term"/>
                </BForm.Group>
                <BForm.Group>
                    <BForm.Label></BForm.Label>
                    <div>
                        <Button type="submit">Suchen</Button>
                    </div>
                </BForm.Group>
            </Row>
        </Form>
    )
}

function DoctorList() {

    const [, filteredDoctorList, , , removeDoctor] = useDoctorList();

    const renderTableData = () => {
        return filteredDoctorList.map((doctor) => {
            const {email, office} = doctor;
            return (
                <tr key={email}>
                    <td>{email}</td>
                    <td>{office}</td>
                    <td><DeleteAction doctor={doctor} removeDoctor={removeDoctor}/></td>
                </tr>
            )
        })
    };

    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>Email</th>
                <th>Praxis</th>
                <th>Aktionen</th>
            </tr>
            </thead>
            <tbody>
            {renderTableData()}
            </tbody>
        </Table>
    )
}

function DeleteAction(props) {
    const [show, setShow] = useState(false);

    const {doctor, removeDoctor} = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteDoctor = () => {
        removeDoctor(doctor);
        setShow(false);
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                <FaBan/>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Zugriff entziehen</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sind Sie sicher, dass Sie <b>{doctor.email} ({doctor.office})</b> den Zugriff entziehen
                    wollen?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Abbrechen
                    </Button>
                    <Button variant="primary" onClick={deleteDoctor}>
                        Ja, Zugriff entziehen
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export function DoctorManager() {
    return (
        <div className="border p-2 rounded">
            <h1>Arzt hinzufügen</h1>
            <p>Neuen Arzt hinzufügen oder Zugriff von bereits hinzugefügten Ärzten entziehen.</p>
            <AddDoctor/>
            <FilterDoctor/>
            <DoctorList/>
        </div>
    )
}