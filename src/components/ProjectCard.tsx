export default function ProjectCard({
    id,
    title,
    description
}: {
    id: string;
    title: string;
    description: string;
}) {
    return (
        <article>
            <a className="card" href={"/projects/" + id}>
                <h4>{title}</h4>
                <p className="faded no-underline">{description}</p>
            </a>
        </article>
    );
}
