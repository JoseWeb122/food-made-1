import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../../context/StoreContext";
import { getProduct, products } from "../../data/catalog";
import { ArrowLeftIcon, CheckIcon } from "../ui/Icons";
import { Logo, PriceLine, QtyStepper, Reveal, Stars } from "../ui/Primitives";
import { AddToBagButton, FlavorPicker, NutritionTable, useProductSelection } from "./ProductControls";
import ProductCard from "./ProductCard";
import { EASE } from "../../lib/utils";

const VIEWS = [
  { label: "Front", scale: 1, pos: "center" },
  { label: "Texture", scale: 1.9, pos: "25% 40%" },
  { label: "Close-up", scale: 2.6, pos: "70% 60%" },
];

export default function ProductDetail() {
  const { detailId, closeDetail, totals, openCart } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [detailId]);

  return (
    <AnimatePresence>
      {detailId && (
        <motion.div
          key="detail-overlay"
          ref={scrollRef}
          role="dialog"
          aria-modal="true"
          aria-label="Product details"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="fixed inset-0 z-[55] overflow-y-auto overscroll-contain bg-ivory"
        >
          <div className="glass sticky top-0 z-20 border-b border-bark/10">
            <div className="flex h-16 items-center justify-between px-5 md:px-10">
              <button
                type="button"
                onClick={closeDetail}
                className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-clay"
              >
                <ArrowLeftIcon className="h-4 w-4" /> <span className="hidden sm:inline">Back to shop</span>
                <span className="sm:hidden">Back</span>
              </button>
              <Logo className="scale-90" />
              <button type="button" onClick={openCart} className="text-[11px] uppercase tracking-[0.18em] tabular-nums">
                Bag ({totals.count})
              </button>
            </div>
          </div>

          <DetailContent key={detailId} productId={detailId} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailContent({ productId }: { productId: string }) {
  const { openNotify } = useStore();
  const product = getProduct(productId);
  const sel = useProductSelection(product);
  const [view, setView] = useState(0);
  const current = VIEWS[view];

  const related = useMemo(
    () =>
      [
        ...products.filter((p) => p.id !== product.id && p.category === product.category),
        ...products.filter((p) => p.id !== product.id && p.category !== product.category),
      ].slice(0, 3),
    [product.id, product.category],
  );

  return (
    <>
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 pb-40 pt-8 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:pb-32 lg:pt-14">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-linen md:aspect-[4/4.4]">
            <motion.img
              key={view}
              src={product.image}
              alt={`${product.name}, ${current.label.toLowerCase()} view`}
              initial={{ opacity: 0, scale: current.scale * 1.04 }}
              animate={{ opacity: 1, scale: current.scale }}
              transition={{ duration: 1.1, ease: EASE }}
              className="h-full w-full object-cover"
              style={{ objectPosition: view === 0 ? product.imagePosition ?? "center" : current.pos }}
            />
            <span className="glass absolute bottom-5 left-5 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-bark">
              {current.label}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {VIEWS.map((v, i) => (
              <button
                key={v.label}
                type="button"
                onClick={() => setView(i)}
                aria-pressed={view === i}
                aria-label={`Show ${v.label} view`}
                className={`relative aspect-square overflow-hidden rounded-2xl bg-linen transition-all duration-700 ${
                  view === i ? "ring-1 ring-bark ring-offset-4 ring-offset-ivory" : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={product.image}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ objectPosition: v.pos, transform: `scale(${v.scale})` }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Purchase column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">{product.category}</p>
            <h1 className="display mt-4 text-[2.9rem] md:text-6xl">{product.name}</h1>
            <p className="mt-4 text-lg font-light text-stone">{product.subtitle}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PriceLine price={product.price} compareAt={product.compareAt} size="lg" />
            <Stars rating={product.rating} reviews={product.reviews} />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-7 text-[15px] leading-[1.85] text-bark/75">{product.description}</p>
            <ul className="mt-7 space-y-3 border-t border-bark/10 pt-7">
              {product.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-[14px]">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          {!product.soldOut ? (
            <Reveal delay={0.2}>
              <div className="mt-9">
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone">Flavor · {sel.flavor}</p>
                <FlavorPicker flavors={product.flavors} value={sel.flavor} onChange={sel.setFlavor} />
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <QtyStepper value={sel.qty} onChange={sel.setQty} />
                <AddToBagButton added={sel.added} onClick={sel.add} className="hidden h-12 min-w-[12rem] flex-1 lg:inline-flex" />
              </div>
              <AddToBagButton
                added={sel.added}
                onClick={sel.add}
                className="mt-4 h-14 w-full lg:hidden"
              />
            </Reveal>
          ) : (
            <Reveal delay={0.2}>
              <p className="mt-9 text-[13px] text-stone">This batch has sold out. Be first in line for the next one.</p>
              <button type="button" onClick={() => openNotify(product.id)} className="btn btn-primary mt-5 w-full">
                Notify Me
              </button>
            </Reveal>
          )}

          <Reveal delay={0.25}>
            <p className="mt-8 text-[12px] leading-relaxed text-stone">
              {product.weight} · Ships within 24 hours · Complimentary shipping over $60
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="rounded-full border border-bark/15 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-bark/70">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Ingredients, nutrition, story */}
      <section className="mx-auto grid max-w-[1400px] gap-16 border-t border-bark/12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Ingredients</p>
          <h2 className="display mt-4 text-4xl">What is inside.</h2>
          <p className="mt-6 text-[15px] leading-[1.9] text-bark/75">{product.ingredients}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4">
          <p className="eyebrow">Nutrition</p>
          <h2 className="display mt-4 text-4xl">Dense, honestly labelled.</h2>
          <div className="mt-6">
            <NutritionTable nutrition={product.nutrition} />
          </div>
        </Reveal>
        <Reveal delay={0.2} className="lg:col-span-4">
          <p className="eyebrow">Brand story</p>
          <h2 className="display mt-4 text-4xl">Made slowly, on purpose.</h2>
          <p className="mt-6 text-[15px] leading-[1.9] text-bark/75">{product.story}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-linen md:aspect-[16/7]">
            <img src="/images/story.jpg" alt="Hands opening a fresh raw cacao pod" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="eyebrow">Related products</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">You may also love.</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Mobile sticky purchase bar */}
      <div className="glass fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-bark/10 px-5 py-4 lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium">{product.name}</p>
          <PriceLine price={product.price} compareAt={product.compareAt} className="mt-0.5" />
        </div>
        {product.soldOut ? (
          <button type="button" onClick={() => openNotify(product.id)} className="btn btn-primary !h-12 !px-6 !text-[11px]">
            Notify Me
          </button>
        ) : (
          <AddToBagButton added={sel.added} onClick={sel.add} className="!h-12 !px-5 !text-[11px]" />
        )}
      </div>
    </>
  );
}
