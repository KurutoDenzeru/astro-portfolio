// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Site, Page, Links, Socials } from "@types";

// Global
export const SITE: Site = {
	TITLE: "Kurt Calacday",
	DESCRIPTION:
		"Interactive portfolio showcases information about myself, encompassing a diverse array of my work, various projects, extensive skills and rich professional experiences.",
	AUTHOR: "Kurt Calacday",
};

// Work Page
export const WORK: Page = {
	TITLE: "Work Experience",
	DESCRIPTION: "Places I have worked.",
};

// Blog Page
export const BLOG: Page = {
	TITLE: "Blog",
	DESCRIPTION: "Writing on topics I am passionate about.",
};

// Projects Page
export const PROJECTS: Page = {
	TITLE: "Projects",
	DESCRIPTION: "Recent projects I have worked on.",
};

// Search Page
export const SEARCH: Page = {
	TITLE: "Search",
	DESCRIPTION: "Search all posts and projects by keyword.",
};

// Links
export const LINKS: Links = [
	{
		TEXT: "Home",
		HREF: "/",
	},
	{
		TEXT: "Work",
		HREF: "/work",
	},
	// {
	// 	TEXT: "Blog",
	// 	HREF: "/blog",
	// },
	{
		TEXT: "Projects",
		HREF: "/projects",
	},
];

// Socials
export const SOCIALS: Socials = [
	{
		NAME: "Email",
		ICON: "email",
		TEXT: "kurtdenzel51@gmail.com",
		HREF: "mailto:kurtdenzel51@gmail.com",
	},
	{
		NAME: "Facebook",
		ICON: "facebook",
		TEXT: "Kurt Calacday",
		HREF: "https://www.facebook.com/kurtcalacday/",
	},
	{
		NAME: "Instagram",
		ICON: "instagram",
		TEXT: "krtclcdy",
		HREF: "https://www.instagram.com/krtclcdy/",
	},
	{
		NAME: "Github",
		ICON: "github",
		TEXT: "KurutoDenzeru",
		HREF: "https://github.com/KurutoDenzeru",
	},
	{
		NAME: "LinkedIn",
		ICON: "linkedin",
		TEXT: "Kurt Calacday",
		HREF: "https://www.linkedin.com/in/kurtcalacday/",
	},
];
