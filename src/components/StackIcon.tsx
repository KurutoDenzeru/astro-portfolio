type Props = {
  icon: string;
  className?: string;
};

// Simplified StackIcon — render the sprite only.
// Avoid importing `lucide-react` here to prevent bundling the entire icon
// library into this client chunk. Other parts of the app still import
// individual lucide icons where needed.
export default function StackIcon({ icon, className }: Props) {
  return (
    <svg height={22} width={22} className={className} aria-hidden>
      <use href={`/stack.svg#${icon}`} />
    </svg>
  );
}
