import { motion } from "framer-motion";
import { COLLECTION_TABS, type CollectionTab } from "../../data/catalog";

export default function CollectionFilter({
  active,
  onChange,
  counts,
}: {
  active: CollectionTab;
  onChange: (tab: CollectionTab) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="relative mt-12 border-b border-bark/12">
      <div
        role="tablist"
        aria-label="Shop by collection"
        className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 pb-px md:mx-0 md:px-0"
      >
        {COLLECTION_TABS.map((tab) => {
          const on = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => onChange(tab.key)}
              className="relative shrink-0 px-4 pb-4 pt-2 text-[12px] uppercase tracking-[0.16em] transition-colors duration-700 md:px-5"
            >
              <span className={`relative z-10 flex items-center gap-2 ${on ? "text-bark" : "text-bark/50 hover:text-bark"}`}>
                {tab.label}
                <span className="text-[10px] tabular-nums text-stone">{counts[tab.key] ?? 0}</span>
              </span>
              {on && (
                <motion.span
                  layoutId="collection-underline"
                  className="absolute inset-x-3 bottom-0 h-px bg-bark"
                  transition={{ type: "spring", stiffness: 300, damping: 40 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
