import { useStore } from "../state/store";

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

    return [booking, setBookingState]
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

export function useStage() {
    const [state, setState] = useBookingState()
    const { stage } = state

    const setStage = (stage) =>
        setState(old => ({
            ...old,
            stage
        }))

    return [stage, setStage]
}
