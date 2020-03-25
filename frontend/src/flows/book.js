import { useStore } from '../state/store';
import { useQuery } from 'react-query';

export function initialState() {
    return {
        isLoading: false,
        slotId: null,
        slotDate: null,
        slotPatients: null,
        patient: null,
        stage: 'DAY_SELECTION',
    }
}

export function useBookingState() {
    const [state, setState] = useStore()

    const { booking } = state

    const setBookingState = (booking) => {
        setState(old => {
            //console.log(booking(old.booking))
            return {
                ...old,
                booking: booking(old.booking)
            }
        })
    }

    const reset = () =>
        setState(old => ({
            ...old,
            booking: initialState()
        }))

    return [booking, setBookingState, reset]
}

export function useSlotDate() {
    const [state, setState] = useBookingState()
    const { slotDate } = state

    const setSlotDate = (slotDate) =>
        setState(old => ({
            ...old,
            slotDate
        }))

    return [slotDate, setSlotDate]
}

export function useSlotId() {
    const [state, setState] = useBookingState()
    const { slotId } = state

    const setSlotId = (slotId) =>
        setState(old => ({
            ...old,
            slotId
        }))

    return [slotId, setSlotId]
}

export function useSlotPatients() {
    const [state, setState] = useBookingState()
    const { slotPatients } = state

    const setSlotPatients = (slotPatients) =>
        setState(old => ({
            ...old,
            slotPatients
        }))

    return [slotPatients, setSlotPatients]
}

export function usePatient() {
    const [state, setState] = useBookingState()
    const { patient } = state

    const setPatient = (patient) =>
        setState(old => ({
            ...old,
            patient
        }))

    return [patient, setPatient]
}

function changeStage(state, stage) {
    let { history } = state

    if (state.stage !== stage) {
        if (!history)
            history = []

        history.push(state.stage)
    }

    return {
        ...state,
        stage,
        history
    }
}

export function useStage() {
    const [state, setState] = useBookingState()
    const { stage, history } = state

    const setStage = (stage) =>
        setState(old => changeStage(old, stage))

    const back = () =>
        setState(old => {
            const { history } = old
            if (!history || history.length < 1) {
                return old
            }

            return {
                ...old,
                stage: history.pop(),
                history
            }
        })

    const next = () =>
        setState(old => {
            const { stage, slotId, patient } = old

            let nextStage = 'DAY_SELECTION'
            switch (stage) {
                case 'DAY_SELECTION':
                    nextStage = 'SLOT_SELECTION'
                    break
                case 'SLOT_SELECTION':
                    nextStage = 'PATIENT_DATA'
                    break
                case 'PATIENT_DATA':
                    nextStage = 'SUMMARY'
                    break
                case 'SUMMARY':
                    break
                case 'COMPLETED':


                    break
            }

            return changeStage(old, nextStage)
        })



    const canGoBack = history && history.length > 0 ? true : false

    return { stage, setStage, back, canGoBack, next }
}

export function useIsLoading() {
    const [state, setState] = useBookingState()
    const { isLoading } = state

    const setIsLoading = (isLoading) =>
        setState(old => ({
            ...old,
            isLoading
        }))

    return [isLoading, setIsLoading]
}

export function useBookAppointment() {
    const { setStage } = useStage()
    const [_isLoading, setIsLoading] = useIsLoading()

    const book = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setStage('COMPLETED')
        }, 1000)
    }

    return [book]
}

// export function useDaystats(start, end) {
//     const { status, data } = useQuery(['daystats', start.toISOString(), end.toISOString()], fetchDaystats(start, end))

//     return { status, data }
// }

// function fetchDaystats(start, end) {
//     return () => {
//         return fetch(`/api-internal/daystats?from=${start.toISOString()}&to=${end.toISOString()}`).then(r => r.json())
//     }
// }