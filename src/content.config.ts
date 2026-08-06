import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Rocío Periago'),
    categories: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    featuredImage: z.string().optional(),
    excerpt: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    draft: z.boolean().default(false),
    comments: z.array(
      z.object({
        author: z.string(),
        date: z.coerce.date(),
        content: z.string(),
      })
    ).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, pages };