import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { BUNDLE_STEPS, BUNDLE_TIERS, getProduct, products, type Product } from "../../data/catalog";
import { useStore } from "../../context/StoreContext";
import { EASE, money } from "../../lib/utils";
import { ArrowIcon, CheckIcon, TrashIcon } from "../ui/Icons";
import { QtyStepper, Reveal } from "../ui/Primitives";
import { FlavorPicker } from "../products/ProductControls";

type Selection = { flavor: string; qty: number };
type Selections = Record<string, Selection>;

export default function BundleBuilder() {
  const { addToCart, showToast, openCart } = useStore();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Selections>({});

  const current = BUNDLE_STEPS[step];
  const stepProducts = useMemo(
    () => products.filter((p) => p.category === current.category && !p.soldOut),
    [current.category],
  );

  const lines = useMemo(
    () => Object.entries(selections).map(([id, sel]) => ({ product: getProduct(id), ...sel })),
    [selections],
  );

  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const regular = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const tier = [...BUNDLE_TIERS].reverse().find((t) => count >= t.min) ?? null;
  const savings = Math.round(regular * (tier?.pct ?? 0) * 100) / 100;
  const bundlePrice = Math.round((regular - savings) * 100) / 100;
  const nextTier = BUNDLE_TIERS.find((t) => count < t.min) ?? null;
  const progress = Math.min(100, (count / 6) * 100);

  const toggle = (product: Product) =>
    setSelections((prev) => {
      const next = { ...prev };
      if (next[product.id]) delete next[product.id];
      else next[product.id] = { flavor: product.flavors[0], qty: 1 };
      return next;
    });

  const patch = (id: string, change: Partial<Selection>) =>
    setSelections((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], ...change } } : prev));

  const remove = (id: string) =>
    setSelections((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  const addBundle = () => {
    if (lines.length === 0) {
      showToast("Choose at least one jar to start your bundle.");
      return;
    }
    lines.forEach((l) => addToCart(l.product.id, l.flavor, { qty: l.qty, bundle: true, silent: true }));
    showToast(`Bundle added · you save ${money(savings)}`);
    setSelections({});
    openCart();
  };

  const stepDone = (category: string) => lines.some((l) => l.product.category === category);

  return (
    <section id="bundle" className="relative overflow-hidden bg-cacao py-28 text-ivory md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-16 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(164,105,74,0.30),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(125,140,112,0.22),transparent_62%)]"
      />

      <div className="relative mx-auto grid max-w-[1560px] gap-16 px-5 md:px-10 lg:grid-cols-[1.45fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow !text-sand">Bundle &amp; save</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display mt-5 text-[2.7rem] md:text-6xl lg:text-[4.4rem]">Build Your Own Bundle</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ivory/70">Choose your favorites. Mix your flavors. Save more.</p>
          </Reveal>

          {/* Step progress */}
          <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8">
            {BUNDLE_STEPS.map((s, i) => {
              const done = stepDone(s.category);
              const active = i === step;
              return (
                <button key={s.key} type="button" onClick={() => setStep(i)} aria-current={active} className="group text-left">
                  <span className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-ivory/50">
                    <span>Step {i + 1}</span>
                    {done && <CheckIcon className="h-3.5 w-3.5 text-sand" />}
                  </span>
                  <span
                    className={`mt-2 block text-[13px] transition-colors duration-700 md:text-[15px] ${
                      active ? "text-ivory" : "text-ivory/50 group-hover:text-ivory/85"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="relative mt-3 block h-px bg-ivory/15">
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-sand"
                      initial={false}
                      animate={{ width: active || done ? "100%" : "0%" }}
                      transition={{ duration: 0.9, ease: EASE }}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-14"
            >
              <p className="eyebrow !text-sand">
                Step {step + 1} · {current.hint}
              </p>
              <h3 className="display mt-3 text-3xl md:text-4xl">{current.title}</h3>

              <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
                {stepProducts.map((p) => (
                  <BundleTile
                    key={p.id}
                    product={p}
                    selection={selections[p.id]}
                    onToggle={() => toggle(p)}
                    onFlavor={(flavor) => patch(p.id, { flavor })}
                    onQty={(qty) => patch(p.id, { qty })}
                  />
                ))}
              </div>

              <div className="mt-14 flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="btn btn-light-ghost !h-12"
                >
                  Back
                </button>
                {step < BUNDLE_STEPS.length - 1 ? (
                  <button type="button" onClick={() => setStep((s) => s + 1)} className="btn btn-light !h-12">
                    Next: {BUNDLE_STEPS[step + 1].label} <ArrowIcon className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => document.getElementById("bundle-summary")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    className="btn btn-light !h-12"
                  >
                    Review bundle <ArrowIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Summary */}
        <aside id="bundle-summary" className="scroll-mt-28 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[26px] border border-ivory/15 bg-ivory/[0.04] p-6 backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between">
              <p className="eyebrow !text-sand">Your bundle</p>
              <span className="text-[12px] tabular-nums text-ivory/60">
                {count} {count === 1 ? "jar" : "jars"}
              </span>
            </div>

            <div className="mt-6">
              {lines.length === 0 ? (
                <p className="text-[14px] leading-relaxed text-ivory/55">
                  Your bundle is empty. Select a jar from Step 1 to begin. Three jars unlock 10% off, six unlock 15%.
                </p>
              ) : (
                <ul className="max-h-[22rem] divide-y divide-ivory/10 overflow-y-auto pr-1">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.product.id}
                        layout
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="flex items-center gap-4 py-4"
                      >
                        <img
                          src={l.product.image}
                          alt=""
                          className="h-14 w-12 shrink-0 rounded-lg object-cover"
                          style={{ objectPosition: l.product.imagePosition ?? "center" }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px]">{l.product.name}</p>
                          <p className="mt-0.5 text-[12px] text-ivory/55">
                            {l.flavor} · {money(l.product.price * l.qty)}
                          </p>
                        </div>
                        <QtyStepper value={l.qty} onChange={(qty) => patch(l.product.id, { qty })} dark className="h-9 origin-right scale-90" />
                        <button
                          type="button"
                          onClick={() => remove(l.product.id)}
                          aria-label={`Remove ${l.product.name}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory/50 transition-colors hover:text-ivory"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            <dl className="mt-6 space-y-3 border-t border-ivory/12 pt-6 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-ivory/65">Regular price</dt>
                <dd className="tabular-nums">{money(regular)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className={savings > 0 ? "text-sand" : "text-ivory/45"}>
                  Bundle savings{tier ? ` · ${tier.label}` : ""}
                </dt>
                <dd className={`tabular-nums ${savings > 0 ? "text-sand" : "text-ivory/45"}`}>
                  {savings > 0 ? `−${money(savings)}` : "—"}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex items-end justify-between border-t border-ivory/12 pt-6">
              <span className="text-[15px]">Your bundle</span>
              <motion.span
                key={bundlePrice}
                initial={{ opacity: 0.4, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="display text-5xl tabular-nums"
              >
                {money(bundlePrice)}
              </motion.span>
            </div>

            <div className="mt-7">
              <div className="flex justify-between text-[12px] text-ivory/65">
                <span>{nextTier ? `Add ${nextTier.min - count} more to unlock ${nextTier.label}` : "Top tier unlocked · 15% off"}</span>
                <span className="tabular-nums">{Math.min(count, 6)}/6</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-ivory/12">
                <motion.div
                  className="h-full rounded-full bg-sand"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.9, ease: EASE }}
                />
              </div>
              <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.16em] text-ivory/40">
                <span>3 jars · 10% off</span>
                <span>6 jars · 15% off</span>
              </div>
            </div>

            <button type="button" onClick={addBundle} className="btn btn-light mt-8 w-full">
              Add Bundle to Cart <ArrowIcon className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-[11px] text-ivory/45">The bundle discount applies to every bundled jar in your bag.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function BundleTile({
  product,
  selection,
  onToggle,
  onFlavor,
  onQty,
}: {
  product: Product;
  selection?: Selection;
  onToggle: () => void;
  onFlavor: (flavor: string) => void;
  onQty: (qty: number) => void;
}) {
  const on = Boolean(selection);
  return (
    <motion.div
      layout
      className={`flex flex-col rounded-[20px] border p-3 transition-colors duration-700 md:p-4 ${
        on ? "border-sand/70 bg-ivory/[0.07]" : "border-ivory/12"
      }`}
    >
      <button type="button" onClick={onToggle} aria-pressed={on} className="group block text-left">
        <span className="img-zoom relative block aspect-[4/5] overflow-hidden rounded-[14px] bg-cacao/40">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`h-full w-full object-cover transition-[opacity,transform] duration-1000 ${on ? "scale-[1.03] opacity-100" : "opacity-80"}`}
            style={{ objectPosition: product.imagePosition ?? "center" }}
          />
          <span
            className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-700 ${
              on ? "scale-100 bg-sand text-cacao" : "scale-90 border border-ivory/40 text-transparent"
            }`}
          >
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
        </span>
        <span className="mt-4 block text-[14px] font-medium leading-snug md:text-[15px]">{product.name}</span>
        <span className="mt-1 block text-[13px] text-ivory/60">
          {money(product.price)} · {product.weight}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {on && selection ? (
          <motion.div
            key="controls"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <FlavorPicker flavors={product.flavors} value={selection.flavor} onChange={onFlavor} dark className="gap-1.5" />
              <div className="mt-4 flex items-center justify-between gap-2">
                <QtyStepper value={selection.qty} onChange={onQty} dark className="h-10 origin-left scale-95" />
                <button
                  type="button"
                  onClick={onToggle}
                  className="text-[11px] uppercase tracking-[0.14em] text-ivory/60 underline-offset-4 transition-colors hover:text-ivory hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="select"
            type="button"
            onClick={onToggle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 h-10 rounded-full border border-ivory/25 text-[11px] uppercase tracking-[0.16em] transition-colors duration-500 hover:border-ivory hover:bg-ivory hover:text-cacao"
          >
            Select
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
