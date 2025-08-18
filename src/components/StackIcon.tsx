import React from 'react';
import * as Lucide from 'lucide-react';

function toPascalCase(name: string) {
  return name
    .replace(/(^|-|_|\.)+(.)/g, (_m, _sep, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/[^A-Za-z0-9]/g, '');
}

type Props = {
  icon: string;
  className?: string;
};

export default function StackIcon({ icon, className }: Props) {
  const pascal = toPascalCase(icon);
  // Try to find the component on the lucide-react export
  // (this will include the package in the client bundle but keeps server simple)
  const Comp = (Lucide as any)[pascal] as React.ComponentType<any> | undefined;

  if (Comp) {
    return <Comp className={className} />;
  }

  // Fallback to the original sprite icon
  return (
    <svg height={22} width={22} className={className} aria-hidden>
      <use href={`/stack.svg#${icon}`} />
    </svg>
  );
}
