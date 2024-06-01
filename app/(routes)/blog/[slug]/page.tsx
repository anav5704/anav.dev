import { mdToHtml } from "@/lib/mdToHtml"
import { getContentBySlug } from "@/lib/api"
import { BLOGS_DIR } from "@/lib/constants"

export default async function SingleBlogPage({ params }: { params: { slug: string } }) {
    const blog = getContentBySlug(BLOGS_DIR, params.slug)
    const content = await mdToHtml(blog.content || "")
    const date = new Date(blog.date).toDateString()

    return (
        <div>
            <h2 className="text-4xl font-bold mb-5 tracking-tight">
                {blog.title}
            </h2>
            <p className="text-lg mb-10">By <span className="text-primary-accent underline">Anav Chand</span> - {date}</p>
            <article
                id="content"
                dangerouslySetInnerHTML={{ __html: content }}
            />

        </div>
    )
}