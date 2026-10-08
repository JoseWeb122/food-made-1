import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../../context/StoreContext";
import { products } from "../../data/catalog";
import { EASE, money } from "../../lib/utils";
import { ArrowIcon, CheckIcon, SearchIcon } from "../ui/Icons";
import { CloseButton } from "../ui/Primitives";

const POPULAR = ["Granola", "Cacao", "Date bites", "Chia", "Matcha", "Almond butter"];

export default function SearchOverlay() {
  const { searchOpen, closeSearch, addToCart, openDetail } = useStore();
  const [query, setQuery] = useState("");
  const [justAdded, setJustAdded] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (searchOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 350);
      return () => window.clearTimeout(t);
    }
    setQuery("");
  }, [searchOpen]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const term = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term) return [];
    return products.filter((p) =>
      [p.name, p.subtitle, p.description, p.category, ...p.tags, ...p.flavors, ...p.collections]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [term]);

  const handleAdd = (id: string, flavor: string) => {
    addToCart(id, flavor, { silent: true });
    setJustAdded((s) => ({ ...s, [id]: true }));
    const t = window.setTimeout(() => setJustAdded((s) => ({ ...s, [id]: false })), 1800);
    timers.current.push(t);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          key="search"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-[70] flex flex-col bg-ivory/97 backdrop-blur-xl"
        >
          <div className="mx-auto flex w-full max-w-4xl items-center gap-4 px-5 pt-6 md:px-10 md:pt-10">
            <label htmlFor="site-search" className="flex flex-1 items-center gap-4 border-b border-bark/20 pb-4 focus-within:border-bark">
              <SearchIcon className="h-5 w-5 shrink-0 text-stone" />
              <input
                ref={inputRef}
                id="site-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jars, flavors, ingredients"
                autoComplete="off"
                className="w-full bg-transparent text-xl font-light placeholder:text-bark/35 focus:outline-none md:text-3xl"
              />
            </label>
            <CloseButton onClick={closeSearch} label="Close search" />
          </div>

          <div className="mx-auto mt-10 w-full max-w-4xl flex-1 overflow-y-auto px-5 pb-16 md:px-10">
            {!term && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
                <p className="eyebrow">Popular searches</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {POPULAR.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-bark/20 px-5 py-2.5 text-[14px] transition-colors duration-500 hover:border-bark hover:bg-bark hover:text-ivory"
                    >
                      {term}
                    </button>
                  ))}
                </div>
                <p className="mt-14 max-w-md text-[14px] leading-relaxed text-bark/60">
                  Search by product, flavor, ingredient or collection. Try “cacao”, “no sugar” or “snacks”.
                </p>
              </motion.div>
            )}

            {term && results.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="py-10">
                <p className="display text-4xl">No matches for “{query.trim()}”.</p>
                <p className="mt-4 text-[14px] text-bark/65">Try a broader word, or browse the full shop.</p>
                <button
                  type="button"
                  onClick={() => {
                    closeSearch();
                    setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 300);
                  }}
                  className="btn btn-ghost mt-8"
                >
                  Browse the shop <ArrowIcon className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {results.length > 0 && (
              <>
                <p className="eyebrow">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </p>
                <ul className="mt-6 divide-y divide-bark/10 border-y border-bark/10">
                  <AnimatePresence initial={false}>
                    {results.map((p) => (
                      <motion.li
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="flex items-center gap-4 py-4 md:gap-6"
                      >
                        <button
                          type="button"
                          onClick={() => openDetail(p.id)}
                          className="flex min-w-0 flex-1 items-center gap-4 text-left md:gap-6"
                        >
                          <span className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-linen md:h-24 md:w-20">
                            <img
                              src={p.image}
                              alt=""
                              className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                              style={{ objectPosition: p.imagePosition ?? "center" }}
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[15px] font-medium md:text-base">{p.name}</span>
                            <span className="mt-1 block truncate text-[13px] text-stone">{p.subtitle}</span>
                            <span className="mt-1 block text-[13px] tabular-nums">{money(p.price)}</span>
                          </span>
                        </button>

                        {p.soldOut ? (
                          <span className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-stone">Sold out</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAdd(p.id, p.flavors[0])}
                            className={`btn shrink-0 !h-11 !px-5 !text-[11px] ${justAdded[p.id] ? "!bg-moss !text-ivory" : "btn-primary"}`}
                          >
                            {justAdded[p.id] ? (
                              <>
                                <CheckIcon className="h-3.5 w-3.5" /> Added
                              </>
                            ) : (
                              "Add"
                            )}
                          </button>
                        )}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
