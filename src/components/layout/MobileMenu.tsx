import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../../context/StoreContext";
import { EASE, scrollToId } from "../../lib/utils";
import { CloseButton, Logo } from "../ui/Primitives";
import { BagIcon, SearchIcon, UserIcon, socialIconMap } from "../ui/Icons";
import { socialLinks } from "../../data/catalog";
import { NAV_LINKS } from "./Header";

export default function MobileMenu() {
  const { menuOpen, setMenuOpen, openSearch, openCart, showToast, totals } = useStore();

  const close = () => setMenuOpen(false);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ivory xl:hidden"
        >
          <div className="flex h-20 shrink-0 items-center justify-between px-5">
            <Logo />
            <CloseButton onClick={close} label="Close menu" />
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-5 py-6">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.9, ease: EASE }}
                onClick={() => {
                  close();
                  scrollToId(link.id, 160);
                }}
                className="flex items-baseline justify-between border-b border-bark/10 py-4 text-left"
              >
                <span className="display text-[2.5rem] leading-none">{link.label}</span>
                <span className="text-[11px] tabular-nums text-stone">0{i + 1}</span>
              </motion.button>
            ))}
          </nav>

          <div className="grid grid-cols-3 gap-3 px-5 pb-4">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              onClick={() => {
                close();
                openSearch();
              }}
              className="btn btn-ghost !h-14 !px-2 !text-[10px] !tracking-[0.12em]"
            >
              <SearchIcon className="h-4 w-4" /> Search
            </motion.button>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              onClick={() => showToast("Accounts and order tracking launch with the full store.")}
              className="btn btn-ghost !h-14 !px-2 !text-[10px] !tracking-[0.12em]"
            >
              <UserIcon className="h-4 w-4" /> Account
            </motion.button>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              onClick={() => {
                close();
                openCart();
              }}
              className="btn btn-primary !h-14 !px-2 !text-[10px] !tracking-[0.12em]"
            >
              <BagIcon className="h-4 w-4" /> Bag ({totals.count})
            </motion.button>
          </div>

          <div className="flex items-center justify-center gap-5 border-t border-bark/10 px-5 py-6">
            {socialLinks.slice(0, 4).map((s) => {
              const Icon = socialIconMap[s.icon as keyof typeof socialIconMap];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-bark/15 transition-colors duration-500 hover:border-bark"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
