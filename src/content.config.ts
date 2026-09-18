import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

// Decap's simple (comma-separated) list widget refuses spaces and commas -
// decaporg/decap-cms#4646 - so these lists use its `field:` mode instead, which
// gives one proper text input per item. That mode writes objects
// ([{ value: "Tailwind CSS" }]) rather than plain strings, so accept either
// shape and hand the rest of the site a plain string[] as before.
const stringList = z
    .array(z.union([z.string(), z.record(z.string(), z.string())]))
    .transform((items) =>
        items.map((item) => (typeof item === "string" ? item : Object.values(item)[0])),
    );

const articleCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
    schema: z.object({
        title: z.string(),
        image: z.string(),
        metaDescription: z.string().optional(),
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
        metaDescription: z.string().optional(),
        featuredImage: z.string(),
        projectBriefDescription: z.string(),
        screenshots: stringList.optional(),
        screenshotsUniqueName: z.string().optional(),
        screenshotsCount: z.number().optional(),
        categories: stringList,
        publishDate: z.coerce.date(),
        isDraft: z.boolean().default(true),
        isFeatured: z.boolean().default(false),
        workType: z.string().default(""),
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
        metaDescription: z.string().optional(),
        publishDate: z.coerce.date(),
        isDraft: z.boolean().default(true),
        slug: z.string().optional(),
    }),
});

const codeHelpCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/code-help" }),
    schema: z.object({
        title: z.string(),
        metaDescription: z.string().optional(),
        featuredImage: z.string().optional(),
        publishDate: z.coerce.date(),
        isDraft: z.boolean().default(true),
        tags: stringList.optional(),
        slug: z.string().optional(),
    }),
});

// Services offered, one page each at /services/<slug>/. The homepage cards
// read from this collection too, so a service is written once.
const servicesCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
    schema: z.object({
        title: z.string(),
        slug: z.string().optional(),
        metaDescription: z.string().optional(),
        iconClass: z.string().default("fa-solid fa-code"),
        shortDescription: z.string(),
        servicePoints: stringList.default([]),
        featuredImage: z.string().optional(),
        startingPrice: z.string().optional(),
        ctaText: z.string().optional(),
        ctaLink: z.string().optional(),
        // Up to three pricing tiers, rendered as a grid on the service page.
        // Empty list = no pricing section.
        pricingPlans: z
            .array(
                z.object({
                    name: z.string(),
                    price: z.string(),
                    billingNote: z.string().optional(),
                    description: z.string().optional(),
                    features: stringList.default([]),
                    isHighlighted: z.boolean().default(false),
                    ctaText: z.string().optional(),
                    ctaLink: z.string().optional(),
                }),
            )
            .max(3)
            .default([]),
        // Lower numbers come first on /services and the homepage.
        order: z.number().default(0),
        publishDate: z.coerce.date(),
        isDraft: z.boolean().default(true),
    }),
});

// Products, one page each at /products/<slug>/, grouped by category on the
// index. `category` is free text so a new category never fails the build; the
// curated list (order, icons, blurbs) lives in src/data/site-data/content.js.
const productsCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
    schema: z.object({
        title: z.string(),
        slug: z.string().optional(),
        metaDescription: z.string().optional(),
        shortDescription: z.string(),
        image: z.string().optional(),
        gallery: stringList.optional(),
        category: z.string().default("Software"),
        price: z.string().optional(),
        productLink: z.string().optional(),
        productLinkText: z.string().optional(),
        tags: stringList.optional(),
        isFeatured: z.boolean().default(false),
        publishDate: z.coerce.date(),
        isDraft: z.boolean().default(true),
    }),
});

export const collections = {
    article: articleCollection,
    portfolio: portfolioCollection,
    pages: pagesCollection,
    "code-help": codeHelpCollection,
    services: servicesCollection,
    products: productsCollection,
};