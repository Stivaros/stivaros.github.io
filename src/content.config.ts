import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/thoughts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    description: z.string().optional(),
  }),
});

const systems = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/systems' }),
  schema: z.object({
    title: z.string(),
    impact: z.string(),
    technology: z.array(z.string()),
    description: z.string().optional(),
    logicDiagram: z.string().optional(),
  }),
});

const archive = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/archive' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    originalUrl: z.string(),
    isLegacy: z.boolean(),
    description: z.string().optional(),
  }),
});

export const collections = { thoughts, systems, archive };
