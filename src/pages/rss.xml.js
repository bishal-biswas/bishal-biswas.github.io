import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  return rss({
    title: 'Bishal Biswas Personal Developer Portfolio Blog',
    description: 'Portfolio and blog of Bishal Biswas, a .NET and web developer from Kolkata.',
    site: context.site,
    items: articles.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.metaDescription,
      // Compute RSS link from post `id`
      // This example assumes all posts are rendered as `/blog/[id]` routes
      link: `/articles/${post.data.slug}/`,
    })),
  });
}