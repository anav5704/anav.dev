import classNames from "classnames"

interface HeadingProps {
    children: React.ReactNode,
    className?: string
}

export const Heading = ({ children, className }: HeadingProps) => {
    return (
        <h1 className={classNames(
            className,
            "font-black text-6xl leading-none tracking-tighter text-center my-10"
        )}>
            {children}
        </h1>
    )
}
