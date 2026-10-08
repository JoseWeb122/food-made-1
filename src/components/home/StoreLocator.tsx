import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { stores, type Store } from "../../data/catalog";
import { EASE, scrollToId } from "../../lib/utils";
import { ArrowUpRightIcon, CheckIcon, PinIcon } from "../ui/Icons";
import { Reveal, SectionHeading } from "../ui/Primitives";

const REGIONS = ["All", "West", "Midwest", "East", "South"] as const;

const TONE: Record<Store["tone"], string> = {
  bark: "bg-bark text-ivory",
  sage: "bg-sage text-ivory",
  clay: "bg-clay text-ivory",
};

export default function StoreLocator() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stores.filter(
      (s) =>
        (region === "All" || s.region === region) &&
        (!q || `${s.name} ${s.city} ${s.state}`.toLowerCase().includes(q)),
    );
  }, [query, region]);

  const selected = stores.find((s) => s.id === selectedId) ?? null;

  const findStore = () => {
    setSearching(true);
    setStatus("");
    window.setTimeout(() => {
      setSearching(false);
      const n = filtered.length;
      setStatus(
        n > 0
          ? `${n} ${n === 1 ? "stockist" : "stockists"} ${query.trim() ? `matching “${query.trim()}”` : "across our network"}.`
          : "No stockists match that yet. Try a city, state or region.",
      );
      scrollToId("store-list", 0);
    }, 900);
  };

  return (
    <section id="stores" className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Stores We Are In"
            title={
              <>
                Find us on the <span className="text-stone">shelf.</span>
              </>
            }
          />
          <p className="max-w-sm text-[14px] leading-relaxed text-bark/65">
            Independent grocers, markets and wellness shops that stock IZHAR. Visit, taste, and bring a jar home.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Locator panel */}
          <Reveal className="lg:col-span-4">
            <div className="rounded-[26px] border border-bark/12 bg-linen p-6 md:p-8 lg:sticky lg:top-28">
              <label htmlFor="store-query" className="text-[11px] uppercase tracking-[0.2em] text-stone">
                City, state or store
              </label>
              <div className="mt-3 flex items-center gap-3 border-b border-bark/25 pb-3 focus-within:border-bark">
                <PinIcon className="h-4 w-4 shrink-0 text-stone" />
                <input
                  id="store-query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Portland or Seattle"
                  className="w-full bg-transparent text-[16px] placeholder:text-bark/35 focus:outline-none"
                />
              </div>

              <p className="mt-7 text-[11px] uppercase tracking-[0.2em] text-stone">Region</p>
              <div role="radiogroup" aria-label="Region" className="mt-3 flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="radio"
                    aria-checked={region === r}
                    onClick={() => setRegion(r)}
                    className={`rounded-full border px-4 py-2 text-[12px] transition-all duration-500 ${
                      region === r ? "border-bark bg-bark text-ivory" : "border-bark/20 hover:border-bark"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={findStore}
                disabled={searching}
                className="btn btn-primary mt-9 w-full"
              >
                {searching ? (
                  <span className="flex items-center gap-3">
                    <motion.span
                      className="h-3.5 w-3.5 rounded-full border border-ivory/30 border-t-ivory"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    />
                    Searching
                  </span>
                ) : (
                  "Find a Store"
                )}
              </button>
              <p className="mt-4 min-h-[2.5rem] text-[13px] leading-relaxed text-bark/70" aria-live="polite">
                {status}
              </p>

              {/* Selected store detail */}
              <AnimatePresence mode="wait">
                {selected && (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mt-8 border-t border-bark/12 pt-8"
                  >
                    <p className="eyebrow">Selected stockist</p>
                    <p className="display mt-3 text-3xl">{selected.name}</p>
                    <p className="mt-3 text-[14px] leading-relaxed text-bark/70">
                      {selected.address}
                      <br />
                      {selected.city}, {selected.state}
                      <br />
                      {selected.hours}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${selected.name} ${selected.address} ${selected.city} ${selected.state}`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost mt-6 !h-11 !text-[11px]"
                    >
                      Get directions <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Store list */}
          <div id="store-list" className="scroll-mt-28 lg:col-span-8">
            <div className="mb-6 flex items-center justify-between text-[12px] text-stone">
              <span className="tabular-nums">
                {filtered.length} of {stores.length} stores
              </span>
              {selected && (
                <button type="button" onClick={() => setSelectedId(null)} className="underline underline-offset-4 hover:text-bark">
                  Clear selection
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-[26px] border border-dashed border-bark/25 p-12 text-center">
                <p className="display text-3xl">No stockists here yet.</p>
                <p className="mt-3 text-[14px] text-bark/65">Try another region, or follow us to hear when we arrive.</p>
              </div>
            ) : (
              <motion.ul layout className="grid gap-4 md:grid-cols-2 md:gap-5">
                <AnimatePresence mode="popLayout" initial={false}>
                  {filtered.map((store) => {
                    const on = store.id === selectedId;
                    return (
                      <motion.li
                        key={store.id}
                        layout
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.7, ease: EASE }}
                      >
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => setSelectedId(on ? null : store.id)}
                          className={`group flex h-full w-full flex-col rounded-[22px] border p-6 text-left transition-all duration-700 md:p-7 ${
                            on ? "border-bark bg-linen shadow-soft" : "border-bark/12 bg-ivory hover:border-bark/40"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <span
                              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold tracking-[0.08em] ${TONE[store.tone]}`}
                              aria-hidden="true"
                            >
                              {store.initials}
                            </span>
                            <span
                              className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-700 ${
                                on ? "border-bark bg-bark text-ivory" : "border-bark/20 text-transparent"
                              }`}
                            >
                              <CheckIcon className="h-3.5 w-3.5" />
                            </span>
                          </div>
                          <h3 className="mt-6 text-[1.15rem] font-medium leading-snug">{store.name}</h3>
                          <p className="mt-1 text-[13px] text-stone">
                            {store.city}, {store.state} · {store.region}
                          </p>
                          <p className="mt-5 text-[13px] leading-relaxed text-bark/70">
                            {store.address}
                            <br />
                            {store.hours}
                          </p>
                          <span className="mt-auto pt-6 text-[11px] uppercase tracking-[0.18em] text-bark/60 transition-colors group-hover:text-bark">
                            {on ? "Selected" : "Select store"}
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
