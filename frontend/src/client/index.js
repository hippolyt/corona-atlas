import moment from 'moment'

export function fetchMe() { return fetchAPI('/me') }

export function fetchDoctors() { return fetchAPI('/doctors') }
export function postDoctor(doctor) { return fetchAPI("/doctors", postReq(doctor)) }
export function delDoctor(id) { return fetch("/api-internal/doctors/" + id, delReq()) }

export function postCase(c) { return fetchAPI('/cases', postReq(c)) }

export function fetchDaystats(start, end) {
    return () => fetchAPI(`/daystats?from=${start.toISOString()}&to=${end.toISOString()}`)
}

export function fetchSlots(date) {
    const start = moment(date).startOf('day')
    const end = moment(date).endOf('day')
    return () => fetchAPI(`/slots?from=${start.toISOString()}&to=${end.toISOString()}`)
}

function postReq(body) {
    return {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
}

// eslint-disable-next-line no-unused-vars
function patchReq(body) {
    return {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
}

function delReq() {
    return {
        method: 'DELETE'
    }
}

function fetchAPI(path, init) {
    return fetch('/api-internal' + path, init).then(r => r.json())
}
