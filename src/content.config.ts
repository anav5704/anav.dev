import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogsCollection = defineCollection({
    loader: glob({ base: "./src/content/blogs", pattern: "**/*.mdx" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        tags: z.array(z.string())
    })
});

const projectsCollection = defineCollection({
    loader: glob({ base: "./src/content/projects", pattern: "**/*.mdx" }),
    schema: z.object({
        title: z.string(),
        metaTitle: z.string(),
        description: z.string(),
        metaDescription: z.string(),
        featured: z.boolean(),
        createdAt: z.date(),
        repo: z.url(),
        site: z.url(),
        tags: z.array(z.string())
    })
});

const experienceCollection = defineCollection({
    loader: glob({ base: "./src/content/experience", pattern: "**/*.mdx" }),
    schema: z.object({
        shortTitle: z.string(),
        longTitle: z.string(),
        company: z.string(),
        startDate: z.date(),
        type: z.enum(["Full-time", "Part-time", "Internship", "Volunteer"]),
        endDate: z.date(),
        present: z.boolean()
    })
});

const skillsCollection = defineCollection({
    loader: glob({ base: "./src/content/skills", pattern: "**/*.mdx" }),
    schema: z.object({
        id: z.number(),
        title: z.string(),
        examples: z.array(z.string())
    })
});

const certsCollection = defineCollection({
    loader: glob({ base: "./src/content/certs", pattern: "**/*.mdx" }),
    schema: z.object({
        id: z.number(),
        title: z.string(),
        organization: z.string(),
        url: z.url(),
        issuedAt: z.date()
    })
});

export const collections = {
    projects: projectsCollection,
    skills: skillsCollection,
    certs: certsCollection,
    experience: experienceCollection,
    blogs: blogsCollection
};
