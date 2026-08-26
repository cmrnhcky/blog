import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('saying', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Cameron Hickey',
    description: 'A publication about discernment — drinks, running, gambling, fatherhood, and money.',
    site: context.site,
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      categories: [post.data.pillar],
      link: `/saying/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
