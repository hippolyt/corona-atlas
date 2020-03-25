export function fetchMe() { return fetchAPI('/me') }

export function fetchDoctors() { return fetchAPI('/doctors') }
export function postDoctor(doctor) { return fetchAPI("/doctors", postReq(doctor)) }
export function delDoctor(id) { return fetch("/api-internal/doctors/" + id, delReq()) }

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
