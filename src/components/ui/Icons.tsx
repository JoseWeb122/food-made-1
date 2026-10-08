import type { ReactNode } from "react";

type IconProps = { className?: string };

const Stroke = ({ children, className = "h-5 w-5" }: { children: ReactNode; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Solid = ({ children, className = "h-5 w-5" }: { children: ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    {children}
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </Stroke>
);

export const UserIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 21c1.5-4 4.2-6 7.5-6s6 2 7.5 6" />
  </Stroke>
);

export const BagIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 8h14l-1 12.5H6L5 8z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </Stroke>
);

export const MenuIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 9h16" />
    <path d="M4 15h11" />
  </Stroke>
);

export const CloseIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Stroke>
);

export const PlusIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 5v14M5 12h14" />
  </Stroke>
);

export const MinusIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12h14" />
  </Stroke>
);

export const ArrowIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 12h15M14 6l6 6-6 6" />
  </Stroke>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 12H5M10 6l-6 6 6 6" />
  </Stroke>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </Stroke>
);

export const CheckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Stroke>
);

export const ChevronIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 9l6 6 6-6" />
  </Stroke>
);

export const TrashIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
  </Stroke>
);

export const PinIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
    <circle cx="12" cy="10" r="2" />
  </Stroke>
);

export const MailIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </Stroke>
);

export const TruckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="17.5" r="1.5" />
    <circle cx="17" cy="17.5" r="1.5" />
  </Stroke>
);

export const LeafIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" />
    <path d="M5 19l8-8" />
  </Stroke>
);

export const SproutIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 21v-9" />
    <path d="M12 12c0-4 3-7 7-7 0 4-3 7-7 7z" />
    <path d="M12 14c0-3-2.5-5-6-5 0 3 2.5 5 6 5z" />
  </Stroke>
);

export const FlaskIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
    <path d="M7.5 15h9" />
  </Stroke>
);

export const ShieldIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </Stroke>
);

export const DropIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
  </Stroke>
);

export const StarIcon = ({ className = "h-3.5 w-3.5", filled = true }: IconProps & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.2}>
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" />
  </svg>
);

/* Social marks — kept minimal, drawn to match the line-icon set. */
export const InstagramIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </Stroke>
);

export const TikTokIcon = (p: IconProps) => (
  <Solid {...p}>
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
  </Solid>
);

export const YouTubeIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10.2 9.2v5.6l4.8-2.8z" fill="currentColor" />
  </Stroke>
);

export const PinterestIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10.8 15.2L9.6 20.5M12.6 9.4c1.9-1.8 5.4-.4 5 2.4-.3 2.2-2 3.6-3.8 3.4-1.2-.1-1.9-.9-1.9-1.9" />
  </Stroke>
);

export const SubstackIcon = (p: IconProps) => (
  <Solid {...p}>
    <path d="M4 3.5h16v3H4zM4 8.5h16v2H4zM4 12.5l8 4.5 8-4.5V20l-8-4.5L4 20z" />
  </Solid>
);

export const RedditIcon = (p: IconProps) => (
  <Stroke {...p}>
    <ellipse cx="12" cy="13.5" rx="8" ry="6" />
    <circle cx="18.6" cy="8.6" r="1.6" />
    <path d="M12 7.5l1-4 4 .9" />
    <circle cx="9" cy="13" r="0.9" fill="currentColor" />
    <circle cx="15" cy="13" r="0.9" fill="currentColor" />
    <path d="M9.2 16c1.6 1 4 1 5.6 0" />
  </Stroke>
);

export const socialIconMap = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  pinterest: PinterestIcon,
  substack: SubstackIcon,
  reddit: RedditIcon,
} as const;
