import { format } from "date-fns"

export const longDate = (date: Date) => {
    return format(date.toLocaleDateString("en-US", { timeZone: "Pacific/Fiji" }), "PPP")
}

export const shortDate = (date: Date) => {
    return format(date.toLocaleDateString("en-US", { timeZone: "Pacific/Fiji" }), "MMM yyyy")
}
