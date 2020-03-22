export function fetchMe() {
    return fetch("/api-internal/me").then(r => r.json())
}
