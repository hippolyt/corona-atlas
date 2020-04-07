import React from 'react'
import { OverlayTrigger, Tooltip, ListGroup, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { VerticallyCenteredModal } from '../VerticallyCenteredModal'

export function SimpleDashboard() {
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
                <h1 className='display-4'>cotip @ Teststation Aachen</h1>
                <h2 className='display-5 font-weight-bold text-info'> Corona Testing Information and Planning Plattform </h2>
            </div>
        </div>
    )
}

function TopRow() {
    return (
        <Row>
            <UpcomingAppointments />
        </Row>
    )
}

function UpcomingAppointments() {
    var dummyData = [
        { id: 1, timeStamp: '09.09.2020 — 11:00', name: { firstName: 'Luca', lastName: 'Rothschild' }, isTested: true },
        { id: 2, timeStamp: '09.09.2020 — 11:00', name: { firstName: 'Marko', lastName: 'Wesling' }, isTested: false },
        { id: 3, timeStamp: '09.09.2020 — 11:00', name: { firstName: 'Artur', lastName: 'Kastner' }, isTested: true },
        { id: 4, timeStamp: '09.09.2020 — 11:30', name: { firstName: 'Karolin', lastName: 'Sanger' }, isTested: false },
        { id: 5, timeStamp: '09.09.2020 — 11:30', name: { firstName: 'Jens', lastName: 'Frueh' }, isTested: false },
        { id: 6, timeStamp: '09.09.2020 — 11:30', name: { firstName: 'Vanessa', lastName: 'Faust' }, isTested: false },
        { id: 7, timeStamp: '09.09.2020 — 11:30', name: { firstName: 'Julia', lastName: 'Luft' }, isTested: false },
        { id: 8, timeStamp: '09.09.2020 — 11:30', name: { firstName: 'Stefanie', lastName: 'Holzman' }, isTested: false }
    ]
    var items = []

    for (const [index, value] of dummyData.entries()) {
        var showDivider = false, showHeader = false;
        if (index === 0) {
            showHeader = true;
        }
        else if (index < dummyData.length - 1) {
            if (value.timeStamp !== dummyData[index + 1].timeStamp) {
                // Lookahead for divider
                showDivider = true;
            } else if (value.timeStamp !== dummyData[index - 1].timeStamp) {
                // Lookbehind for header
                showHeader = true;
            }
        }
        var slotDivider = showDivider ? <div className="dropdown-divider mt-4 mb-4"></div> : <></>
        var nextSlotHeader = showHeader ? <h4 className='mb-3'>Termine im Zeitslot {dummyData[index + 1].timeStamp.slice(-5)}</h4> : <></>
        var elem = <div key={index}>{nextSlotHeader}<Appointment timeStamp={value.timeStamp} name={value.name} isTested={value.isTested}></Appointment>{slotDivider}</div>
        items.push(elem)
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
    const [modalShow, setModalShow] = React.useState(false);
    const [isTested, setIsTested] = React.useState(props.isTested);
    var modalCallback = () => {
        isTested ? setIsTested(false) : setIsTested(true);
    }

    return (
        <ListGroup.Item className='list-group-item'>
            <b className="mr-3">{`${props.timeStamp}`}</b>
            {`${props.name.lastName}, ${props.name.firstName}`}

            <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-top">
                    Detailübersicht
                </Tooltip>}>
                <Link to="appointmentoverview" className="float-right">
                    <svg className="bi bi-info-circle-fill float-right ml-3" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-top">
                    {isTested ? <>Dieser Patient wurde bereits <strong>getestet</strong>.</> : <>Dieser Patient wurde <strong> noch nicht getestet</strong>.</>}
                </Tooltip>}>
                <svg style={{ cursor: "pointer" }} className="bi bi-person-check-fill float-right ml-3" width="2em" height="2em" viewBox="0 0 16 16" fill={isTested ? "green" : "grey"} xmlns="http://www.w3.org/2000/svg" onClick={() => { setModalShow(true) }}>
                    <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm9.854-2.854a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708L12.5 7.793l2.646-2.647a.5.5 0 01.708 0z" clipRule="evenodd" />
                </svg>
            </OverlayTrigger>

            <VerticallyCenteredModal
                confirmButtonText='Ja'
                text={'Sind Sie sicher, dass Sie diesen Patienten als ' + (isTested ? 'nicht' : '') + ' getestet markieren möchten?'}
                title='Patient als getestet markieren'
                callback={modalCallback}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </ListGroup.Item>
    )
}

function BottomRow() {
    return (
        <Container className="mb-5">
        </Container>
    )
}