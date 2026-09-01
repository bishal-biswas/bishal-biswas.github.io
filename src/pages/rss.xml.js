import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { excerpt, filterFuturePosts, plainText } from '../data/utils';

export async function GET(context) {
  // Same gate as /articles: the collection is registered as "article"
  // (singular), drafts stay out - isDraft defaults to true in the schema - and
  // anything scheduled for a future date waits its turn.
  let articles = await getCollection('article', ({ data }) => data.isDraft === false);
  articles = filterFuturePosts(articles);
  articles.sort(
    (a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf(),
  );

  return rss({
    title: 'Bishal Biswas Personal Developer Portfolio Blog',
    description: 'Portfolio and blog of Bishal Biswas, a .NET and web developer from Kolkata.',
    site: context.site,
    items: articles.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      // metaDescription is optional, so fall back to the opening of the article
      // rather than shipping an empty <description>.
      description: post.data.metaDescription?.trim() || excerpt(plainText(post.body)),
      link: `/articles/${post.data.slug}/`,
    })),
  });
}
