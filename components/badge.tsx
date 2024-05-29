interface BadgeProps {
    content: string
}

export const Badge = ({ content }: BadgeProps) => {
    return (
        <span className="glow font-bold text-xs bg-gradient-primary rounded-full px-2 py-1 text-zinc-950">
            {content}
        </span>
    )
}
