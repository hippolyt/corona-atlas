import { useQuery } from 'react-query'
import { fetchMe } from '../client'

export function useSlot(id) {
    return [{ time: new Date("2020-03-22T12:00") }]
}

export function useTestCenterAddress() {
    return "Am Wegfeld 21, 90423 Nürnberg"
}

export function useSlotPatients(id) {
    return [[
        {
            name: "Max Musterman",
            id: "silly-goose-37",
            tested: false,
        },
        {
            name: "Carmen Novak",
            id: "quick-cobra-15",
            tested: true,
        },
        {
            name: "Artur Richmond",
            id: "tricky-chicken-23",
            tested: true,
        },
        {
            name: "Johnathan Mathews",
            id: "brave-ladybug-90",
            tested: false,
        }
    ]]
}



export function useMe() {
    const { data } = useQuery('me', fetchMe)

    return data
}
