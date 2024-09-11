
import { Link, Menu, X } from "@geist-ui/icons"
import { useState } from "react"

const internalLinks = [
    {
        label: "Skills",
        href: "/#skills",
        event: "link-skills",
    }, {
        label: "Experience",
        href: "/#xp",
        event: "link-experience",
    },
    {
        label: "Projects",
        href: "/projects",
        event: "link-projects",
    },
    {
        label: "Blogs",
        href: "/blogs",
        event: "link-blogs",
    },
    {
        label: "Research",
        href: "/research",
        event: "link-research",
    }
]

const externalLinks = [
    {
        label: "GitHub",
        href: "https://github.com/anav5704",
        event: "link-github",
    },
    {
        label: "Twitter",
        href: "https://twitter.com/anav_webdev",
        event: "link-twitter",
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@aanaav",
        event: "link-youtube",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aanaav",
        event: "link-linkedin",
    },
    {
        label: "Resume",
        href: "https://dub.sh/anav-resume",
        event: "link-resume",
    },
]

const allLinks = [...internalLinks, ...externalLinks]

export const NavBar = ({ children }: { children: React.ReactNode }) => {
    const [showExternal, setShowInternal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const toggleLinks = () => {
        setShowInternal((prev) => !prev)
    }

    const toggleMenu = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <nav
            className="fixed w-screen max-w-7xl left-1/2 -translate-x-1/2 bg-transparent top-5"
        >

            {/* MAIN NAV */}
            <div
                className="hidden md:flex items-center justify-between p-2 w-11/12 md:w-3/4 lg:w-1/2 mx-auto bg-white border border-zinc-200 rounded-full"
            >
                {children}
                {(showExternal ? externalLinks : internalLinks).map((link, index) => (
                    <a
                        className="hidden md:block no-underline hover:underline text-base"
                        data-umami-event={link.event}
                        href={link.href}
                        key={index}
                    >
                        {link.label}
                    </a>
                ))
                }

                <button
                    className="grid h-8 w-8 border border-zinc-200 rounded-full place-content-center"
                    data-umami-event="toggle-links"
                    onClick={toggleLinks}
                >
                    {showExternal ? <X size={18} /> : <Link size={18} />}
                </button>
            </div>

            {/* MOBILE NAV  */}
            <div
                className="flex md:hidden flex-col w-11/12 md:w-3/4 lg:w-1/2 mx-auto bg-white border border-zinc-200 rounded-lg"
            >
                <div className="flex items-center justify-between w-full p-2">

                    {children}
                    <button
                        className="h-8 w-8 border border-zinc-200 rounded-lg grid place-content-center"
                        data-umami-event="toggle-menu"
                        onClick={toggleMenu}
                    >
                        {isOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
                {isOpen && (
                    <>
                        <hr />
                        <div className="flex flex-col gap-2 p-2 text-right">
                            {allLinks.map((link, index) => (
                                <a
                                    className="no-underline hover:underline text-base"
                                    data-umami-event={link.event}
                                    href={link.href}
                                    key={index}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </nav>


    )
}