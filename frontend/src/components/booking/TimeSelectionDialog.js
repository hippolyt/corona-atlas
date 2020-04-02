import React from 'react'

import { useSelectedSlot, useSlotDate } from '../../flows/book'
import { useSlotsForDay } from '../../flows/data'
import { formatDateAsHourFace, formatDateAsReadableDisplay } from '../../lib/datetime'
import { NextButton, BackButton } from './navigation'

function TimeSlot(props) {
    const { time, capacity, booked, selected, onSelect } = props

    const label = formatDateAsHourFace(time)

    const demand = booked / capacity

    let bgColor
    if (demand <= 0.5) {
        bgColor = 'rgb(0,195,27)'
    } else if (demand <= 0.7) {
        bgColor = 'rgb(255,242,170)'
    } else {
        bgColor = 'rgb(255,170,170)'
    }

    const contentStyle = {
        backgroundColor: bgColor,
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

    return (
        <div className='tslot-container'>
            <div style={selectorStyle} className='tslot-selector'>
                <h1>&#10003;</h1>
            </div>
            <div style={contentStyle} onClick={() => onSelect()} className='tslot-content'>
                <h1>{label}</h1>
                <p className="tslot-stats pr-2 font-weight-bold">{booked}/{capacity}</p>
                <div className="inline-block">
                    <p className="tslot-label d-none d-sm-block pr-4">Termine<br />vergeben</p>
                </div>
            </div>
        </div>
    )
}

export function TimeSelectionDialog() {
    const [selectedSlot, setSelectedSlot] = useSelectedSlot()

    const [slotDate] = useSlotDate()
    const { data: timeSlots } = useSlotsForDay(slotDate)

    timeSlots.sort((a, b) => a.start < b.start)

    return (
        <>
            <h1 className="mb-4">Zeitslot <u>{formatDateAsReadableDisplay(slotDate)}</u></h1>
            <ul className="time-pick p-0">
                {timeSlots?.map((d, i) => (
                    <TimeSlot key={d.slotId} selected={d.slotId === selectedSlot?.slotId} onSelect={() => setSelectedSlot(d)} time={d.start}
                        capacity={d.capacity} booked={d.booked} />
                ))}
            </ul>
            <div className='text-right'>
                <BackButton />
                <NextButton enabled={selectedSlot !== null} />
            </div>
        </>
    )
}
