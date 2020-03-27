import React from 'react'
import { Button, ListGroup, Container, Row } from 'react-bootstrap'

export function Dashboard() {
    return (
        <>
            <JumboHeader />
            <Container>
                <TopRow />
                <div className='dropdown-divider mt-5 mb-5'></div>
                <BottomRow />
            </Container>
        </>
    )
}

function JumboHeader(props) {
    return (
        <div className='jumbotron jumbotron-fluid bg-light p-2'>
            <div className='container'>
                <h1 className='display-4'>Dashboard @ Teststation Aachen</h1>
                <h2 className='display-5 font-weight-bold text-info'> Corona Testing Information and Planning Plattform </h2>
            </div>
        </div>
    )
}

function TopRow() {
    return (
        <Row>
            <div className='col-sm-6'>
                <h2 className='mb-3'>Verwaltungsfunktionen</h2>
                <div className='form-group has-search input-group-lg'>
                    <span className='fa fa-search form-control-feedback'></span>
                    <input type='text' className='form-control' placeholder='Termin Suche (nach Name oder nach Id)' />
                    <Button type='submit' className='btn-lg btn-block mt-2'>Suchen</Button>
                </div>
                <p className='text-center'>oder</p>
                <Button type='submit' className='btn-lg btn-block mt-2'>Terminkalender einsehen</Button>
                <Button type='submit' className='btn-lg btn-block mt-2'>Arztzugriffe verwalten</Button>
            </div>
            <UpcomingAppointments />
        </Row>
    )
}

function UpcomingAppointments() {
    var dummyData = [
        { id: 1, timeStamp: '09.09.2020; 18:30:23', name: { firstName: 'Mark', lastName: 'Twain' }, emergency: true },
        { id: 2, timeStamp: '09.09.2020; 14:34:32', name: { firstName: 'Nils', lastName: 'Wesling' }, emergency: false },
        { id: 3, timeStamp: '09.09.2020; 12:54:43', name: { firstName: 'Artur', lastName: 'Roger' }, emergency: true },
        { id: 4, timeStamp: '09.09.2020; 11:45:33', name: { firstName: 'Romano', lastName: 'Terrepretchet' }, emergency: false },
        { id: 5, timeStamp: '09.09.2020; 18:23:12', name: { firstName: 'The', lastName: 'Witcher' }, emergency: false }
    ]
    var items = []

    for (const [index, value] of dummyData.entries()) {
        items.push(<Appointment timeStamp={value.timeStamp} name={value.name} emergency={value.emergency} key={index}></Appointment>)
    }
    return (
        <div className='col mb-3'>
            <h2 className='mb-3'>Übersicht anstehender Termine</h2>
            <ListGroup className='mb-2'>
                {items}
            </ListGroup >

        </div>
    )
}

function Appointment(props) {
    return (
        <ListGroup.Item className='list-group-item-action btn'>
            <b>{`${props.timeStamp}: `}</b>
            {`${props.name.lastName}, ${props.name.firstName}`}
            <span className={`badge badge-pill ${(props.emergency ? 'badge-danger' : 'badge-warning')} float-right`}>{props.emergency ? 'Notfallpatient' : 'Patient'}</span>
        </ListGroup.Item>
    )
}

function BottomRow() {
    return (
        <Container className="mb-5">
        </Container>
    )
}