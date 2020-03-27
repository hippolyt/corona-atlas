import React, { useState } from 'react';
import { Button, Form as BForm, Row } from 'react-bootstrap';
import { Form, TextInput } from './form';
import { useDoctorList } from '../flows/admin';
import Table from 'react-bootstrap/Table';
import { FaBan } from 'react-icons/all';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

export function DoctorManager() {
    return (
        <Container>
            <div className='border mt-4 p-4 rounded'>
                <h1>Arzt hinzufügen</h1>
                <p>Neuen Arzt hinzufügen oder Zugriff von bereits hinzugefügten Ärzten entziehen.</p>
                <AddDoctor />
                <div className="dropdown-divider mt-3 mb-3 d-block d-md-none"></div>
                <FilterDoctor />
                <Spinner />
                <DoctorList />
            </div>
        </Container>
    )
}

function Spinner() {
    const { loading } = useDoctorList()

    return loading ? <p>Lädt...</p> : (<></>)
}

function AddDoctor() {

    const { addDoctor } = useDoctorList();

    const onSubmit = values => {
        const {
            email,
            name,
        } = values;

        const doctor = {
            email,
            name,
        };

        addDoctor(doctor);
    };

    return (
        <Form onSubmit={onSubmit}>
            <Row>
                <BForm.Group controlId="email" className="col-md">
                    <TextInput field="email" placeholder="Email der Praxis oder des Arztes" />
                </BForm.Group>
                <BForm.Group className="col-md" controlId="name">
                    <TextInput field="name" placeholder="Name der Praxis oder des Arztes" />
                </BForm.Group>
                <BForm.Group className="col-md">
                    <Button type="submit" className="btn-block">Zugriff erteilen</Button>
                </BForm.Group>

            </Row>
        </Form>
    )
}

function FilterDoctor() {

    const { setSearchTerm } = useDoctorList();

    const onChangeSearch = search_term => {
        setSearchTerm(search_term);
    };

    return (
        <BForm>
            <Row>
                <BForm.Group className="col-md" controlId="search_term">
                    <BForm.Control onChange={(e) => { onChangeSearch(e.target.value) }} field="search_term" placeholder="Nach Email oder Name suchen" />
                </BForm.Group>
            </Row>
        </BForm>
    )
}

function DoctorList() {

    const { filteredDoctorList, removeDoctor, loading } = useDoctorList();

    const renderTableData = () => {
        return filteredDoctorList.map((doctor) => {
            const { email, name } = doctor;
            return (
                <tr key={email}>
                    <td>{email}</td>
                    <td>{name}</td>
                    <td><DeleteAction doctor={doctor} removeDoctor={removeDoctor} /></td>
                </tr>
            )
        })
    };

    if (filteredDoctorList && filteredDoctorList.length) {
        return (
            <Table striped bordered hover size='sm'>
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
    } else if (!loading) {
        return (
            <h1 className='display-5 mt-5 mb-3'>Noch keine Ärzte eingetragen.</h1>
        )

    } else {
        return <></>
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
            <Button variant='danger' onClick={handleShow}>
                <FaBan />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Zugriff entziehen</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sind Sie sicher, dass Sie <b>{doctor.email} ({doctor.office})</b> den Zugriff entziehen
                    wollen?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Abbrechen
                    </Button>
                    <Button variant='primary' onClick={deleteDoctor}>
                        Ja, Zugriff entziehen
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}