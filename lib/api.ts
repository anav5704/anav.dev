import { Blog, Project, Research } from "@/types/content"
import fs from "fs"
import matter from "gray-matter"
import { join } from "path"

import {
    BLOGS_DIR,
    PROJECTS_DIR,
    RESEARCH_DIR,
} from "./constants"

type Content = Project | Blog | Research

function getContentSlugs(directory: string) {
    return fs.readdirSync(join(process.cwd(), directory))
}

export function getContentBySlug(
    directory: string,
    slug: string
): Content {
    const realSlug = slug.replace(/\.md$/, "")
    const path = join(process.cwd(), directory)
    const fullPath = join(path, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return { ...data, slug: realSlug, content } as Content
}

function getAllContent(directory: string): Project[] {
    const slugs = getContentSlugs(directory)
    const content = slugs
        .map((slug) => getContentBySlug(directory, slug))
        .sort((item1, item2) =>
            item1.date > item2.date ? -1 : 1
        )
    return content
}

export function getAllProjects(): Project[] {
    return getAllContent(PROJECTS_DIR)
}

export function getAllBlogs(): Project[] {
    return getAllContent(BLOGS_DIR)
}

export function getAllResearchPapers(): Project[] {
    return getAllContent(RESEARCH_DIR)
}
