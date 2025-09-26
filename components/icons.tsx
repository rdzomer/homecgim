import type { SVGProps } from 'react';
import { Cog, Gem, MoreHorizontal, Trees, PanelTop, BookCopy } from 'lucide-react';

export function HydrogenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 16v6" />
      <path d="M12 2v6" />
      <path d="M16 12h6" />
      <path d="M2 12h6" />
    </svg>
  );
}

export const AppLogo = PanelTop;

export { Cog, Gem, MoreHorizontal, Trees, BookCopy };
