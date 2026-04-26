import { useEffect, useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";

type ActiveImage = {
	alt: string;
	src: string;
};

const WORK_GALLERY_SELECTOR = "[data-work-gallery]";
function isEnhanceableImage(element: EventTarget | null): element is HTMLImageElement {
	return (
		element instanceof HTMLImageElement &&
		Boolean(element.src) &&
		element.closest(WORK_GALLERY_SELECTOR) !== null
	);
}

export default function WorkImageLightbox() {
	const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);

	useEffect(() => {
		const root = document.querySelector(WORK_GALLERY_SELECTOR);
		if (!(root instanceof HTMLElement)) return;

		const enhanceImages = () => {
			root.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
				if (image.dataset.workLightboxReady === "true") return;

				image.dataset.workLightboxReady = "true";
				image.tabIndex = 0;
				image.setAttribute("role", "button");
				image.setAttribute("aria-haspopup", "dialog");
				image.classList.add("work-lightbox-image");
			});
		};

		enhanceImages();

		const observer = new MutationObserver(() => {
			enhanceImages();
		});

		const handleClick = (event: MouseEvent) => {
			const target = event.target;
			if (!isEnhanceableImage(target)) return;

			setActiveImage({
				alt: target.alt || "Work image preview",
				src: target.currentSrc || target.src,
			});
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			const target = event.target;
			if (!isEnhanceableImage(target)) return;

			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				setActiveImage({
					alt: target.alt || "Work image preview",
					src: target.currentSrc || target.src,
				});
			}
		};

		observer.observe(root, { childList: true, subtree: true });
		root.addEventListener("click", handleClick);
		root.addEventListener("keydown", handleKeyDown);

		return () => {
			observer.disconnect();
			root.removeEventListener("click", handleClick);
			root.removeEventListener("keydown", handleKeyDown);
			root.querySelectorAll<HTMLImageElement>("img[data-work-lightbox-ready='true']").forEach((image) => {
				image.classList.remove("work-lightbox-image");
			});
		};
	}, []);

	return (
		<Dialog open={activeImage !== null} onOpenChange={(open) => !open && setActiveImage(null)}>
			<DialogContent
				showCloseButton
				className="max-w-5xl! border border-border bg-background p-3 dark:border-white/10 sm:p-4"
			>
				<DialogTitle className="sr-only">{activeImage?.alt ?? "Expanded work image"}</DialogTitle>
				<DialogDescription className="sr-only">
					Expanded preview for a work page image.
				</DialogDescription>
				{activeImage ? (
					<div className="overflow-hidden rounded-xl border border-border bg-foreground/[0.03]">
						<img
							src={activeImage.src}
							alt={activeImage.alt}
							className="max-h-[78vh] w-full object-contain"
						/>
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	);
}
