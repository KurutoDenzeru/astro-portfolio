import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { value: string; label?: React.ReactNode };

type Props = {
  options: Option[];
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  placeholder?: string;
  triggerClassName?: string;
  className?: string;
  size?: "sm" | "default";
};

export default function SimpleSelect({
  options,
  defaultValue,
  onValueChange,
  placeholder = "Select",
  triggerClassName,
  className,
  size = "default",
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => setValue(defaultValue), [defaultValue]);

  useEffect(() => {
    function onDocClick(e: Event) {
      if (!ref.current) return;
      const target = e.target as Node | null;
      if (!target) return;
      if (!ref.current.contains(target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick as EventListener);
    document.addEventListener("touchstart", onDocClick as EventListener);
    return () => {
      document.removeEventListener("mousedown", onDocClick as EventListener);
      document.removeEventListener("touchstart", onDocClick as EventListener);
    };
  }, []);

  function handleSelect(v: string) {
    setValue(v);
    if (onValueChange) onValueChange(v);
    setOpen(false);
  }

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        className={cn(
          "border-input flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none disabled:opacity-50",
          size === "sm" ? "h-8" : "h-9",
          "cursor-pointer",
          triggerClassName,
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          setOpen((s) => !s);
        }}
      >
        <span className={cn("truncate", !selected && "text-muted-foreground")}>{selected?.label ?? placeholder}</span>
        <ChevronDownIcon className="size-4 opacity-60" />
      </button>

      {open && (
        <ul
          role="listbox"
          className={cn(
            "absolute right-0 mt-2 w-40 rounded-md border bg-popover text-popover-foreground shadow-md z-50 py-1",
            className,
          )}
        >
          {options.map((opt) => (
            <li key={opt.value} role="option">
              <button
                type="button"
                className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-accent"
                onClick={() => handleSelect(opt.value)}
              >
                <span className="flex-1 text-left">{opt.label ?? opt.value}</span>
                {value === opt.value && <CheckIcon className="size-4 opacity-70" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
