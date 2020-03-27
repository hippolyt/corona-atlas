import React, { useState } from 'react'
import { FaCheck } from 'react-icons/all';
import { Container } from 'react-bootstrap'

import { VerticallyCenteredModal } from './VerticallyCenteredModal';
import { usePatient, useSlotPatients, useSelectedSlot } from '../flows/book'
import { formatDateAsReadableDisplay } from '../lib/datetime'

function PatientRow(props) {
    const { name, bookingId, isTested, onSelect, selected } = props

    const contentStyle = {
        borderStyle: 'solid',
        ...(selected ? {
            borderColor: 'rgb(0,136,238)',
            borderWidth: '5px',
            marginLeft: '0',
            padding: '0'
        } : {
                borderColor: 'black',
                borderWidth: '1px',
                marginLeft: '60px',
                padding: '4px 0 0 4px'
            }),
    }

    const selectorStyle = {
        display: selected ? 'inline-block' : 'none'
    }

    const [modalShow, setModalShow] = useState(false);
    const [tested, setTested] = useState(isTested);
    var modalCallback = () => {
        tested ? setTested(false) : setTested(true);
    }

    return (
        <div className='patient-container'>
            <div style={selectorStyle} className='patient-selector'>
                <h1>&#10003;</h1>
            </div>
            <div style={contentStyle} className='patient-content' onClick={onSelect}>
                <div className='patient-info'>
                    <h2 className='patient-name'>{name}</h2>
                    <h4 className='patient-id'>{bookingId}</h4>
                </div>
                <div onClick={() => {
                    setModalShow(true)
                }} className={tested ? 'patient tested' : 'patient untested'}>
                    <div className='patient-icon'>
                        {tested ? <FaCheck /> : <></>}
                    </div>
                </div>
            </div>

            <VerticallyCenteredModal
                confirmButtonText='Ja'
                text={'Sind Sie sicher, dass Sie diesen Patienten als ' + (tested ? 'nicht' : '') + ' getestet markieren möchten?'}
                title={'Patient als ' + (tested ? 'nicht' : '') + ' getestet markieren'}
                callback={modalCallback}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export function TimeWindowDialog() {
    const [slot] = useSelectedSlot()
    const [selectedPatient, setPatient] = usePatient()
    const [rawPatients] = useSlotPatients(slot.slotId)

    const patients = rawPatients?.map(p => ({ ...p, selected: selectedPatient !== null ? p.id === selectedPatient.id : false }));

    return (
        <Container className="mt-5 mb-5">
            <h1 className="mb-4 text-center">Gebuchte Termine in Zeitfenster</h1>
            <h2 className="mb-4 text-center"><u>{formatDateAsReadableDisplay(slot.time, true)}</u></h2>
            <ul className="patient-list">
                {patients?.map((p, i) => (
                    <PatientRow key={p.id} selected={p.selected} onSelect={() => setPatient(p)} name={p.name} bookingId={p.id} isTested={p.tested} />
                ))}
            </ul>
        </Container>
    )
}
