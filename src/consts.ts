// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Links, Page, Site, Socials } from "@types";

// Global
export const SITE: Site = {
	TITLE: "Kurt Calacday",
	DESCRIPTION:
		"Interactive portfolio showcasing information about myself, including a diverse range of work, various projects, extensive skills, and experience.",
	AUTHOR: "Kurt Calacday",
};

// Work Page
export const WORK: Page = {
	TITLE: "Work Experience",
	DESCRIPTION: "A concise overview of my professional roles, responsibilities, and key accomplishments.",
};

// Blog Page
// export const BLOG: Page = {
// 	TITLE: "Blog",
// 	DESCRIPTION: "Writing on topics I am passionate about.",
// };

// Projects Page
export const PROJECTS: Page = {
	TITLE: "Projects",
	DESCRIPTION: "A curated collection highlighting projects I've built, the technologies used, and their impact.",
};

// Search Page
export const SEARCH: Page = {
	TITLE: "Search",
	DESCRIPTION: "Search projects available on the site.",
};

export const Error: Page = {
	TITLE: "404 | Error",
	DESCRIPTION: "The page you're looking for couldn't be found; try checking the URL or return to the homepage.",
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
		TEXT: "calacdaykurt@gmail.com",
		HREF: "mailto:calacdaykurt@gmail.com",
	},
	{
		NAME: "Facebook",
		ICON: "facebook",
		TEXT: "Kurt Calacday",
		HREF: "https://www.facebook.com/krtclcdy/",
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
