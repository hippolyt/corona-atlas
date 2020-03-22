import {useStore} from "../state/store";
import * as Fuse from "fuse.js";

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

    const searchDoctors = (doctorList, search_term) => search_term ? new Fuse(doctorList, searchOptions).search(search_term).map(it => it.item) : doctorList;

    const setDoctorList = (doctorList) =>
        setState(old => ({
            ...old,
            doctorList,
            filteredDoctorList: searchDoctors(doctorList, state.search_term)
        }));

    const addDoctor = (doctor) => {
        const listPlusDoctor = [...doctorList, doctor];
        return setState(old => ({
            ...old,
            doctorList: listPlusDoctor,
            filteredDoctorList: searchDoctors(listPlusDoctor, state.search_term)
        }));
    };


    const removeDoctor = (doctor) => {
        const listMinusDoctor = doctorList.filter(it => it !== doctor);
        return setState(old => ({
            ...old,
            doctorList: listMinusDoctor,
            filteredDoctorList: searchDoctors(listMinusDoctor, state.search_term)
        }));
    };


    const setSearchTerm = (search_term) =>
        setState(old => ({
            ...old,
            search_term: search_term,
            filteredDoctorList: searchDoctors(old.doctorList, search_term)
        }));


    return [doctorList, filteredDoctorList, setDoctorList, addDoctor, removeDoctor, setSearchTerm];
}