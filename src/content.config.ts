import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

// Decap's simple (comma-separated) list widget refuses spaces and commas -
// decaporg/decap-cms#4646 - so these lists use its `field:` mode instead, which
// gives one proper text input per item. That mode writes objects
// ([{ value: "Tailwind CSS" }]) rather than plain strings, so accept either
// shape and hand the rest of the site a plain string[] as before.
const stringList = z
    .array(z.union([z.string(), z.record(z.string())]))
    .transform((items) =>
        items.map((item) => (typeof item === "string" ? item : Object.values(item)[0])),
    );

const articleCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
    schema: z.object({
        title: z.string(),
        featuredImage: z.string(),
        author: z.string(),
        publishDate: z.coerce.date(),
        isDraft: z.boolean().default(true),
        category: z.string(),
        tags: stringList,
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
        screenshots: stringList.optional(),
        screenshotsUniqueName: z.string().optional(),
        screenshotsCount: z.number().optional(),
        projectType: z.string(),
        publishDate: z.coerce.date(),
        isDraft: z.boolean().default(true),
        isStatus: z.string().default(""),
        techStack: stringList,
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
        tags: stringList.optional(),
        slug: z.string().optional(),
    }),
});

export const collections = {
    article: articleCollection,
    portfolio: portfolioCollection,
    pages: pagesCollection,
    "code-help": codeHelpCollection,
};