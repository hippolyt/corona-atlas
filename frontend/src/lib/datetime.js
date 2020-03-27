import moment from 'moment'

export function formatDateAsHourFace(date) {
    const d = moment(date)
    let res = ''

    const hours = d.hour()
    const min = d.minute()

    if (hours < 10) {
        res = res + '0'
    }
    res = res + hours + ':'

    if (min < 10) {
        res = res + '0'
    }
    res = res + min

    return res + ' h'
}

export function formatDateAsReadableDisplay(date, includeTime = false) {
    const dayIdx = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
    const monthIdx = [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'July',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
    ]


    const d = moment(date)
    const dateString = `${dayIdx[d.day()]} ${d.date()}. ${monthIdx[d.month()]}`;

    if (includeTime) {
        return `${dateString} ${d.hour().toString().padStart(2, '0')}:${d.minute().toString().padStart(2, '0')}`
    }
    return dateString
}
