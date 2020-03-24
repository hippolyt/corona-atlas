import React, { useState } from "react";
import { Button, Col, Form as BForm, Row } from "react-bootstrap";
import { Form, TextInput } from "./form";
import { useDoctorList } from "../flows/admin";
import Table from "react-bootstrap/Table";
import { FaBan } from "react-icons/all";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

export function DoctorManager() {
    return (
        <Container>
            <div className="border p-4 rounded">
                <h1>Arzt hinzufügen</h1>
                <p>Neuen Arzt hinzufügen oder Zugriff von bereits hinzugefügten Ärzten entziehen.</p>
                <AddDoctor />
                <div className="dropdown-divider mt-3 mb-3 d-block d-md-none"></div>
                <FilterDoctor />
                <DoctorList />
            </div>
        </Container>

    )
}


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
                <BForm.Group controlId="email" className="col-md">
                    <TextInput field="email" placeholder="Email der Praxis oder des Arztes" />
                </BForm.Group>
                <BForm.Group className="col-md" controlId="office">
                    <TextInput field="office" placeholder="Name der Praxis oder des Arztes" />
                </BForm.Group>
                <BForm.Group className="col-md">
                    <Button type="submit" className="btn-block">Zugriff erteilen</Button>
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
                <BForm.Group className="col-md" controlId="search_term">
                    <TextInput field="search_term" placeholder="Nach Email oder Name suchen" />
                </BForm.Group>
                <BForm.Group className="col-md">
                    <Button type="submit" className="btn-block">Suchen</Button>
                </BForm.Group>
            </Row>
        </Form>
    )
}

function DoctorList() {

    const [, filteredDoctorList, , , removeDoctor] = useDoctorList();

    const renderTableData = () => {
        console.log(filteredDoctorList)
        return filteredDoctorList.map((doctor) => {
            const { email, office } = doctor;
            return (
                <tr key={email}>
                    <td>{email}</td>
                    <td>{office}</td>
                    <td><DeleteAction doctor={doctor} removeDoctor={removeDoctor} /></td>
                </tr>
            )
        })
    };

    if (filteredDoctorList && filteredDoctorList.length) {
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
    } else {
        return (
            <h1 className="display-5 mt-5 mb-3">Noch keine Ärzte eingetragen.</h1>
        )

    }

}

function DeleteAction(props) {
    const [show, setShow] = useState(false);

    const { doctor, removeDoctor } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteDoctor = () => {
        removeDoctor(doctor);
        setShow(false);
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                <FaBan />
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