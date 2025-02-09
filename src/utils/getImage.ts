interface Props {
    title: string;
    description: string;
}

export const getImage = ({ title, description }: Props) => {
    const queryParams = new URLSearchParams({ title, description });

    return "/api/og?" + queryParams;
};
