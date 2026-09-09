import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from "@headlessui/react";
import { tagToSlug } from "@utils/tags";
import { navigate } from "astro:transitions/client";

const ALL_VALUE = "__all";

export default function TagFilter({
    tags,
    selected,
    basePath
}: {
    tags: string[];
    selected: string | null;
    basePath: string;
}) {
    return (
        <div className="relative">
            <Listbox
                value={selected}
                onChange={(tag: string | null) => {
                    if (tag === ALL_VALUE) {
                        navigate(basePath);
                    } else if (tag) {
                        navigate(`${basePath}/tags/${tagToSlug[tag]}`);
                    }
                }}
            >
                <ListboxButton
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            e.currentTarget.click();
                        }
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 border border-zinc-200 rounded-lg text-base md:text-lg bg-white cursor-pointer"
                >
                    <span className={selected === null ? "text-[#767676]" : ""}>
                        {selected === null ? "Tags" : selected}
                    </span>
                </ListboxButton>
                <ListboxOptions
                    transition
                    className="absolute z-10 mt-4 w-full border border-zinc-200 rounded-lg bg-white empty:invisible max-h-56 overflow-y-auto origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
                >
                    <ListboxOption
                        key={ALL_VALUE}
                        value={ALL_VALUE}
                        className="px-3 py-2 text-base md:text-lg data-focus:bg-zinc-100 cursor-pointer border-b border-zinc-200"
                    >
                        All
                    </ListboxOption>
                    {tags.map((tag) => (
                        <ListboxOption
                            key={tag}
                            value={tag}
                            className="px-3 py-2 text-base md:text-lg data-focus:bg-zinc-100 cursor-pointer"
                        >
                            {tag}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
}
