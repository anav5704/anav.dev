import { Container, NavBar, SubHeading } from "@/components"
import Image from "next/image"

export default function Home() {
    return (
        <main className="glow-gradient relative pt-32 h-[300vh]">
            <Image
                src="/anav.jpg"
                alt="Picture of Anav"
                className="rounded-full mx-auto"
                quality={100}
                height={175}
                width={175}
            />
            <h1 className="font-black text-6xl text-center leading-none tracking-tighter my-10">
                <span className="text-primary-gradient">Fullstack Web Dev</span>
                <br />
                & Software Engineer
            </h1>
            <NavBar />
            <Container>
                <SubHeading content="Anav Learn" />
            </Container>
            <Container>
                <SubHeading content="Anav Build" />
            </Container>
            <Container>
                <SubHeading content="Anav Wirte" />
            </Container>
        </main >
    )
}
