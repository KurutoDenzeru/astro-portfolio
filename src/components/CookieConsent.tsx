"use client";

import { useEffect, useState } from "react";
import { BarChart3, Cookie, Info, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

declare global {
	interface Window {
		__cf_beacon_loaded__?: boolean;
		__rybbit_loaded__?: boolean;
	}
}

type ConsentValue = "accepted" | "rejected" | null;

type CategoryCardProps = {
	description: string;
	icon: typeof ShieldCheck;
	isActive?: boolean;
	isLocked?: boolean;
	onToggle?: (checked: boolean) => void;
	title: string;
	valueLabel: string;
};

const STORAGE_KEY = "site:analytics:consent";
const DISMISSED_KEY = "site:analytics:dismissed";
const ALLOWED_ANALYTICS_ORIGINS: readonly string[] = ["https://kurtcalacday.vercel.app"];

function logConsent(message: string): void {
	console.log(`[CookieConsent] ${message}`);
}

function getStoredConsent(): ConsentValue {
	if (typeof window === "undefined") {
		return null;
	}

	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === "true") {
			return "accepted";
		}
		if (stored === "false") {
			return "rejected";
		}
	} catch {
		return null;
	}

	return null;
}

function getDismissedState(): boolean {
	if (typeof window === "undefined") {
		return false;
	}

	try {
		return window.localStorage.getItem(DISMISSED_KEY) === "true";
	} catch {
		return false;
	}
}

function shouldAllowAnalyticsOnOrigin(): boolean {
	try {
		const forced =
			window.location.search.includes("forceAnalytics=1") ||
			window.localStorage.getItem("site:analytics:force") === "true";

		return ALLOWED_ANALYTICS_ORIGINS.includes(window.location.origin) || forced;
	} catch {
		return false;
	}
}

function loadAnalytics(): void {
	if (typeof window === "undefined") {
		return;
	}

	if (!shouldAllowAnalyticsOnOrigin()) {
		return;
	}

	try {
		if (!window.__cf_beacon_loaded__) {
			const cloudflareScript = document.createElement("script");
			cloudflareScript.defer = true;
			cloudflareScript.src = "https://static.cloudflareinsights.com/beacon.min.js";
			cloudflareScript.setAttribute(
				"data-cf-beacon",
				'{"token": "b57650f711ec4244813b03101859b932"}',
			);
			cloudflareScript.onload = function handleLoad() {
				window.__cf_beacon_loaded__ = true;
			};
			document.head.appendChild(cloudflareScript);
		}
	} catch {
		/* noop */
	}

	try {
		if (!window.__rybbit_loaded__) {
			const rybbitScript = document.createElement("script");
			rybbitScript.defer = true;
			rybbitScript.src = "https://app.rybbit.io/api/script.js";
			rybbitScript.setAttribute("data-site-id", "a24aab4e28b1");
			rybbitScript.crossOrigin = "anonymous";
			rybbitScript.onload = function handleLoad() {
				window.__rybbit_loaded__ = true;
			};
			document.head.appendChild(rybbitScript);
		}
	} catch {
		/* noop */
	}
}

function persistConsent(value: ConsentValue): void {
	try {
		if (value === "accepted") {
			window.localStorage.setItem(STORAGE_KEY, "true");
			window.localStorage.removeItem(DISMISSED_KEY);
			loadAnalytics();
			return;
		}

		if (value === "rejected") {
			window.localStorage.setItem(STORAGE_KEY, "false");
			window.localStorage.removeItem(DISMISSED_KEY);
		}
	} catch {
		/* noop */
	}
}

function CategoryCard({
	description,
	icon: Icon,
	isActive = false,
	isLocked = false,
	onToggle,
	title,
	valueLabel,
}: CategoryCardProps) {
	return (
		<div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.03]">
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 gap-3">
					<div className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black dark:border-white/10 dark:bg-black dark:text-white">
						<Icon className="size-4" strokeWidth={2} />
					</div>
					<div className="min-w-0">
						<div className="flex items-center gap-2">
							<h3 className="text-sm font-medium text-black dark:text-white">{title}</h3>
							<span className="rounded-full border border-black/10 bg-white px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-black/70 dark:border-white/10 dark:bg-black dark:text-white/70">
								{valueLabel}
							</span>
						</div>
						<p className="mt-1 text-sm leading-6 text-black/65 dark:text-white/65">{description}</p>
					</div>
				</div>
				<Switch
					checked={isActive}
					disabled={isLocked}
					aria-label={`${title} cookie preference`}
					onCheckedChange={onToggle}
				/>
			</div>
		</div>
	);
}

