const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const money = (value: number) => usd.format(value);

/** Signature easing used across the site: slow start, long, calm settle. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export function scrollToId(id: string, delay = 40) {
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, delay);
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
