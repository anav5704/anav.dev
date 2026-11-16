import { Input } from "@headlessui/react";
import { useEffect, useRef } from "react";

export default function SearchInput({
    value,
    onChange,
    placeholder
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            const target = event.target;
            const typing =
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement ||
                (target instanceof HTMLElement && target.isContentEditable);

            if (
                event.key === "/" &&
                !typing &&
                !event.metaKey &&
                !event.ctrlKey &&
                !event.altKey
            ) {
                event.preventDefault();
                inputRef.current?.focus();
            }

            if (
                event.key === "Escape" &&
                document.activeElement === inputRef.current
            ) {
                onChange("");
                inputRef.current?.blur();
            }
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onChange]);

    return (
        <div className="search-bar">
            <Input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder ?? "Search"}
                aria-label={placeholder ?? "Search"}
                className="w-full px-3 py-2 pr-8 border border-zinc-200 rounded-lg text-base md:text-lg bg-white placeholder:text-[#767676]"
            />
            {value === "" && <kbd aria-hidden="true">/</kbd>}
        </div>
    );
}
