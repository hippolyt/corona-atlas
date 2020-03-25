import { useQuery, useMutation, queryCache } from 'react-query'
import { fetchMe, postDoctor, delDoctor, fetchDoctors } from '../client'
import { useState, useMemo } from 'react'

export function useSlot(id) {
    return [{ time: new Date('2020-03-22T12:00') }]
}

export function useTestCenterAddress() {
    return 'Am Wegfeld 21, 90423 Nürnberg'
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

const GET_DOCTORS = 'get_doctors'

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
