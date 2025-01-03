export const prerender = false

import { Subscription } from "@drizzle/schema"
import type { APIRoute } from "astro"
import { eq } from "drizzle-orm"
import { db } from "@drizzle"

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json()
        const email = body.email

        if (!email) {
            return new Response(JSON.stringify({
                message: "An email address is required.",
            }))
        }

        const subscription = await db.select().from(Subscription).where(eq(Subscription.email, email))

        if (subscription.length) {
            return new Response(JSON.stringify({
                message: "This email has already subscribed.",
            }))
        }
        else {
            await db.insert(Subscription).values({ email })
        }

        return new Response(JSON.stringify({
            message: "All set! Thank you for subscribing."
        }))
    }

    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Oops, something went wrong on my server."
        }))
    }
}