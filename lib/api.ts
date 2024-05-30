import { Blog, Project, Research } from "@/types/content"
import fs from "fs"
import matter from "gray-matter"
import { join } from "path"

import {
    BLOGS_DIR,
    PROJECTS_DIR,
    RESEARCH_DIR,
} from "./constants"

const projectsDirectory = join(process.cwd(), PROJECTS_DIR)
const blogsDirectory = join(process.cwd(), BLOGS_DIR)
const researchDirectory = join(process.cwd(), RESEARCH_DIR)

type Content = Project | Blog | Research

function getContentSlugs(directory: string) {
    return fs.readdirSync(directory)
}

function getContentBySlug(
    directory: string,
    slug: string
): Content {
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = join(directory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return { ...data, slug: realSlug, content } as Content
}

function getAllContent(directory: string): Project[] {
    const slugs = getContentSlugs(directory)
    const content = slugs
        .map((slug) => getContentBySlug(directory, slug))
        .sort((item1, item2) => (
            item1.date > item2.date ? -1 : 1
        ))
    return content
}

export function getAllProjects(): Project[] {
    return getAllContent(projectsDirectory)
}

export function getAllBlogs(): Project[] {
    return getAllContent(blogsDirectory)
}

export function getAllResearchPapers(): Project[] {
    return getAllContent(researchDirectory)
}
