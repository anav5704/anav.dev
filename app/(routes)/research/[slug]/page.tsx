import { mdToHtml } from "@/lib/mdToHtml"
import { getContentBySlug } from "@/lib/api"
import { RESEARCH_DIR } from "@/lib/constants"
import { ContentDetails } from "@/components"

export default async function SingleResearchPage({ params }: { params: { slug: string } }) {
    const research = getContentBySlug(RESEARCH_DIR, params.slug)
    const content = await mdToHtml(research.content || "")


    return (
        <>
            <h1>{research.title}</h1>
            <ContentDetails date={research.date} />
            <article dangerouslySetInnerHTML={{ __html: content }} />
        </>
    )
}