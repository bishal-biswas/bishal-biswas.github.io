import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { excerpt, filterFuturePosts, plainText } from "../data/utils";

// Static search index, generated at build time and fetched by /search.
// GitHub Pages can't run a search API, so the whole index ships as one file.

const MAX_BODY_CHARS = 600;

export const GET: APIRoute = async () => {
    const items: any[] = [];

    // ---- Articles
    let articles = await getCollection("article", ({ data }) => data.isDraft === false);
    articles = filterFuturePosts(articles);
    for (const entry of articles) {
        const body = plainText(entry.body);
        items.push({
            type: "Article",
            title: entry.data.title,
            url: `/articles/${entry.data.slug}/`,
            excerpt: excerpt(body),
            date: entry.data.publishDate,
            image: entry.data.image,
            imageBase: "/uploads/articles/",
            tags: [...new Set([entry.data.category, ...(entry.data.tags ?? [])])],
            body: body.slice(0, MAX_BODY_CHARS),
        });
    }

    // ---- Portfolio (URL is derived from the title, matching [slug].astro)
    const projects = await getCollection("portfolio", ({ data }) => data.isDraft === false);
    for (const entry of projects) {
        items.push({
            type: "Project",
            title: entry.data.title,
            url: `/portfolio/${entry.data.title.replaceAll(" ", "-").toLowerCase()}/`,
            excerpt: excerpt(entry.data.projectBriefDescription),
            date: entry.data.publishDate,
            image: entry.data.featuredImage,
            imageBase: "/uploads/portfolios/",
            tags: [...new Set([entry.data.projectType, ...(entry.data.techStack ?? [])])],
            body: plainText(entry.body).slice(0, MAX_BODY_CHARS),
        });
    }

    // ---- Code snippets
    const snippets = await getCollection("code-help", ({ data }) => data.isDraft === false);
    for (const entry of snippets) {
        items.push({
            type: "Snippet",
            title: entry.data.title,
            url: `/snippets/${entry.data.slug}/`,
            excerpt: excerpt(entry.data.metaDescription),
            date: entry.data.publishDate,
            tags: entry.data.tags ?? [],
            body: plainText(entry.body).slice(0, MAX_BODY_CHARS),
        });
    }

    // ---- Standalone pages (privacy policy, disclaimer, ...)
    const pages = await getCollection("pages", ({ data }) => data.isDraft === false);
    for (const entry of pages) {
        const body = plainText(entry.body);
        items.push({
            type: "Page",
            title: entry.data.title,
            url: `/${entry.data.slug}/`,
            excerpt: excerpt(body),
            date: entry.data.publishDate,
            tags: [],
            body: body.slice(0, MAX_BODY_CHARS),
        });
    }

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
    });
};
