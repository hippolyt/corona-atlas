import React from 'react'
import { Button } from 'react-bootstrap'
import moment from 'moment'

import { usePatient, useBookAppointment, useSelectedSlot } from '../../flows/book'
import { ResetButton, BackButton } from './navigation'
import { formatDateAsHourFace } from '../../lib/datetime'


export function BookingSummary() {
    const [patient] = usePatient()
    const [slot] = useSelectedSlot()

    const [book] = useBookAppointment()

    const dayIdx = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
    const monthIdx = [
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
    ]

    const t = slot.start
    console.log(t)
    const d = moment(slot.start)
    const date = `${dayIdx[d.day()]} ${d.date()}. ${monthIdx[d.month()]}`
    const clockTime = formatDateAsHourFace(t)

    return (
        <>
            <h1 className="text-break">Zusammenfassung</h1>
            <div className="mb-2 mt-4">
                <strong className="h4">Termin</strong> {/*<a href=""><small>ändern</small></a> */}
            </div>
            <dl className='row'>
                <dt className='col-sm-3'>Datum</dt>
                <dd className='col-sm-9'>{date}</dd>

                <dt className='col-sm-3'>Uhrzeit</dt>
                <dd className='col-sm-9'>{clockTime}</dd>
            </dl>

            <div className='mb-2 mt-4'>
                <strong className='h4'>Patientendaten</strong>
            </div>
            <dl className='row'>
                <dt className='col-sm-3'>Name</dt>
                <dd className='col-sm-9'>{patient.name}</dd>

                <dt className='col-sm-3'>Vorname</dt>
                <dd className='col-sm-9'>{patient.givenName}</dd>

                <dt className='col-sm-3'>Email</dt>
                <dd className='col-sm-9'>{patient.email}</dd>

                <dt className='col-sm-3'>Handy</dt>
                <dd className='col-sm-9'>{patient.mobileNumber}</dd>

                <dt className='col-sm-3'>Festnetz</dt>
                <dd className='col-sm-9'>{patient.phoneNumber}</dd>

                <dt className='col-sm-3'>Straße</dt>
                <dd className='col-sm-9'>{patient.street}</dd>

                <dt className='col-sm-3'>Hausnummer</dt>
                <dd className='col-sm-9'>{patient.streetNumber}</dd>

                <dt className='col-sm-3'>Stadt</dt>
                <dd className='col-sm-9'>{patient.city}</dd>

                <dt className='col-sm-3'>PLZ</dt>
                <dd className='col-sm-9'>{patient.zipCode}</dd>
            </dl>

            <div className='text-right'>
                <BackButton />
                <ResetButton />
                <Button onClick={() => book()} variant='danger'>Buchen</Button>
            </div>
        </>
    )
}
