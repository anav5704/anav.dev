import { Blog, Research } from "@/types/content"
import classNames from "classnames"
import { Badge } from "./badge"
import Link from "next/link"

interface WritingCardProps {
    writing: Blog | Research,
    type: "Blog" | "Research"
}

export const WritingCard = ({
    writing,
    type
}: WritingCardProps) => {
    const slug = "/" + type.toLowerCase() + "/" + writing.slug
    const date = new Date(writing.date).toDateString()

    return (
        <Link href={slug}>
            <article className="card h-fit">
                <h3 className="text-xl font-medium mb-5">
                    {writing.title}
                </h3>
                <div className="flex items-center justify-between">
                    <p
                        className={classNames(
                            "max-w-lg",
                            writing.isFeatured
                                ? "text-zinc-800"
                                : "text-zinc-500"
                        )}
                    >
                        {date}
                    </p>
                    <Badge content={type.toUpperCase()} />
                </div>
            </article>
        </Link>
    )
}
