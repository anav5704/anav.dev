import { long } from "@utils/getDate";

export default function BlogCard({
    id,
    title,
    date
}: {
    id: string;
    title: string;
    date: string;
}) {
    const createdAt = new Date(date);

    return (
        <article>
            <a className="card" href={"/blogs/" + id}>
                <h4>{title}</h4>
                <p className="faded">
                    <time dateTime={createdAt.toISOString()}>
                        {long(createdAt)}
                    </time>
                </p>
            </a>
        </article>
    );
}
