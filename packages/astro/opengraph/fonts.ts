import fs from "node:fs"

const Alice = {
    name: "Alice",
    data: fs.readFileSync("public/fonts/Alice.ttf"),
    weight: 400 as const,
    style: "normal" as const,
}

const Geist = {
    name: "Geist Sans",
    data: fs.readFileSync("public/fonts/Geist.ttf"),
    weight: 400 as const,
    style: "normal" as const,
}

export { Alice, Geist }