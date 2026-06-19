import BookACallDialog from "@components/BookACallDialog";
import { Calendar } from "lucide-react";
import { useState } from "react";

export default function BookACallButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group glass-dock flex items-center gap-2 py-2 px-4 truncate-lg rounded-lg text-sm md:text-sm lg:text-base text-foreground hover:bg-foreground/5 blend cursor-pointer"
      >
        <span>Book a call</span>
        <Calendar size={16} strokeWidth={2} className="size-4 stroke-current" aria-hidden="true" />
      </button>
      <BookACallDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
