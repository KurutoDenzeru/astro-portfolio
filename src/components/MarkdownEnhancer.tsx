import { useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

type CopyCodeButtonProps = {
	getText: () => string;
};

async function copyText(text: string) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
		return;
	}

	const textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.setAttribute("readonly", "true");
	textArea.style.position = "absolute";
	textArea.style.opacity = "0";
	textArea.style.pointerEvents = "none";
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
}

function CopyCodeButton({ getText }: CopyCodeButtonProps) {
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current !== null) {
				window.clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleCopy = async () => {
		try {
			await copyText(getText());
			setCopied(true);
			toast.success("Code copied to clipboard");

			if (timeoutRef.current !== null) {
				window.clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = window.setTimeout(() => {
				setCopied(false);
				timeoutRef.current = null;
			}, 1800);
		} catch {
			toast.error("Copy failed. Please try again.");
		}
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			className={cn(
				"code-copy-button inline-flex size-8 items-center justify-center rounded-lg border border-black/10 bg-white/85 text-black transition-all duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/15 dark:bg-black/80 dark:text-white dark:hover:bg-black",
				copied ? "is-copied" : "",
			)}
			aria-label={copied ? "Code copied" : "Copy code"}
		>
			<span className="relative size-4">
				<Copy
					className={cn(
						"absolute inset-0 size-4 transition-all duration-300",
						copied ? "scale-75 -rotate-12 opacity-0" : "scale-100 opacity-100",
					)}
				/>
				<Check
					className={cn(
						"absolute inset-0 size-4 transition-all duration-300",
						copied ? "scale-100 opacity-100" : "scale-75 rotate-12 opacity-0",
					)}
				/>
			</span>
		</button>
	);
}

type MountedControl = {
	host: HTMLDivElement;
	owner: HTMLElement;
	root: Root;
};

export default function MarkdownEnhancer() {
	useEffect(() => {
		const mountedControls: MountedControl[] = [];
		const codeBlocks = document.querySelectorAll<HTMLElement>(
			"[data-enhance-codeblocks] pre",
		);

		for (const block of codeBlocks) {
			if (block.dataset.copyEnhanced === "true") {
				continue;
			}

			const code = block.querySelector("code");
			const getText = () => {
				const rawText = code?.textContent ?? block.textContent ?? "";
				return rawText.replace(/\n$/, "");
			};

			block.dataset.copyEnhanced = "true";
			block.classList.add("has-code-copy");

			const host = document.createElement("div");
			host.className = "code-copy-host";
			block.appendChild(host);

			const root = createRoot(host);
			root.render(<CopyCodeButton getText={getText} />);

			mountedControls.push({ host, owner: block, root });
		}

		return () => {
			for (const { host, owner, root } of mountedControls) {
				root.unmount();
				host.remove();
				delete owner.dataset.copyEnhanced;
				owner.classList.remove("has-code-copy");
			}
		};
	}, []);

	return null;
}
