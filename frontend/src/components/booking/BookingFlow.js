import React from 'react'
import './BookingFlow.css'
import { Container } from 'react-bootstrap'

import { useIsLoading, useStage } from '../../flows/book'
import { DaySelectionDialog } from './DaySelectionDialog'
import { TimeSelectionDialog } from './TimeSelectionDialog'
import { PatientInformationForm } from './PatientInformationForm'
import { BookingConfirmationDialog } from './BookingConfirmation'
import { BookingSummary } from './BookingSummary'


export function LoadingScreen() {
    return (
        <center className='spinner-container'>
            <div className='spinner'></div>
            <p className='mt-4'>Wir arbeiten...</p>
        </center>
    )
}

export function BookingFlow() {
    const { stage } = useStage()
    const [isLoading] = useIsLoading()


    let view
    if (isLoading) {
        view = <LoadingScreen />
    } else {
        switch (stage) {
            case 'SLOT_SELECTION':
                view = <TimeSelectionDialog />
                break
            case 'PATIENT_DATA':
                view = <PatientInformationForm />
                break
            case 'SUMMARY':
                view = <BookingSummary />
                break
            case 'COMPLETED':
                view = <BookingConfirmationDialog />
                break
            case 'DAY_SELECTION':
            default:
                view = <DaySelectionDialog />
                break
        }
    }

    return (
        <Container className="pt-5 pb-5">
            <div className="border p-4 rounded">
                {view}
            </div>
        </Container>
    )
}
