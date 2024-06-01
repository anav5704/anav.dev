import classNames from "classnames"

interface ContainerProps {
    children: React.ReactNode
    className?: string
}

export const Container = ({
    children,
    className,
}: ContainerProps) => {
    return (
        <section
            className={classNames(
                className,
                "mx-auto w-3/4"
            )}
        >
            {children}
        </section>
    )
}
