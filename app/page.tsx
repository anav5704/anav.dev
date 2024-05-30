import {
    Container,
    Grid,
    NavBar,
    ProjectCard,
    SkillCard,
    SubHeading,
    WritingCard,
} from "@/components"
import {
    getAllBlogs,
    getAllProjects,
    getAllResearchPapers,
} from "@/lib/api"
import Image from "next/image"

const researchPapers = getAllResearchPapers()
const projects = getAllProjects()
const blogs = getAllBlogs()

export default function Home() {
    return (
        <main className="glow-gradient relative pt-32 mb-40">
            <Image
                src="/anav.jpg"
                alt="Picture of Anav"
                className="rounded-full mx-auto"
                quality={75}
                height={200}
                width={200}
            />
            <h1 className="font-black text-6xl text-center leading-none tracking-tighter my-10">
                <span className="text-primary-gradient">
                    Fullstack Web Dev
                </span>
                <br />& Software Engineer
            </h1>
            <NavBar />
            <Container>
                <SubHeading content="My Skills" />
                <Grid>
                    <SkillCard
                        title="Languages"
                        description="Proficient in a variety of programming languages & capable of building high quality software."
                        className="col-span-1"
                    >
                        <></>
                    </SkillCard>
                    <SkillCard
                        title="Frontend"
                        description="Confident in building large scale web based applications using modern web technologies. Always learning & experimenting with different architectures."
                        isFeatured={true}
                        className="col-span-2"
                    >
                        <></>
                    </SkillCard>
                    <SkillCard
                        title="Backend"
                        description="Well versed in API development & experienced with DB engines like PostgreSQL, SQLite & MongoDB."
                        className="col-span-1"
                    >
                        <></>
                    </SkillCard>
                    <SkillCard
                        isNew={true}
                        title="Testing"
                        description="Relatively new to system testing, performance testing & test driven development."
                        className="col-span-1"
                    >
                        <></>
                    </SkillCard>
                    <SkillCard
                        isNew={true}
                        title="SDLC"
                        description="Currently implementing agile workflows into larger solo & collab projects."
                        className="col-span-1"
                    >
                        <></>
                    </SkillCard>
                </Grid>
            </Container>
            <Container>
                <SubHeading content="Top Projects" />
                <Grid>
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                        />
                    ))}
                </Grid>
            </Container>
            <Container>
                <SubHeading content="Blogs & Research" />
                <div className="grid grid-cols-2 gap-5">
                    {researchPapers.map((paper, index) => (
                        <WritingCard
                            key={index}
                            type="Research"
                            writing={paper}
                        />
                    ))}
                    {blogs.map((blog, index) => (
                        <WritingCard
                            key={index}
                            type="Blog"
                            writing={blog}
                        />
                    ))}
                </div>
            </Container>
        </main>
    )
}
