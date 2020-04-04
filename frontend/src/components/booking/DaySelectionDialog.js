import React from 'react'
import moment from 'moment'
import { Col, Row } from 'react-bootstrap'
//import Calendar from 'react-calendar'

import { useSlotDate } from '../../flows/book'
import { useDaystats } from '../../flows/data'
import { BackButton, NextButton } from './navigation'

// function DatePicker() {
//     return (
//         <div className='m-auto calendar-container'>
//             <Calendar />
//         </div>
//     )
// }

function SlotSelector(props) {
    const { slots } = props

    const dayIdx = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
    const content = slots.map((d, i) => {

        const demand = d.booked / d.capacity

        let bgColor
        if (demand <= 0.5) {
            bgColor = 'rgb(0,195,27)'
        } else if (demand <= 0.8) {
            bgColor = 'rgb(255,242,170)'
        } else {
            bgColor = 'rgb(255,170,170)'
        }

        const contentStyle = {
            backgroundColor: bgColor,
            borderStyle: 'solid',
            ...(d.selected ? {
                borderColor: 'rgb(0,136,238)',
                borderRightWidth: '5px',
                borderTopWidth: '5px',
                borderBottomWidth: '5px',
                borderLeftWidth: '5px',
                paddingTop: '0px',
            } : {
                    borderColor: 'black',
                    borderRightWidth: '1px',
                    borderTopWidth: '1px',
                    borderBottomWidth: '1px',
                    borderLeftWidth: i === 0 ? '1px' : '0',
                    paddingTop: '4px',

                }),

        }

        const headStyle = {
            visibility: d.selected ? "visible" : "hidden"
        }

        return (
            <Col lg className="mt-3" key={i}>
                <div style={{ width: "100%", minWidth: "150px" }}>
                    <div key={d.value} className="short-day-pick-container">
                        <div style={headStyle} className="short-day-pick-selected">
                            <h1>Ausgewählt</h1>
                        </div>
                        <div
                            onClick={() => {
                                d.onClick()
                            }}
                            className={"short-day-pick"}
                            style={contentStyle}
                        >
                            <h1>{d.value.date()}.</h1>
                            {dayIdx[d.value.day()]}
                            <br />
                            <br />
                            <br />
                            <br />
                            <p>{d.booked}/{d.capacity}</p>
                            <p>Termine<br />vergeben</p>
                        </div>
                    </div>
                </div>
            </Col>
        )
    })

    return (
        <Row className="no-gutters mb-3 justify-content-around" style={{ maxWidth: "750px", margin: "0 auto", alignItems: "flex-end" }}>
            {content}
        </Row>
    )
}


export function DaySelectionDialog() {
    const [slotDate, setSlotDate] = useSlotDate()

    const now = new Date()
    const from = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours())
    const to = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 20)

    const { data } = useDaystats(from, to)

    let shortSelection = data?.map(d => {

        const value = moment(d.date)
        const selected = value.isSame(slotDate)
        const onClick = () => { setSlotDate(value) }

        return {
            capacity: d.maxCapacity,
            booked: d.booked,
            value,
            selected,
            onClick,
        }
    }).sort((a, b) => a.value > b.value)

    if (!shortSelection) {
        shortSelection = []
    }

    // const [showCal] = useState(false)

    // const cal = !showCal ? null : (
    //     <>
    //         <h6>oder clicking Sie auf ein Datum im Kalender</h6>
    //         <DatePicker />
    //     </>
    // )

    return (
        <>
            <h1>Termin</h1>
            <h6>Wählen Sie einen Tag aus</h6>
            <SlotSelector slots={shortSelection} />

            {/* <span onClick={() => { setShowCal(!showCal) }}>{showCal ? <>&#9660;</> : <>&#9654;</>}</span>weitere optionen

            {cal} */}

            <div className='text-right'>
                <BackButton />
                <NextButton enabled={slotDate !== null} />
            </div>
        </>
    )
}
