import fs from "node:fs";

const Alice = {
    name: "Alice",
    data: fs.readFileSync("assets/Alice.ttf").buffer as ArrayBuffer,
    weight: 400 as const,
    style: "normal" as const
};

const Geist = {
    name: "Geist Sans",
    data: fs.readFileSync("assets/Geist.ttf").buffer as ArrayBuffer,
    weight: 400 as const,
    style: "normal" as const
};

export { Alice, Geist };
