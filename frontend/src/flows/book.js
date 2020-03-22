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

            let nextStage = "DAY_SELECTION"
            switch (stage) {
                case "DAY_SELECTION":
                    if (!slotId) {
                        nextStage = "SLOT_SELECTION"
                        break
                    }
                case "SLOT_SELECTION":
                    if (!patient) {
                        nextStage = "PATIENT_DATA"
                        break
                    }
                case "PATIENT_DATA":
                    nextStage = "SUMMARY"
                    break
                case "SUMMARY":

                    break
                case "COMPLETED":


                    break
            }

            return changeStage(old, nextStage)
        })



    const canGoBack = history && history.length > 0 ? true : false

    return { stage, setStage, back, canGoBack, next }
}
