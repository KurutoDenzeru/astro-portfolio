import { resolveTagOption } from "@lib/simpleIconTags";

type Props = {
  icon: string;
  className?: string;
};

const customSpriteIcons = new Set(["figma", "firebase", "linux"]);

export default function StackIcon({ icon, className }: Props) {
  const stackIcon = resolveTagOption(icon);
  const isInvertedBrand =
    stackIcon.iconSlug === "nextdotjs" ||
    stackIcon.iconSlug === "shadcnui" ||
    stackIcon.iconSlug === "tanstack";

  if (!customSpriteIcons.has(icon) && stackIcon.iconPath) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={`${className ?? ""} ${isInvertedBrand ? "text-black dark:text-white" : ""}`.trim()}
        style={!isInvertedBrand && stackIcon.iconHex ? { color: `#${stackIcon.iconHex}` } : undefined}
      >
        <path fill="currentColor" d={stackIcon.iconPath} />
      </svg>
    );
  }

  return (
    <svg height={22} width={22} className={className} aria-hidden>
      <use href={`/stack.svg#${icon}`} />
    </svg>
  );
}
