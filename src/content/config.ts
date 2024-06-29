import { z, defineCollection } from "astro:content";

const skillsCollection = defineCollection({
    type: "content",
    schema: z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        examples: z.array(z.string())
    })
});

const projectsCollection = defineCollection({
    type: "content",
    schema: z.object({
        id: z.number(),
        title: z.string(),
        metaTitle: z.string(),
        description: z.string(),
        metaDescription: z.string(),
        repo: z.string(),
        site: z.string()
    })
});

const blogsCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        // description: z.string(),
        date: z.date(),
        featured: z.boolean()
    })
});

const researchCollections = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        featured: z.boolean()
    })
});

export const collections = {
    skills: skillsCollection,
    projects: projectsCollection,
    blogs: blogsCollection,
    research: researchCollections
};
