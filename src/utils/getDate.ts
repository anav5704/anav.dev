export const long = (date: Date) => {
    return date.toLocaleDateString("en-US", {
        timeZone: "Pacific/Fiji",
        month: "long",
        day: "numeric",
        year: "numeric"
    });
};

export const short = (date: Date) => {
    return date.toLocaleDateString("en-US", {
        timeZone: "Pacific/Fiji",
        month: "short",
        year: "numeric"
    });
};
