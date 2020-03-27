import * as Fuse from 'fuse.js'
import { useDoctors } from './data'
import { useStore } from '../state/store'


export function initialState() {
    return {
        searchTerm: ''
    }
}

export function useAdminState() {
    const [state, setState] = useStore();

    const { admin } = state;

    const setAdminState = (fn) => {
        setState(old => {
            return {
                ...old,
                admin: fn(old.admin)
            }
        })
    };

    return [admin, setAdminState]
}

const searchOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [
        'email',
        'name'
    ]
}

function searchDoctors(doctorList, searchTerm) {
    if (searchTerm === '') {
        return doctorList
    }

    return new Fuse(doctorList, searchOptions)
        .search(searchTerm)
        .map(it => it.item)
}

export function useDoctorList() {
    const [state, setState] = useAdminState()
    const { searchTerm } = state
    const { doctors, createDoctor, delDoctor, loading, error } = useDoctors()

    const addDoctor = (doctor) => { createDoctor(doctor) }
    const removeDoctor = (doctor) => { delDoctor(doctor.id) }

    const filteredDoctorList = searchDoctors(doctors, searchTerm)
    return {
        loading,
        error,
        doctorList: doctors,
        filteredDoctorList,
        addDoctor,
        removeDoctor,
        setSearchTerm: (searchTerm) => {
            setState(old => ({
                ...old,
                searchTerm
            }))
        },
    }
}
