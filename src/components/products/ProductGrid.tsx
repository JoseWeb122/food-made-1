import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { COLLECTION_TABS, products, type CollectionTab } from "../../data/catalog";
import { useStore } from "../../context/StoreContext";
import { EASE, scrollToId } from "../../lib/utils";
import { SectionHeading } from "../ui/Primitives";
import { ArrowIcon } from "../ui/Icons";
import CollectionFilter from "./CollectionFilter";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  collection,
  onCollection,
}: {
  collection: CollectionTab;
  onCollection: (tab: CollectionTab) => void;
}) {
  const { openCart } = useStore();

  const list = useMemo(
    () => products.filter((p) => collection === "all" || p.collections.includes(collection)),
    [collection],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const tab of COLLECTION_TABS) {
      map[tab.key] = products.filter((p) => tab.key === "all" || p.collections.includes(tab.key)).length;
    }
    return map;
  }, []);

  const activeLabel = COLLECTION_TABS.find((t) => t.key === collection)?.label ?? "All";

  return (
    <section id="shop" className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="The Shop"
            title={
              <>
                Every jar, <span className="text-stone">small-batch.</span>
              </>
            }
          />
          <p className="text-[13px] text-stone md:pb-3">
            Showing <span className="text-bark">{list.length}</span> {list.length === 1 ? "product" : "products"} · {activeLabel}
          </p>
        </div>

        <CollectionFilter active={collection} onChange={onCollection} counts={counts} />

        <motion.div
          layout
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-5 px-5 pb-8 md:mx-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-20 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="w-[80%] shrink-0 snap-start sm:w-[46%] md:w-auto"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bundle nudge — appears on the bundles tab */}
        <AnimatePresence>
          {collection === "bundles" && (
            <motion.div
              key="bundle-nudge"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-14 flex flex-col gap-6 rounded-[24px] border border-bark/12 bg-linen p-8 md:flex-row md:items-center md:justify-between md:p-10"
            >
              <div>
                <p className="eyebrow">Prefer to mix your own?</p>
                <p className="mt-3 text-xl font-light md:text-2xl">Build a bundle of any six jars and save up to 15%.</p>
              </div>
              <button type="button" onClick={() => scrollToId("bundle")} className="btn btn-primary shrink-0">
                Build Your Bundle <ArrowIcon className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-14 flex justify-center">
          <button type="button" onClick={openCart} className="btn btn-ghost">
            View your bag
          </button>
        </div>
      </div>
    </section>
  );
}
