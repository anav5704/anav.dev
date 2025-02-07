const template = ({ title, description }: { title: string, description: string }) => {
    return {
        type: "div",
        props: {
            style: {
                color: "white",
            },
            children: title + description,
        },

    }
}

export default template