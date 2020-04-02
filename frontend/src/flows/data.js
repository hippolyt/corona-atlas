import { useState } from 'react'
import { useQuery, useMutation, queryCache } from 'react-query'

import {
    fetchMe,
    postDoctor,
    delDoctor,
    fetchDoctors,
    fetchDaystats,
    fetchSlots,
    postCase
} from '../client'

const GET_DOCTORS = 'get_doctors'
const GET_DAYSTATS = 'get_daystats'
const GET_SLOTS = 'get_slots'

export function useTestCenterAddress() {
    return 'Am Wegfeld 21, 90423 Nürnberg'
}

export function useDaystats(start, end) {
    const { status, data, error } = useQuery([GET_DAYSTATS, start.toISOString(), end.toISOString()], fetchDaystats(start, end))

    const loading = status === 'loading'

    return { loading, data, error }
}

export function useSlotsForDay(date) {
    const { status, data, error } = useQuery([GET_SLOTS, date.toISOString()], fetchSlots(date))

    const loading = status === 'loading'

    return { loading, data, error }
}

export function useSlotPatients(id) {
    return [[
        {
            name: 'Max Musterman',
            id: 'silly-goose-37',
            tested: false,
        },
        {
            name: 'Carmen Novak',
            id: 'quick-cobra-15',
            tested: true,
        },
        {
            name: 'Artur Richmond',
            id: 'tricky-chicken-23',
            tested: true,
        },
        {
            name: 'Johnathan Mathews',
            id: 'brave-ladybug-90',
            tested: false,
        }
    ]]
}

export function useMe() {
    const { status, data } = useQuery('me', fetchMe)

    if (status !== 'success')
        return {
            loggedIn: false
        }

    return data
}



function refetchDoctors() {
    queryCache.refetchQueries(GET_DOCTORS)
}

export function useDoctors() {
    const [searchQuery, setSearchQuery] = useState({ name: '', email: '' })

    const { status: getStatus, data, error: getError } = useQuery([GET_DOCTORS, searchQuery], fetchDoctors)
    const doctors = getStatus === 'success' ? data : []

    const [createDoctor, { error: createError, status: createStatus }] = useMutation(postDoctor, {
        onSuccess: refetchDoctors
    })

    const [deleteDoctor, { error: delError, status: delStatus }] = useMutation(delDoctor, {
        onSuccess: refetchDoctors
    })

    return {
        loading: getStatus === 'loading' || createStatus === 'loading' || delStatus === 'loading',
        error: getError || createError || delError,
        doctors,
        createDoctor: (doctor) => {
            createDoctor({
                ...doctor,
                access: true
            })
        },
        delDoctor: deleteDoctor,
        setSearchQuery
    }
}

export function useCreateCase() {
    const [createCase, { error, status }] = useMutation(postCase, {
        onSuccess: () => {
            queryCache.refetchQueries(GET_DAYSTATS)
            queryCache.refetchQueries(GET_SLOTS)
        }
    })
    return {
        createCase, error, status
    }
}

export function useDemo() {
    const [getDemo, setDemo] = useState(false);
    return [getDemo, setDemo];
}
