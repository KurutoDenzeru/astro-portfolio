import { defineCollection, z } from "astro:content";

const work = defineCollection({
	type: "content",
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

// const blog = defineCollection({
// 	type: "content",
// 	schema: z.object({
// 		title: z.string(),
// 		summary: z.string(),
// 		date: z.coerce.date(),
// 		tags: z.array(z.string()),
// 		draft: z.boolean().optional(),
// 	}),
// });

const projects = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			date: z.coerce.date(),
			tags: z.array(z.string()),
			draft: z.boolean().optional(),
			demoUrl: z.string().optional(),
			repoUrl: z.string().optional(),
			coverImage: image(),
			coverAlt: z.string(),
		}),
});

const legal = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
	}),
});

export const collections = { work, projects, legal };
