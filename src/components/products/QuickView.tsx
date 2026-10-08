import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { getProduct } from "../../data/catalog";
import { EASE } from "../../lib/utils";
import { CloseButton, PriceLine, QtyStepper, Stars } from "../ui/Primitives";
import { AddToBagButton, FlavorPicker, NutritionTable, useProductSelection } from "./ProductControls";

export default function QuickView() {
  const { quickViewId } = useStore();
  return <AnimatePresence>{quickViewId && <QuickViewDialog key={quickViewId} productId={quickViewId} />}</AnimatePresence>;
}

function QuickViewDialog({ productId }: { productId: string }) {
  const { closeQuickView, openDetail, openNotify } = useStore();
  const product = getProduct(productId);
  const sel = useProductSelection(product);
  const [tab, setTab] = useState<"ingredients" | "nutrition">("ingredients");

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center md:items-center md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <button
        type="button"
        aria-label="Close quick view"
        onClick={closeQuickView}
        className="absolute inset-0 bg-cacao/50 backdrop-blur-[3px]"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
        initial={{ y: 64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative grid max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-[28px] bg-ivory shadow-soft md:max-w-5xl md:grid-cols-2 md:rounded-[28px]"
      >
        <div className="relative aspect-[4/4.2] shrink-0 bg-linen md:aspect-auto md:min-h-[580px]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: product.imagePosition ?? "center" }}
          />
          {product.badge && (
            <span className="glass absolute left-5 top-5 rounded-full px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-bark">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-col p-6 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="eyebrow">{product.category}</p>
              <h2 className="display mt-3 text-3xl md:text-4xl">{product.name}</h2>
              <p className="mt-2 text-[13px] text-stone">{product.subtitle}</p>
            </div>
            <CloseButton onClick={closeQuickView} label="Close quick view" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <PriceLine price={product.price} compareAt={product.compareAt} size="lg" />
            <Stars rating={product.rating} reviews={product.reviews} />
          </div>

          <p className="mt-5 text-[15px] leading-[1.8] text-bark/75">{product.description}</p>

          {!product.soldOut ? (
            <div className="mt-7">
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone">Flavor · {sel.flavor}</p>
              <FlavorPicker flavors={product.flavors} value={sel.flavor} onChange={sel.setFlavor} />

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <QtyStepper value={sel.qty} onChange={sel.setQty} />
                <AddToBagButton added={sel.added} onClick={sel.add} className="h-12 min-w-[11rem] flex-1" />
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => openNotify(product.id)} className="btn btn-ghost mt-7 w-full">
              Sold out · Notify Me
            </button>
          )}

          <div className="mt-8 flex gap-7 border-b border-bark/12" role="tablist" aria-label="Product information">
            {(["ingredients", "nutrition"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`-mb-px border-b pb-3 text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 ${
                  tab === t ? "border-bark text-bark" : "border-transparent text-bark/50 hover:text-bark"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="min-h-[9rem] pt-6 text-[14px] leading-relaxed text-bark/75">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {tab === "ingredients" ? <p>{product.ingredients}</p> : <NutritionTable nutrition={product.nutrition} />}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => openDetail(product.id)}
            className="mt-auto self-start pt-6 text-[11px] uppercase tracking-[0.18em] underline underline-offset-8 transition-colors hover:text-clay"
          >
            View full details
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
