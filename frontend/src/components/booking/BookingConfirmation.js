import React from 'react'
import { Button } from 'react-bootstrap'

import { useBookingState, usePatient, useSelectedSlot } from '../../flows/book'
import { useTestCenterAddress } from '../../flows/data'
import { formatDateAsReadableDisplay, formatDateAsHourFace } from '../../lib/datetime'

export function BookingConfirmationDialog() {
    const [, , reset] = useBookingState()
    const [patient] = usePatient()
    const [slot] = useSelectedSlot()

    const addr = useTestCenterAddress()

    return (
        <center>

            <h1 className='mb-4'>Buchung erfolgreich abgeschlossen</h1>

            <p className='font-weight-bold h4'>{patient.givenName} {patient.name} </p>
            <p> wird am</p>
            <p className='font-weight-bold h4'>{formatDateAsReadableDisplay(slot.start)}</p>
            <p>um</p>
            <p className='font-weight-bold h4'>{formatDateAsHourFace(slot.start)}</p>
            <p>im Test-Center</p>
            <p className='font-weight-bold h4'>{addr}</p>
            <p>auf SarsCovid-19 getested</p>

            <div className='mb-5 mt-5'>
                <Button onClick={() => reset()} className='mr-2' variant='primary'>Nächsten Patienten Buchen</Button>
            </div>
        </center>
    )
}

export function BookingFailureDialog() {
    const [, , reset] = useBookingState()

    return (
        <>
            <center>

                <h1>Das hat nicht funktioniert</h1>
                <p>Die IT wurde verständigt</p>
                <p className='mt-5 mb-4'>Versuchen Sie es bitte erneut:</p>

                <div className='mb-5'>
                    <Button onClick={() => reset()} className='mr-2' variant='primary'>Ich gebe nicht auf</Button>
                </div>
            </center>
        </>
    )
}
