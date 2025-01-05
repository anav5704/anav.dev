export const prerender = false

import type { APIRoute } from "astro"
import { db } from "@prisma"

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json()
        const email = body.email

        if (!email) {
            return new Response(JSON.stringify({
                message: "An email address is required.",
            }))
        }

        const subscription = await db.subscription.findFirst({
            where: {
                email
            }
        })

        if (subscription) {
            return new Response(JSON.stringify({
                message: "This email has already subscribed.",
            }))
        }
        else {
            await db.subscription.create({
                data: {
                    email
                }
            })
        }

        return new Response(JSON.stringify({
            message: "All set! Thank you for subscribing."
        }))
    }

    catch (error) {
        return new Response(JSON.stringify({
            message: "Oops, something went wrong on my server."
        }))
    }
}