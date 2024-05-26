interface ContainerProps {
    children: React.ReactNode,
    className?: string
}

import classNames from "classnames"

export const Container = ({ children, className }: ContainerProps) => {
    return (
        <section className={classNames(
            className,
            "mx-auto w-1/2"
        )}>
            {children}
        </section>
    )
}
