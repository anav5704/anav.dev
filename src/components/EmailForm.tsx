import { useState } from "react"

export const EmailForm = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")

    const isValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubscribe = async () => {
        if (!isValid(email)) {
            setMessage("Please enter a valid email address.")
            setTimeout(() => setMessage(""), 5000)
            return
        }

        setLoading(true)

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                })
            })

            const data = await response.json()
            setMessage(data.message)

        } catch (error) {
            setMessage("Oops, an error occurred")
        } finally {
            setLoading(false)
            setTimeout(() => { setMessage("") }, 5000)
        }
    }

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mt-4">
            <input
                className="col-span-4 md:col-span-3 px-4 py-2 border w-full bg-white border-zinc-200 rounded-lg disabled:cursor-not-allowed"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                disabled={loading}
                value={email}
                name="email"
                type="text"
            />
            <button
                className="grid place-content-center col-span-4 md:col-span-1 px-4 py-2 border border-zinc-200 rounded-lg disabled:cursor-not-allowed"
                data-umami-event="email-subscription"
                onClick={handleSubscribe}
                disabled={loading}
            >
                <p>{loading ? "Loading..." : "Subscribe"}</p>
            </button>
            <p className="col-span-4">{message}</p>
        </div>
    )
}