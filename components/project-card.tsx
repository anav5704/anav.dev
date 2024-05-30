import { Project } from '@/types/project'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
    project: Project,
}
``
export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <Link href={"/projects/" + project.slug}>
            <section className={classNames(
                "card flex items-center justify-center gap-3",
                project.isFeatured && "featured",
            )}>
                <Image
                    src={project.image.toString()}
                    alt={project.title}
                    height={75}
                    width={75}
                />
                <h3 className='text-2xl font-medium'>{project.title}</h3>
            </section>
        </Link>
    )
}
