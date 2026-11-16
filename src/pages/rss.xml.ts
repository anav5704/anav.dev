import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
    const blogs = await getCollection("blogs");
    const projects = await getCollection("projects");
    const items = [
        ...blogs.map((blog) => ({
            title: blog.data.title,
            description: blog.data.description,
            pubDate: blog.data.createdAt,
            link: `/blogs/${blog.id}`
        })),
        ...projects.map((project) => ({
            title: project.data.title,
            description: project.data.description,
            pubDate: project.data.createdAt,
            link: `/projects/${project.id}`
        }))
    ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

    return rss({
        title: "Anav Chand",
        description: "Projects and blog posts by Anav Chand.",
        site: context.site ?? "https://www.anav.dev",
        trailingSlash: false,
        items
    });
}