export default function CookieConsent() {
	const [consent, setConsent] = useState<ConsentValue>(null);
	const [hasDismissedBanner, setHasDismissedBanner] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
	const [isDesktopBannerViewport, setIsDesktopBannerViewport] = useState(false);

	useEffect(() => {
		const storedConsent = getStoredConsent();
		const dismissed = getDismissedState();
		setConsent(storedConsent);
		setAnalyticsEnabled(storedConsent === "accepted");
		setHasDismissedBanner(dismissed);
		setHasMounted(true);

		if (storedConsent === "accepted") {
			loadAnalytics();
		}
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") {
			return undefined;
		}

		const mediaQuery = window.matchMedia("(min-width: 768px)");
		const syncViewport = (event?: MediaQueryListEvent) => {
			setIsDesktopBannerViewport(event ? event.matches : mediaQuery.matches);
		};

		syncViewport();
		mediaQuery.addEventListener("change", syncViewport);

		return () => {
			mediaQuery.removeEventListener("change", syncViewport);
		};
	}, []);

	const bannerVisible =
		hasMounted && isDesktopBannerViewport && consent === null && !hasDismissedBanner;
	const shouldShowSideTrigger = !bannerVisible && !isDialogOpen;

	const handleAcceptAll = () => {
		setAnalyticsEnabled(true);
		setConsent("accepted");
		setHasDismissedBanner(false);
		setIsDialogOpen(false);
		logConsent("Preferences saved: analytics enabled.");
		toast.success("Cookie preferences saved");
		persistConsent("accepted");
	};

	const handleSavePreferences = () => {
		const nextConsent = analyticsEnabled ? "accepted" : "rejected";
		setConsent(nextConsent);
		setHasDismissedBanner(false);
		setIsDialogOpen(false);
		logConsent(
			analyticsEnabled
				? "Preferences saved: analytics enabled."
				: "Preferences saved: analytics disabled.",
		);
		toast.success("Cookie preferences saved");
		persistConsent(nextConsent);
	};

	const handleDismissBanner = () => {
		try {
			window.localStorage.setItem(DISMISSED_KEY, "true");
		} catch {
			/* noop */
		}

		setHasDismissedBanner(true);
	};

	return (
		<>
			{bannerVisible ? (
				<div className="fixed bottom-24 right-4 z-20 w-[min(28rem,calc(100vw-6.5rem))] lg:bottom-8 lg:right-4">
					<div className="rounded-lg border border-black/10 bg-white/70 p-4 text-black shadow-lg shadow-black/5 backdrop-blur-2xl saturate-150 dark:border-white/20 dark:bg-black/50 dark:text-white dark:shadow-black/20">
						<div className="flex items-start justify-between gap-3">
							<div className="space-y-2">
								<div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-black/70 dark:border-white/10 dark:text-white/70">
									<Cookie className="size-3.5" strokeWidth={2} />
									Privacy Choices
								</div>
								<h2 className="text-base font-medium">Choose how this site uses cookies</h2>
								<p className="text-sm leading-6 text-black/65 dark:text-white/65">
									Essential cookies keep the site working. Optional analytics cookies help measure
									what people use so the experience can improve over time.
								</p>
							</div>
							<Button
								type="button"
								variant="ghost"
								size="icon-sm"
								onClick={handleDismissBanner}
								className="border border-black/10 bg-white/75 hover:bg-white dark:border-white/10 dark:bg-black/75 dark:hover:bg-black"
								aria-label="Dismiss cookie banner"
							>
								<span className="text-sm leading-none">×</span>
							</Button>
						</div>

						<div className="mt-4 flex flex-wrap gap-2">
							<Button type="button" onClick={handleAcceptAll} className="rounded-full px-4">
								Accept All
							</Button>
							<Button
								type="button"
								variant="ghost"
								onClick={() => setIsDialogOpen(true)}
								className="rounded-full px-4"
							>
								Manage Settings
							</Button>
						</div>
					</div>
				</div>
			) : null}

			<Dialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
			>
				{shouldShowSideTrigger ? (
					<DialogTrigger
						render={
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="fixed bottom-26 right-0 z-30 h-auto rounded-l-xl rounded-r-none border-r-0 border-black/10 bg-white/70 px-2.5 py-3 text-black/90 shadow-md shadow-black/5 backdrop-blur-2xl saturate-150 hover:bg-white/80 md:bottom-8 dark:border-white/20 dark:bg-black/50 dark:text-white/90 dark:shadow-black/20 dark:hover:bg-black/60"
								style={{ writingMode: "vertical-rl", textOrientation: "sideways" }}
							>
								<Cookie className="size-4" strokeWidth={2} />
								Cookie Settings
							</Button>
						}
					/>
				) : null}
				<DialogContent className="max-w-xl! border border-black/10 bg-white/95 p-0 dark:border-white/10 dark:bg-black/95">
					<div className="border-b border-black/10 p-4 dark:border-white/10">
						<DialogHeader>
							<DialogTitle className="flex items-center gap-2 text-lg text-black dark:text-white">
								<Info className="size-4" strokeWidth={2} />
								Cookie Settings
							</DialogTitle>
							<DialogDescription className="leading-6">
								Essential cookies are always on. Choose whether analytics can be used.
							</DialogDescription>
						</DialogHeader>
					</div>

					<div className="grid gap-4 px-4">
						<CategoryCard
							title="Strictly Necessary"
							description="Required for core functionality such as saving your privacy selection and serving the basic site experience."
							icon={ShieldCheck}
							isActive
							isLocked
							valueLabel="Always On"
						/>
						<CategoryCard
							title="Analytics"
							description="Allows privacy-friendly measurement tools to understand page usage, visits, and general traffic patterns."
							icon={BarChart3}
							isActive={analyticsEnabled}
							onToggle={setAnalyticsEnabled}
							valueLabel={analyticsEnabled ? "Enabled" : "Optional"}
						/>
					</div>

					<div className="flex flex-col gap-3 border-t border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between">
						<a
							href="/legal/privacy"
							className="text-sm text-black/65 underline underline-offset-4 hover:text-black dark:text-white/65 dark:hover:text-white"
						>
							Read the privacy policy
						</a>
						<div className="flex flex-wrap gap-2">
							<Button type="button" variant="outline" onClick={handleSavePreferences}>
								Save Preferences
							</Button>
							<Button type="button" onClick={handleAcceptAll}>
								Accept All
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
