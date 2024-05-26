import { Nav } from "@/components"
import Image from "next/image"

export default function Home() {
    return (
        <main className="h-screen w-screen grid place-content-center">
            <div className="relative">
                <div className="glow" />
                <section className="border border-rose-400 h-full relative flex flex-col md:flex-row items-center gap-5 dark:bg-zinc-900 p-3 rounded-xl">
                    <Image
                        src="/anav.jpg"
                        alt="Picture of Anav"
                        className="rounded-xl w-full md:w-auto"
                        quality={100}
                        height={125}
                        width={125}
                    />
                    <div className="text-center md:text-left h-full flex flex-col md:flex-col justify-between gap-y-2">
                        <h1 className="text-2xl font-semibold">
                            Anav Chand
                        </h1>
                        <p className="leading-tight">
                            It's crazy how far half an eye{" "}
                            <br /> and a dream can take you.
                        </p>
                        <Nav />
                    </div>
                </section>
            </div>
        </main>
    )
}
