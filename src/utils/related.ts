const TAG_WEIGHT = 0.25;
const SAME_KIND = 1.1;
const MAX_TAG_DF = 4;

export interface RelatedSource {
    id: string;
    data: {
        title: string;
        tags: string[];
        topics: string[];
        createdAt: Date;
    };
}

type Kind = "blogs" | "projects";

interface Entry {
    id: string;
    kind: Kind;
    title: string;
    tags: string[];
    topics: string[];
    createdAt: Date;
}

function toEntry(item: RelatedSource, kind: Kind): Entry {
    return {
        id: item.id,
        kind,
        title: item.data.title,
        tags: item.data.tags,
        topics: item.data.topics,
        createdAt: item.data.createdAt
    };
}

function documentFrequency(entries: Entry[], key: "topics" | "tags") {
    const counts = new Map<string, number>();
    for (const item of entries) {
        for (const value of new Set(item[key])) {
            counts.set(value, (counts.get(value) ?? 0) + 1);
        }
    }
    return counts;
}

function scoreValues(
    shared: string[],
    counts: Map<string, number>,
    total: number,
    weight: number
) {
    return shared.reduce((sum, value) => {
        const docs = counts.get(value) ?? 1;
        if (weight < 1 && docs > MAX_TAG_DF) return sum;
        return sum + Math.log(total / docs) * weight;
    }, 0);
}

export function relatedTo(
    kind: Kind,
    current: RelatedSource,
    blogs: RelatedSource[],
    projects: RelatedSource[]
) {
    const entries = [
        ...blogs.map((item) => toEntry(item, "blogs")),
        ...projects.map((item) => toEntry(item, "projects"))
    ];
    const source = toEntry(current, kind);
    const topicCounts = documentFrequency(entries, "topics");
    const tagCounts = documentFrequency(entries, "tags");
    const topics = new Set(source.topics);
    const tags = new Set(source.tags);

    return entries
        .filter((item) => item.kind !== source.kind || item.id !== source.id)
        .map((item) => {
            let score =
                scoreValues(
                    item.topics.filter((topic) => topics.has(topic)),
                    topicCounts,
                    entries.length,
                    1
                ) +
                scoreValues(
                    item.tags.filter((tag) => tags.has(tag)),
                    tagCounts,
                    entries.length,
                    TAG_WEIGHT
                );
            if (item.kind === source.kind) score *= SAME_KIND;
            return { item, score };
        })
        .filter((item) => item.score >= 1)
        .sort(
            (a, b) =>
                b.score - a.score ||
                b.item.createdAt.getTime() - a.item.createdAt.getTime()
        )
        .slice(0, 3)
        .map((item) => ({
            href: `/${item.item.kind}/${item.item.id}`,
            title: item.item.title
        }));
}
