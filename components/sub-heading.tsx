interface SubHeadingProps {
    content: string
}

export const SubHeading = ({ content }: SubHeadingProps) => {
    return (
        <h3 className="text-4xl font-bold ">
            {content}
        </h3>
    )
}
