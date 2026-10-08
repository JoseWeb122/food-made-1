import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, money } from "../../lib/utils";
import { useStore } from "../../context/StoreContext";
import { CloseIcon, MinusIcon, PlusIcon, StarIcon } from "./Icons";

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${tone === "light" ? "text-ivory" : "text-bark"} ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
        <circle cx="16" cy="16" r="14.5" opacity="0.45" />
        <path d="M9.5 23c0-7.5 4.2-12.5 13-13 0 7.5-4.2 12.5-13 13z" fill="currentColor" stroke="none" opacity="0.9" />
        <path d="M9.5 23l7-7.2" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[1.02rem] font-semibold tracking-[0.42em]">IZHAR</span>
        <span className="mt-1.5 text-[8px] uppercase tracking-[0.36em] opacity-60">Organic Food House</span>
      </span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  dark = false,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      <Reveal>
        <p className={`eyebrow ${dark ? "!text-sand" : ""}`}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="display mt-5 text-[2.6rem] leading-[1.02] md:text-6xl lg:text-[4.25rem]">{title}</h2>
      </Reveal>
      {body && (
        <Reveal delay={0.2}>
          <div className={`mt-6 max-w-xl text-[15px] leading-[1.8] md:text-base ${dark ? "text-ivory/70" : "text-bark/70"} ${align === "center" ? "mx-auto" : ""}`}>
            {body}
          </div>
        </Reveal>
      )}
    </div>
  );
}

export function Stars({ rating, reviews, className = "" }: { rating: number; reviews?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-[12px] text-bark/70 ${className}`} aria-label={`Rated ${rating} out of 5`}>
      <span className="flex gap-0.5 text-clay">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} filled={i <= Math.round(rating)} className="h-3 w-3" />
        ))}
      </span>
      <span className="tabular-nums">
        {rating.toFixed(1)}
        {reviews !== undefined && <span className="text-stone"> · {reviews.toLocaleString()} reviews</span>}
      </span>
    </div>
  );
}

export function PriceLine({
  price,
  compareAt,
  className = "",
  size = "base",
  dark = false,
}: {
  price: number;
  compareAt?: number;
  className?: string;
  size?: "base" | "lg";
  dark?: boolean;
}) {
  const onSale = compareAt !== undefined && compareAt > price;
  return (
    <div className={`flex items-baseline gap-2.5 ${className}`}>
      <span className={`${size === "lg" ? "text-3xl" : "text-[15px]"} font-medium tabular-nums`}>{money(price)}</span>
      {onSale && (
        <span className={`text-[13px] line-through tabular-nums ${dark ? "text-ivory/45" : "text-stone"}`}>{money(compareAt!)}</span>
      )}
    </div>
  );
}

export function QtyStepper({
  value,
  onChange,
  max = 10,
  dark = false,
  className = "",
}: {
  value: number;
  onChange: (next: number) => void;
  max?: number;
  dark?: boolean;
  className?: string;
}) {
  const border = dark ? "border-ivory/25 text-ivory" : "border-bark/20 text-bark";
  const btn = `flex h-11 w-11 items-center justify-center transition-colors duration-500 hover:opacity-60 disabled:opacity-25`;
  return (
    <div className={`inline-flex h-12 items-center rounded-full border ${border} ${className}`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        className={btn}
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
      >
        <MinusIcon className="h-3.5 w-3.5" />
      </button>
      <span className="relative flex w-8 justify-center overflow-hidden text-sm tabular-nums" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className={btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <PlusIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function Toast() {
  const { toast, openCart } = useStore();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed bottom-24 left-1/2 z-[90] flex w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 rounded-full bg-cacao py-3 pl-5 pr-3 text-ivory shadow-soft md:bottom-8"
        >
          <span className="flex items-center gap-3 text-[13px] leading-snug">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage text-[10px]">✓</span>
            {toast.message}
          </span>
          <button
            type="button"
            onClick={openCart}
            className="shrink-0 rounded-full bg-ivory/10 px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition hover:bg-ivory/20"
          >
            View bag
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CloseButton({ onClick, label = "Close", dark = false }: { onClick: () => void; label?: string; dark?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
        dark ? "border-ivory/25 text-ivory hover:border-ivory" : "border-bark/20 text-bark hover:border-bark"
      }`}
    >
      <CloseIcon className="h-4 w-4" />
    </button>
  );
}
