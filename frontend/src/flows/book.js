import { useStore } from '../state/store';
import { useCreateCase } from './data'

export function initialState() {
    return {
        isLoading: false,
        slot: null,
        slotDate: null,
        slotPatients: null,
        patient: {
            name: "Zierbock",
            givenName: "Tom",
            email: "tom@zierbock.com",
            street: "P",
            streetNumber: "12",
            city: "N",
            zipCode: "93846",
            phoneNumber: "82364735",
            mobileNumber: "82364735",
        },
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

export function useSelectedSlot() {
    const [state, setState] = useBookingState()
    const { slot } = state

    const setSelectedSlot = (slot) => {
        setState(old => ({
            ...old,
            slot
        }))
    }

    return [slot, setSelectedSlot]
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
            const { stage } = old

            let nextStage = 'DAY_SELECTION'
            switch (stage) {

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
                case 'DAY_SELECTION':
                default:
                    nextStage = 'SLOT_SELECTION'
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
    const [, setIsLoading] = useIsLoading()
    const [state] = useBookingState()
    const { createCase, status, error } = useCreateCase()

    const book = () => {
        setIsLoading(true)

        const c = {
            slotId: state.slot.slotId,
            referralType: 'post',
            patient: {
                name: state.patient.givenName + " " + state.patient.name,
                email: state.patient.email,
                phone: state.patient.phoneNumber,
                mobile: state.patient.mobileNumber,
                consent: true,
                highRisk: false,
                address: {
                    street: state.patient?.street,
                    no: state.patient?.streetNumber,
                    city: state.patient?.city,
                    zipCode: state.patient?.zipCode,
                }
            }
        }

        createCase(c).then(() => {
            setIsLoading(false)
            setStage('COMPLETED')
        })
    }

    return [book, { status, error }]
}
