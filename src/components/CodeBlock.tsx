import { useRef, useState } from "react";
import { LANG_COLORS, FALLBACK_DOT } from "../utils/codeLangs.js";

const COLORS: Record<string, string> = LANG_COLORS;
const RESET_DELAY_MS = 1500;

export default function CodeBlock({
    lang,
    children
}: {
    lang: string;
    children: React.ReactNode;
}) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        const code =
            rootRef.current?.querySelector("pre code")?.textContent ?? "";
        if (!code) return;
        try {
            await navigator.clipboard.writeText(code);
        } catch {
            return;
        }
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), RESET_DELAY_MS);
    };

    return (
        <div ref={rootRef} className="codeblock">
            <div className="codeblock-header">
                <span className="codeblock-lang">
                    <span
                        className="codeblock-dot"
                        style={{ backgroundColor: COLORS[lang] ?? FALLBACK_DOT }}
                    />
                    {lang || "code"}
                </span>
                <button
                    type="button"
                    className="codeblock-copy"
                    onClick={handleCopy}
                    aria-label={`Copy ${lang || "code"} code to clipboard`}
                >
                    {isCopied ? "copied" : "copy"}
                </button>
            </div>
            {children}
        </div>
    );
}
