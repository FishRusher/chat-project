export function getStringDate(date) {
    date = new Date(date)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let hour = date.getHours()
    if (hour * 1 < 10) hour = "0" + hour
    let minute = date.getMinutes()
    if (minute * 1 < 10) minute = "0" + minute

    return `${hour}:${minute} ${year}-${month}-${day}`
}

export function getInitials(nick) {
    let letters = [...nick]
    let n = letters.length
    return letters[0] + letters[parseInt(n / 2)]
}

export function randomColor(n) {
    n = n * n * n * n
    n *= 53
    let r, g, b
    r = n % 255
    n *= 83
    g = n % 255
    n *= 59
    b = n % 255
    return `rgb(${r},${g},${b})`
}