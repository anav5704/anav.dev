interface GridProps {
    children: React.ReactNode
}

export const Grid = ({ children }: GridProps) => {
    return (
        <section className="grid grid-cols-3 gap-5">
            {children}
        </section>
    )
}
