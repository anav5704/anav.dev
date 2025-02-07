export const longDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
        timeZone: "Pacific/Fiji",
        month: "long",
        day: "numeric",
        year: "numeric"
    })
}

export const shortDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
        timeZone: "Pacific/Fiji",
        month: "short",
        year: "numeric"
    })
}