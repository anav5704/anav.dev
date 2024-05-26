import { Container, Nav } from "@/components"
import Image from "next/image"

export default function Home() {
    return (
        <main className="relative pt-32 h-[300vh]">
            <Image
                src="/anav.jpg"
                alt="Picture of Anav"
                className="rounded-full mx-auto"
                quality={100}
                height={175}
                width={175}
            />
            <h1 className="font-black text-4xl text-center tracking-tight my-10">
                Software Engineer,
                <br />
                Homemade <span className="text-gradient-rose">Fullstack Web Dev</span>.
            </h1>
            <Nav />
        </main >
    )
}
