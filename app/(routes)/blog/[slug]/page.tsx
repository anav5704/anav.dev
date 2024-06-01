import { mdToHtml } from "@/lib/mdToHtml"
import { getContentBySlug } from "@/lib/api"
import { BLOGS_DIR } from "@/lib/constants"
import { ContentDetails } from "@/components"

export default async function SingleBlogPage({ params }: { params: { slug: string } }) {
    const blog = getContentBySlug(BLOGS_DIR, params.slug)
    const content = await mdToHtml(blog.content || "")

    return (
        <>
            <h1>{blog.title}</h1>
            <ContentDetails date={blog.date} />
            <article dangerouslySetInnerHTML={{ __html: content }} />
        </>
    )
}