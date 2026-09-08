import { Folder } from "lucide-react";
import CopyUrl from "@components/CopyUrl";

export default function ProjectDetails({
    url,
    title,
    repo
}: {
    url: string;
    title: string;
    repo: string;
}) {
    return (
        <header>
            <h1>{title}</h1>

            <p className="flex items-center gap-5">
                <a target="_blank" href={repo} className="flex items-center gap-1">
                    <Folder size={20} />
                    Source Code
                </a>

                <CopyUrl url={url} label="Share Project" />
            </p>
        </header>
    );
}
