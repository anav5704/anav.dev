import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

import "./globals.css"

const inter = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Anav Chand - Software Engineer and Fullstack Web Developer from Fiji.",
    description: "Hey, I'm Anav Chand. I'm a Software Engineering Student at the University of the South Pacific.",
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Analytics />
                {children}
            </body>
        </html>
    )
}
