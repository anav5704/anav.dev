import Link from "next/link"

import React from "react"

export const Nav = () => {
    return (
        <nav className="flex items-center justify-between text-sm">
            <Link href="/blog" className="link">
                Blog
            </Link>
            <Link href="/research" className="link">
                Research
            </Link>
            <a
                download
                href="./anav-chand-cv.pdf"
                className="link"
            >
                CV
            </a>
            <a
                target="_blank"
                href="https://github.com/anav5704"
                className="link"
            >
                GitHub
            </a>
        </nav>
    )
}
