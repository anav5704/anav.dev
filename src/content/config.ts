import { z, defineCollection } from "astro:content"

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

const skillsCollection = defineCollection({
    type: "content",
    schema: z.object({
        id: z.number(),
        title: z.string(),
        examples: z.array(z.string())
    })
})

const certsCollection = defineCollection({
    type: "content",
    schema: z.object({
        id: z.number(),
        title: z.string(),
        organization: z.string(),
        url: z.string(),
        issuedAt: z.date()
    })
})

const experienceCollection = defineCollection({
    type: "content",
    schema: z.object({
        shortTitle: z.string(),
        longTitle: z.string(),
        company: z.string(),
        startDate: z.date(),
        type: z.enum(["Full-time", "Part-time", "Internship", "Volunteer"]),
        endDate: z.date(),
        present: z.boolean(),
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

export const collections = {
    projects: projectsCollection,
    skills: skillsCollection,
    certs: certsCollection,
    experience: experienceCollection,
    blogs: blogsCollection,
}
