import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { topicName, formName } from '../lib/taxonomy';

export async function GET(context) {
  const posts = await getCollection('saying', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Cameron Hickey',
    description: 'A publication about discernment — drink, fitness, money, style, fatherhood, and whatever else was on.',
    site: context.site,
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      // Both axes, when a form is set. Form is optional, so filter the gap.
      categories: [
        topicName(post.data.topic),
        post.data.form && formName(post.data.form),
      ].filter(Boolean),
      link: `/${post.data.topic}/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
