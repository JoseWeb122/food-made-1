import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { EASE, scrollToId } from "../../lib/utils";
import { Logo } from "../ui/Primitives";
import { BagIcon, MenuIcon, SearchIcon, UserIcon } from "../ui/Icons";

export const NAV_LINKS = [
  { label: "Shop", id: "shop" },
  { label: "Stores", id: "stores" },
  { label: "Collections", id: "collections" },
  { label: "Our Story", id: "story" },
  { label: "About", id: "about" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  const { totals, pulse, openCart, openSearch, setMenuOpen, showToast } = useStore();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-700 ease-premium ${
        scrolled ? "glass border-bark/10 shadow-[0_10px_30px_-22px_rgba(58,46,36,.4)]" : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto grid max-w-[1680px] grid-cols-[1fr_auto_1fr] items-center px-4 transition-[height] duration-700 ease-premium md:px-10 ${
          scrolled ? "h-16" : "h-20 md:h-24"
        }`}
      >
        {/* Left: menu (tablet/mobile) or first nav group (desktop) */}
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="-ml-2 flex h-11 w-11 items-center justify-center xl:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <nav aria-label="Primary" className="hidden xl:flex xl:items-center xl:gap-8">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <NavButton key={link.id} onClick={() => scrollToId(link.id)}>
                {link.label}
              </NavButton>
            ))}
          </nav>
        </div>

        {/* Centre: wordmark */}
        <button
          type="button"
          aria-label="IZHAR, back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="justify-self-center"
        >
          <Logo className={`transition-transform duration-700 ease-premium ${scrolled ? "scale-90" : "scale-100"}`} />
        </button>

        {/* Right: secondary nav + utility icons */}
        <div className="flex items-center justify-end gap-1 md:gap-2">
          <nav aria-label="Secondary" className="mr-3 hidden xl:flex xl:items-center xl:gap-8">
            {NAV_LINKS.slice(3).map((link) => (
              <NavButton key={link.id} onClick={() => scrollToId(link.id)}>
                {link.label}
              </NavButton>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Search"
            onClick={openSearch}
            className="flex h-11 w-11 items-center justify-center transition-opacity duration-500 hover:opacity-60"
          >
            <SearchIcon className="h-[1.2rem] w-[1.2rem]" />
          </button>
          <button
            type="button"
            aria-label="Account"
            onClick={() => showToast("Accounts and order tracking launch with the full store.")}
            className="hidden h-11 w-11 items-center justify-center transition-opacity duration-500 hover:opacity-60 sm:flex"
          >
            <UserIcon className="h-[1.2rem] w-[1.2rem]" />
          </button>
          <button
            type="button"
            aria-label={`Open bag, ${totals.count} item${totals.count === 1 ? "" : "s"}`}
            onClick={openCart}
            className="relative flex h-11 w-11 items-center justify-center transition-opacity duration-500 hover:opacity-60"
          >
            <BagIcon className="h-[1.2rem] w-[1.2rem]" />
            {totals.count > 0 && (
              <motion.span
                key={pulse}
                initial={{ scale: 1.45 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="absolute right-0 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-clay px-1 text-[10px] font-semibold tabular-nums text-ivory"
              >
                {totals.count}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}

function NavButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative py-2 text-[11px] uppercase tracking-[0.18em] text-bark/85 transition-colors duration-500 hover:text-bark"
    >
      {children}
      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-bark transition-transform duration-700 ease-premium group-hover:scale-x-100" />
    </button>
  );
}
