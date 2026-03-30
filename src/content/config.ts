import { defineCollection, z } from 'astro:content';

const dispatch = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    description: z.string().optional(),
  }),
});

const systems = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    impact: z.string(),
    technology: z.array(z.string()),
    description: z.string().optional(),
    logicDiagram: z.string().optional(),
  }),
});

const archive = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    originalUrl: z.string(),
    isLegacy: z.boolean(),
    description: z.string().optional(),
  }),
});

export const collections = { dispatch, systems, archive };
