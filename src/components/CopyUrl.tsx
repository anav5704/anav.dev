import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function CopyUrl({
    label,
    url
}: {
    label: string;
    url: string;
}) {
    const [isCopied, setIsCopied] = useState(false);

    const handleClick = () => {
        setIsCopied(true);
        navigator.clipboard.writeText(url);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    return (
        <button onClick={handleClick} className="cursor-pointer flex items-center gap-1">
            {isCopied ? (
                <>
                    <Check size={20} />
                    Link Copied
                </>
            ) : (
                <>
                    <Share2 size={20} />
                    {label}
                </>
            )}
        </button>
    );
}
