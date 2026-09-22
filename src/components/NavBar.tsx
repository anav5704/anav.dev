import { useState, useMemo } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    CloseButton
} from "@headlessui/react";
import { Menu, X } from "lucide-react";

interface NavLink {
    label: string;
    href: string;
    event: string;
    active: boolean;
}

export default function NavBar({
    children,
    pathname
}: {
    children: React.ReactNode;
    pathname: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const links: NavLink[] = useMemo(
        () => [
            {
                label: "Home",
                href: "/",
                event: "link-home",
                active: pathname == "/"
            },
            {
                label: "Projects",
                href: "/projects",
                event: "link-projects",
                active: pathname.includes("/projects")
            },
            {
                label: "Skills",
                href: "/skills",
                event: "link-skills",
                active: pathname.includes("/skills")
            },
            {
                label: "Experience",
                href: "/experience",
                event: "link-experience",
                active: pathname.includes("/experience")
            },
            {
                label: "Blogs",
                href: "/blogs",
                event: "link-blogs",
                active: pathname.includes("/blogs")
            },
            {
                label: "Links",
                href: "https://links.anav.dev",
                event: "link-links",
                active: false
            }
        ],
        [pathname]
    );

    return (
        <>
            <div className="fixed w-screen max-w-7xl left-1/2 -translate-x-1/2 bg-transparent top-5">
                <nav className="gap-3 md:gap-0 flex items-center p-2 w-11/12 md:w-3/4 lg:w-1/2 mx-auto bg-white border border-zinc-200 rounded-lg md:rounded-full">
                    <a className="w-full md:w-fit" data-umami-event="link-home" href="/">
                        {children}
                    </a>

                    <ul className="hidden md:flex w-full justify-around">
                        {links.map(({ href, label, event, active }) => (
                            <li key={event}>
                                <a
                                    className={`${active && "text-[#444444]"} hover:text-[#444444] faded no-underline text-base`}
                                    data-umami-event={event}
                                    href={href}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                        className="px-2 block md:hidden"
                    >
                        <Menu size={20} />
                    </button>
                </nav>
            </div>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50 md:hidden"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 backdrop-blur-lg bg-black/20 duration-200 ease-out data-closed:opacity-0"
                />

                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="relative bg-white border-zinc-200 border mx-auto w-11/12 h-fit rounded-lg py-10 duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
                    >
                        <DialogTitle className="sr-only">
                            Navigation menu
                        </DialogTitle>

                        <CloseButton
                            aria-label="Close menu"
                            className="absolute top-0 right-0 p-5"
                        >
                            <X size={20} />
                        </CloseButton>
                        <ul className="space-y-10 text-center">
                            {links.map(({ href, label, event, active }) => (
                                <li key={event}>
                                    <a
                                        className={`${active && "text-[#444444]"} hover:text-[#444444] block faded no-underline text-base`}
                                        data-umami-event={event}
                                        href={href}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
