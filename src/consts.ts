// Place global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Links, Page, Site, Socials } from "./types";

// Global
export const SITE: Site = {
  TITLE: "Kurt Calacday",
  DESCRIPTION:
    "Portfolio of Kurt Calacday, a software engineer in the Philippines. Projects, work history, and full stack work built with Astro, React, TypeScript, and Tailwind.",
  AUTHOR: "Kurt Calacday",
};

// Work Page
export const WORK: Page = {
  TITLE: "Software Engineer Work Experience",
  DESCRIPTION:
    "Work history of Kurt Calacday, a software engineer in the Philippines. Roles in full stack engineering, data, and developer community work.",
};

// Projects Page
export const PROJECTS: Page = {
  TITLE: "Software Projects and Case Studies",
  DESCRIPTION:
    "Software projects by Kurt Calacday: web apps, dashboards, and tools built with React, Vue, TypeScript, and Tailwind.",
};

export const NOT_FOUND_PAGE: Page = {
  TITLE: "404 | Error",
  DESCRIPTION:
    "The page you're looking for couldn't be found; try checking the URL or return to the homepage.",
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
