type Props = {
  icon: string;
  className?: string;
};

// Render stack icons from the SVG sprite only.
// Avoid importing `lucide-react` here to prevent bundling the whole icon set.
export default function StackIcon({ icon, className }: Props) {
  return (
    <svg height={22} width={22} className={className} aria-hidden>
      <use href={`/stack.svg#${icon}`} />
    </svg>
  );
}
