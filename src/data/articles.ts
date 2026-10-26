import { getCollection, type CollectionEntry } from "astro:content";
import { filterFuturePosts, plainText, excerpt } from "./utils";

/**
 * Every listing layout on /articles (classic, masonry, magazine) shows the same
 * posts in the same order: published, not scheduled for the future, newest first.
 */
export async function getPublishedArticles() {
    const posts = await getCollection("article", ({ data }) => data.isDraft === false);
    posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
    return filterFuturePosts(posts) as CollectionEntry<"article">[];
}

/** Card summary: the meta description when there is one, otherwise the opening words of the body. */
export function getArticleSummary(post: CollectionEntry<"article">, len = 160) {
    return excerpt(post.data.metaDescription || plainText(post.body), len);
}

/**
 * The listing layouts, in the order the switcher shows them. `base` is the
 * route the layout's paginated pages live under.
 */
export const articleLayouts = [
    { key: "classic", label: "Classic", icon: "fa-solid fa-table-cells-large", base: "/articles" },
    { key: "masonry", label: "Masonry", icon: "fa-solid fa-grip", base: "/articles/masonry" },
    { key: "magazine", label: "Magazine", icon: "fa-solid fa-newspaper", base: "/articles/magazine" },
] as const;

export type ArticleLayoutKey = (typeof articleLayouts)[number]["key"];
