import { Calendar } from "lucide-react";
import CopyUrl from "@components/CopyUrl";
import { long } from "@utils/getDate";

export default function BlogDetails({
    url,
    title,
    date
}: {
    url: string;
    title: string;
    date: Date;
}) {
    return (
        <header>
            <h1>{title}</h1>

            <div className="flex items-center gap-5">
                <p className="flex items-center gap-2">
                    <Calendar size={20} />
                    <time dateTime={date.toISOString()}>{long(date)}</time>
                </p>

                <CopyUrl url={url} label="Share Blog" />
            </div>
        </header>
    );
}
