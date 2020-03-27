import React from 'react'
import { Button } from 'react-bootstrap'
import { useBookingState } from '../../flows/book'

import { useStage } from '../../flows/book'

export function BackButton() {
    const { canGoBack, back } = useStage()

    if (!canGoBack) {
        return <></>
    }

    return (
        <Button onClick={() => back()} className='mr-2' variant='warning'>
            Zurück
        </Button>
    )
}

export function NextButton(props) {
    const { enabled } = props
    const { next } = useStage()

    return (
        <Button disabled={!enabled} variant='primary' onClick={() => next()}>
            Weiter
        </Button>
    )
}

export function ResetButton() {
    const [, , reset] = useBookingState()

    return <Button onClick={() => reset()} className='mr-2' variant='secondary'>Abbrechen</Button>
}
