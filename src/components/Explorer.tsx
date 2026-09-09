import Fuse from "fuse.js";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import BlogCard from "@components/BlogCard";
import ProjectCard from "@components/ProjectCard";
import SearchInput from "@components/SearchInput";
import TagFilter from "@components/TagFilter";

export interface ExplorerItem {
    id: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
}

export default function Explorer({
    items,
    allTags,
    selectedTag,
    basePath,
    type,
    placeholder
}: {
    items: ExplorerItem[];
    allTags: string[];
    selectedTag: string | null;
    basePath: string;
    type: "blog" | "project";
    placeholder: string;
}) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const q = new URLSearchParams(window.location.search).get("q");
        if (q) setQuery(q);
    }, []);

    useEffect(() => {
        const url = new URL(window.location.href);
        if (query) url.searchParams.set("q", query);
        else url.searchParams.delete("q");
        window.history.replaceState(window.history.state, "", url);
    }, [query]);

    const fuse = useMemo(
        () =>
            new Fuse(items, {
                keys: [
                    { name: "title", weight: 0.5 },
                    { name: "description", weight: 0.3 },
                    { name: "tags", weight: 0.2 }
                ],
                threshold: 0.3,
                ignoreLocation: true
            }),
        [items]
    );

    const results =
        query.trim() === ""
            ? items
            : fuse.search(query).map((result) => result.item);

    return (
        <div className="space-y-4">
            <div className="flex gap-3">
                <div className="w-3/4">
                    <SearchInput
                        value={query}
                        onChange={setQuery}
                        placeholder={placeholder}
                    />
                </div>
                <div className="w-1/4">
                    <TagFilter
                        tags={allTags}
                        selected={selectedTag}
                        basePath={basePath}
                    />
                </div>
            </div>
            {results.length === 0 ? (
                <p className="faded">No results found for &quot;{query}&quot;.</p>
            ) : (
                <ul className="space-y-4">
                    <AnimatePresence initial={false} mode="popLayout">
                        {results.map((item) => (
                            <motion.li
                                key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                            >
                            {type === "blog" ? (
                                <BlogCard
                                    id={item.id}
                                    title={item.title}
                                    date={item.date}
                                />
                            ) : (
                                <ProjectCard
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                />
                            )}
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            )}
        </div>
    );
}
