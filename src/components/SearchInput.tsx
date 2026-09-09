import { Input } from "@headlessui/react";

export default function SearchInput({
    value,
    onChange,
    placeholder
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) {
    return (
        <div className="relative">
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder ?? "Search"}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-base md:text-lg bg-white placeholder:text-[#767676]"
            />
        </div>
    );
}
