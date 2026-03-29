import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      companyImage: image().optional(),
      company: z.string(),
      role: z.string(),
      type: z.string().optional(),
      dateStart: z.coerce.date(),
      dateEnd: z.union([z.coerce.date(), z.string()]),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()),
      draft: z.boolean().optional(),
      demoUrl: z.string().optional(),
      repoUrl: z.string().optional(),
      coverImage: image().optional(),
      coverAlt: z.string(),
    }),
});

const legal = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { work, projects, legal };
