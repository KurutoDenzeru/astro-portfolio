import { Clock, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MEETING_OPTIONS = [
  {
    duration: "30 min",
    label: "Quick Chat",
    description: "A brief sync to discuss your project or idea.",
    url: "https://cal.eu/kurtcalacday/30min",
  },
  {
    duration: "1 hr",
    label: "Deep Dive",
    description: "A longer session for in-depth discussion or consultation.",
    url: "https://cal.eu/kurtcalacday/1-hr-meeting",
  },
] as const;

type BookACallDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function BookACallDialog({ open, onOpenChange }: BookACallDialogProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (open) {
      // Focus first option after dialog animation completes
      const timer = setTimeout(() => {
        optionRefs.current[0]?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const focusedIndex = optionRefs.current.indexOf(document.activeElement);

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = focusedIndex < MEETING_OPTIONS.length - 1 ? focusedIndex + 1 : 0;
      optionRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = focusedIndex > 0 ? focusedIndex - 1 : MEETING_OPTIONS.length - 1;
      optionRefs.current[prev]?.focus();
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>Book a Call</DialogTitle>
          <DialogDescription>Choose a meeting length that fits your needs.</DialogDescription>
        </DialogHeader>
        <div
          ref={listRef}
          className="grid gap-3"
          role="listbox"
          aria-label="Meeting duration options"
          onKeyDown={handleKeyDown}
        >
          {MEETING_OPTIONS.map((option, index) => (
            <a
              key={option.duration}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              role="option"
              tabIndex={index === 0 ? 0 : -1}
              aria-selected={index === 0}
              className="group flex items-start gap-4 rounded-lg border border-border/60 bg-muted/30 p-4 transition-all duration-150 hover:border-foreground/15 hover:bg-muted/60 focus-visible:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none dark:hover:bg-white/[0.04]"
            >
              <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/80 transition-colors group-hover:border-foreground/15 group-hover:bg-muted/60 dark:border-white/10 dark:bg-white/5">
                <Clock className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{option.label}</span>
                  <span className="rounded-md border border-border/50 bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {option.duration}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {option.description}
                </p>
              </div>
              <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
