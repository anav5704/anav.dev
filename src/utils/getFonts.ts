async function fetchFont(url: string, name: string, weight: 400 | 700 = 400) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch font ${name}: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return {
        name,
        data: arrayBuffer,
        weight,
        style: "normal" as const
    };
}

export async function getFonts() {
    const [Alice, Geist] = await Promise.all([
        fetchFont(
            "https://cdn.jsdelivr.net/fontsource/fonts/alice@latest/latin-400-normal.ttf",
            "Alice"
        ),
        fetchFont(
            "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-400-normal.ttf",
            "Geist Sans"
        )
    ]);

    return { Alice, Geist };
}
