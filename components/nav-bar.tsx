import { ArrowUpRight } from "@geist-ui/icons"
import Link from "next/link"

import React from "react"

export const NavBar = () => {
    return (
        <nav className="w-3/4 mx-auto sticky top-10 bg-zinc-950/50 backdrop-blur-sm border border-zinc-900 rounded-full flex items-center justify-around">
            <Link href="/blog" className="link">
                Skills
            </Link>
            <Link href="/blog" className="link">
                Projects
            </Link>
            <Link href="/blog" className="link">
                Blog
            </Link>
            <Link href="/research" className="link">
                Research
            </Link>
            <a
                download
                href="./anav-chand-cv.pdf"
                className="link flex items-center gap-1"
            >
                CV
                <ArrowUpRight size={20} />
            </a>
            <a
                target="_blank"
                href="https://github.com/anav5704"
                className="link flex items-center gap-1"
            >
                GitHub
                <ArrowUpRight size={20} />
            </a>
        </nav>
    )
}
