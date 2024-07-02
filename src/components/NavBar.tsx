import { ArrowUpRight, Menu } from "@geist-ui/icons"
import { useState } from "react"

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed w-screen bg-white border-b border-zinc-200 md:border-none">
            <div
                className={`${isOpen ? "[&>p]:flex" : "[&>p]:hidden"} md:[&>p]:flex [&>*>a]:no-underline h-full flex flex-col  md:flex-row items-star justify-between gap-3 py-3 w-11/12 md:w-3/4 lg:w-1/2 mx-auto`}
            >
                <div className="flex items-center justify-between">
                    <a href="/#anav">Anav</a>
                    <Menu className="block md:hidden" size={20} onClick={() => setIsOpen((prev) => !prev)} />
                </div>
                <p>
                    <a href="/#skills">Skills</a>
                </p>
                <p>
                    <a href="/#projects">Projects</a>
                </p>
                <p>
                    <a href="/blogs">Blogs</a>
                </p>
                <p>
                    <a href="/research">Research</a>
                </p>
                <p className="flex items-center gap-1">
                    <a target="_blank" href="https://github.com/anav5704">GitHub</a>
                    <ArrowUpRight size={20} />
                </p>
            </div>
        </nav>
    )
}