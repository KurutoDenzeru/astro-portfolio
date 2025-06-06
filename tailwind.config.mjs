import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
			fontFamily: {
				sans: ["Atkinson", ...defaultTheme.fontFamily.sans],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: "full",
					},
				},
			},
			rotate: {
				45: "45deg",
				135: "135deg",
				225: "225deg",
				315: "315deg",
			},
			animation: {
				twinkle: "twinkle 2s ease-in-out forwards",
				meteor: "meteor 3s ease-in-out forwards",
				wave: "wave 0.5s infinite",
			},
			keyframes: {
				twinkle: {
					"0%": {
						opacity: 0,
						transform: "rotate(0deg)",
					},
					"50%": {
						opacity: 1,
						transform: "rotate(180deg)",
					},
					"100%": {
						opacity: 0,
						transform: "rotate(360deg)",
					},
				},
				meteor: {
					"0%": {
						opacity: 0,
						transform: "translateY(200%)",
					},
					"50%": {
						opacity: 1,
					},
					"100%": {
						opacity: 0,
						transform: "translateY(0)",
					},
				},
				wave: {
					"0%, 100%": { transform: "rotate(0deg)" },
					"50%": { transform: "rotate(20deg)" },
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
