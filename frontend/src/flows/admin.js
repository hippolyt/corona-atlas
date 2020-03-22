import {useStore} from "../state/store";
import * as Fuse from "fuse.js";

export function initialState() {
    return {
        doctorList: [],
        filteredDoctorList: [],
        searchTerm: ''
    }
}

export function useAdminState() {
    const [state, setState] = useStore();

    const {admin} = state;

    const setAdminState = (admin) => {
        setState(old => {
            return {
                ...old,
                admin: admin(old.admin)
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
        "email",
        "office"
    ]
};

export function useDoctorList() {
    const [state, setState] = useAdminState();
    const {doctorList, filteredDoctorList} = state;

    const searchDoctors = (doctorList, searchTerm) => searchTerm !== '' ? new Fuse(doctorList, searchOptions).search(searchTerm).map(it => it.item) : doctorList;

    const setDoctorList = (doctorList) =>
        setState(old => ({
            ...old,
            doctorList,
            filteredDoctorList: searchDoctors(doctorList, state.searchTerm)
        }));

    const addDoctor = (doctor) => {
        const listPlusDoctor = [...doctorList, doctor];
        return setState(old => ({
            ...old,
            doctorList: listPlusDoctor,
            filteredDoctorList: searchDoctors(listPlusDoctor, state.searchTerm)
        }));
    };


    const removeDoctor = (doctor) => {
        const listMinusDoctor = doctorList.filter(it => it !== doctor);
        return setState(old => ({
            ...old,
            doctorList: listMinusDoctor,
            filteredDoctorList: searchDoctors(listMinusDoctor, state.searchTerm)
        }));
    };


    const setSearchTerm = (searchTerm) =>
        setState(old => ({
            ...old,
            searchTerm: searchTerm,
            filteredDoctorList: searchDoctors(old.doctorList, searchTerm)
        }));


    return [doctorList, filteredDoctorList, setDoctorList, addDoctor, removeDoctor, setSearchTerm];
}