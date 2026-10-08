import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Nutrition, Product } from "../../data/catalog";
import { useStore } from "../../context/StoreContext";
import { EASE } from "../../lib/utils";
import { CheckIcon } from "../ui/Icons";

/** Shared selection state for any product surface (card, quick view, detail, editorial). */
export function useProductSelection(product: Product) {
  const { addToCart } = useStore();
  const [flavor, setFlavor] = useState(product.flavors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const add = () => {
    addToCart(product.id, flavor, { qty });
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 2000);
  };

  return { flavor, setFlavor, qty, setQty, added, add };
}

export function FlavorPicker({
  flavors,
  value,
  onChange,
  dark = false,
  className = "",
}: {
  flavors: string[];
  value: string;
  onChange: (flavor: string) => void;
  dark?: boolean;
  className?: string;
}) {
  if (flavors.length <= 1) return null;
  return (
    <div role="radiogroup" aria-label="Flavor" className={`flex flex-wrap gap-2 ${className}`}>
      {flavors.map((flavor) => {
        const active = flavor === value;
        const base = "rounded-full border px-3.5 py-2 text-[12px] tracking-[0.02em] transition-all duration-500";
        const tone = dark
          ? active
            ? "border-sand bg-sand text-cacao"
            : "border-ivory/25 text-ivory/75 hover:border-ivory hover:text-ivory"
          : active
            ? "border-bark bg-bark text-ivory"
            : "border-bark/20 text-bark/75 hover:border-bark hover:text-bark";
        return (
          <button
            key={flavor}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(flavor)}
            className={`${base} ${tone}`}
          >
            {flavor}
          </button>
        );
      })}
    </div>
  );
}

export function AddToBagButton({
  added,
  onClick,
  className = "",
  label = "Add to Cart",
}: {
  added: boolean;
  onClick: () => void;
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-live="polite"
      className={`btn relative overflow-hidden ${added ? "!bg-moss !text-ivory" : "btn-primary"} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2"
          >
            <CheckIcon className="h-4 w-4" /> Added to Cart
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function NutritionTable({ nutrition, dark = false }: { nutrition: Nutrition; dark?: boolean }) {
  const rows: [string, string | number][] = [
    ["Calories", nutrition.calories],
    ["Protein", nutrition.protein],
    ["Total fat", nutrition.fat],
    ["Carbohydrates", nutrition.carbs],
    ["Fiber", nutrition.fiber],
    ["Natural sugars", nutrition.sugar],
  ];
  const line = dark ? "border-ivory/15" : "border-bark/12";
  return (
    <div>
      <p className={`mb-3 text-[12px] ${dark ? "text-ivory/60" : "text-stone"}`}>Per serving · {nutrition.serving}</p>
      <dl className="text-[14px]">
        {rows.map(([label, value]) => (
          <div key={label} className={`flex justify-between border-t py-3 ${line}`}>
            <dt className={dark ? "text-ivory/75" : "text-bark/75"}>{label}</dt>
            <dd className="tabular-nums font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
