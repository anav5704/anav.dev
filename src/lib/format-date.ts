import { format } from "date-fns"

export const formatDate = (date: Date) => {
    return format(date.toLocaleDateString("en-US", { timeZone: "Pacific/Fiji" }), "PPP")
}
