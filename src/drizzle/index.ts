import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "@drizzle/schema"
import postgres from "postgres"

const url = import.meta.env.PROD ? process.env.DATABASE_URL : import.meta.env.DATABASE_URL

console.log("Node", process.env.DATABASE_URL)

console.log("Astro", import.meta.env.DATABASE_URL)

const client = postgres(url, {
    debug: true
})

export const db = drizzle(client, { schema })