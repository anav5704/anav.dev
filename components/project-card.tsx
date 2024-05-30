import { Project } from "@/types/content"
import classNames from "classnames"
import Link from "next/link"

interface ProjectCardProps {
    project: Project
}

export const ProjectCard = ({
    project,
}: ProjectCardProps) => {
    return (
        <Link href={"/project/" + project.slug}>
            <section
                className={classNames(
                    "card",
                    project.isFeatured && "featured"
                )}
            >
                <h3 className="text-2xl font-medium">
                    {project.title}
                </h3>
                <p
                    className={classNames(
                        "max-w-lg",
                        project.isFeatured
                            ? "text-zinc-800"
                            : "text-zinc-500"
                    )}
                >
                    {project.content}
                </p>
            </section>
        </Link>
    )
}
