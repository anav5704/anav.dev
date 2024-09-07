import { z, defineCollection } from "astro:content"

const experienceCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        company: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        present: z.boolean(),
    })
})

const skillsCollection = defineCollection({
    type: "content",
    schema: z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        examples: z.array(z.string())
    })
})

const projectsCollection = defineCollection({
    type: "content",
    schema: z.object({
        id: z.number(),
        title: z.string(),
        metaTitle: z.string(),
        description: z.string(),
        metaDescription: z.string(),
        featured: z.boolean(),
        createdAt: z.date(),
        updatedAt: z.date(),
        repo: z.string(),
        site: z.string()
    })
})

const blogsCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        createdAt: z.date(),
        updatedAt: z.date()
    })
})

const researchCollections = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        createdAt: z.date(),
        updatedAt: z.date()
    })
})

export const collections = {
    experience: experienceCollection,
    skills: skillsCollection,
    projects: projectsCollection,
    blogs: blogsCollection,
    research: researchCollections
}
