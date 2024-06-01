import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import classNames from "classnames"

const inter = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Anav Chand - Software Engineer &  Fullstack Web Developer from Fiji.",
    description:
        "Hey, I'm Anav Chand. I'm a Software Engineering Student at the University of the South Pacific.",
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={classNames(inter.className, "glow-gradient")}>
                <SpeedInsights />
                <Analytics />
                {children}
            </body>
        </html>
    )
}
