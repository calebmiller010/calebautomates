import { defineCollection, z } from 'astro:content';

// Portfolio / case studies. Add a new case study by dropping a .mdx file in
// src/content/portfolio/ with this frontmatter — no layout code to touch.
const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Client name, or an anonymized descriptor if the client can't be named.
    client: z.string(),
    // One-to-two sentence teaser shown on the portfolio grid + homepage.
    summary: z.string(),
    // Lower = earlier in the list. Featured also floats to the top / homepage.
    order: z.number().default(99),
    featured: z.boolean().default(false),
    // Headline numbers rendered as a metric strip on the case-study page + card.
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(true),
  }),
});

// Blog / inbound articles. Drop a .md file in src/content/blog/ with this frontmatter.
// Evergreen — no dates in URLs (slug only); `order` controls list position.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // SEO meta description + list teaser (<=~155 chars).
    description: z.string(),
    // Lower = earlier in the list (newest/most-important first).
    order: z.number().default(99),
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(true),
  }),
});

export const collections = { portfolio, blog };
