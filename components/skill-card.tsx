import classNames from "classnames"
import { Badge } from "@/components"

interface SkillCardProps {
    children: React.ReactNode,
    title: string,
    description: string,
    isFeatured?: boolean,
    isNew?: boolean,
    className: string
}

export const SkillCard = ({ children, title, description, isFeatured, isNew, className }: SkillCardProps) => {
    return (
        <section className={classNames(
            className,
            isFeatured && "bg-gradient-primary text-zinc-950",
            "bg-zinc-900 p-5 h-72 rounded-3xl overflow-hidden flex flex-col justify-between"
        )}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-medium">{title}</h3>
                {isNew && <Badge content="NEW" />}
            </div>
            {children}
            <p className={classNames(
                "max-w-lg",
                isFeatured ? "text-zinc-800" : "text-zinc-500"
            )}>{description}</p>
        </section>
    )
}
