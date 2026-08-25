import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const articleCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
    schema: z.object({
        title: z.string(),
        featuredImage: z.string(),
        author: z.string(),
        publishDate: z.coerce.date(),
        isDraft: z.boolean().default(true),
        category: z.string(),
        tags: z.array(z.string()),
        likes: z.number().optional(),
        dislikes: z.number().optional(),
        views: z.number().optional(),
        slug: z.string().optional(),
    }),
});

const portfolioCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
    schema: z.object({
        title: z.string(),
        featuredImage: z.string(),
        projectBriefDescription: z.string(),
        screenshots: z.array(z.string()).optional(),
        screenshotsUniqueName: z.string().optional(),
        screenshotsCount: z.number().optional(),
        projectType: z.string(),
        publishDate: z.coerce.date(),
        isDraft: z.boolean().default(true),
        isStatus: z.string().default(""),
        techStack: z.array(z.string()),
        isProjectCompleted: z.boolean().default(true),
        projectDuration: z.string(),
        rating: z.number().optional(),
        projectLiveLink: z.string().optional(),
        projectRepoLink: z.string().optional(),
        clientReview: z.string().optional(),
        clientName: z.string().optional(),
        clientProfession: z.string().optional(),
        clientPic: z.string().optional(),
        slug: z.string().optional(),
    }),
});

const pagesCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
    schema: z.object({
        title: z.string(),
        publishDate: z.coerce.date(),
        isDraft: z.boolean().default(true),
        slug: z.string().optional(),
    }),
});

const codeHelpCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/code-help" }),
    schema: z.object({
        title: z.string(),
        metaDescription: z.string(),
        featuredImage: z.string().optional(),
        publishDate: z.coerce.date(),
        isDraft: z.boolean().default(true),
        tags: z.array(z.string()).optional(),
        slug: z.string().optional(),
    }),
});

export const collections = {
    blog: articleCollection,
    portfolio: portfolioCollection,
    pages: pagesCollection,
    "code-help": codeHelpCollection,
};