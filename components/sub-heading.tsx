interface SubHeadingProps {
    content: string
}

export const SubHeading = ({
    content,
}: SubHeadingProps) => {
    return (
        <h3 className="text-4xl font-bold mb-5 mt-20 tracking-tight">
            <span className="text-primary-gradient">#</span>
            {" "}{content}
        </h3>
    )
}
