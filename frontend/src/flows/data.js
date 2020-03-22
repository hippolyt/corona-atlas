import { useQuery } from 'react-query'
import { fetchMe } from '../client'

export function useSlot(id) {
    return [{ time: new Date("2020-03-22T12:00") }]
}

export function useTestCenterAddress() {
    return "Am Wegfeld 21, 90423 Nürnberg"
}


export function useMe() {
    const { data } = useQuery('me', fetchMe)

    return data
}
