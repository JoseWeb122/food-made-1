import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BUNDLE_TIERS, FREE_SHIPPING_THRESHOLD, MAX_QTY, getProduct } from "../data/catalog";

export interface CartLine {
  key: string;
  productId: string;
  flavor: string;
  qty: number;
  bundle: boolean;
}

export interface Totals {
  count: number;
  regular: number;
  bundleQty: number;
  bundleSubtotal: number;
  bundlePct: number;
  bundleSavings: number;
  total: number;
  freeShippingRemaining: number;
}

export interface ToastState {
  id: number;
  message: string;
}

export interface AddOptions {
  qty?: number;
  bundle?: boolean;
  silent?: boolean;
}

export type InfoTopic = "shipping" | "returns" | "faq" | "privacy" | "terms";
export type CheckoutStatus = "idle" | "processing" | "complete";

interface StoreValue {
  cart: CartLine[];
  totals: Totals;
  pulse: number;
  addToCart: (productId: string, flavor: string, opts?: AddOptions) => void;
  changeQty: (key: string, delta: number) => void;
  removeLine: (key: string) => void;
  toast: ToastState | null;
  showToast: (message: string) => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  quickViewId: string | null;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;
  detailId: string | null;
  openDetail: (id: string) => void;
  closeDetail: () => void;
  notifyTarget: { productId: string | null } | null;
  openNotify: (productId?: string | null) => void;
  closeNotify: () => void;
  infoTopic: InfoTopic | null;
  openInfo: (topic: InfoTopic) => void;
  closeInfo: () => void;
  checkoutStatus: CheckoutStatus;
  orderNumber: string;
  startCheckout: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const lineKey = (productId: string, flavor: string, bundle: boolean) =>
  `${productId}__${flavor}__${bundle ? "bundle" : "single"}`;

const clampQty = (qty: number) => Math.min(MAX_QTY, Math.max(1, qty));

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [pulse, setPulse] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [notifyTarget, setNotifyTarget] = useState<{ productId: string | null } | null>(null);
  const [infoTopic, setInfoTopic] = useState<InfoTopic | null>(null);
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>("idle");
  const [orderNumber, setOrderNumber] = useState("");

  const toastTimer = useRef<number | undefined>(undefined);
  const checkoutTimer = useRef<number | undefined>(undefined);
  const resetTimer = useRef<number | undefined>(undefined);

  const showToast = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = window.setTimeout(() => setToast(null), 3400);
  }, []);

  const addToCart = useCallback(
    (productId: string, flavor: string, opts: AddOptions = {}) => {
      const { qty = 1, bundle = false, silent = false } = opts;
      const product = getProduct(productId);
      const key = lineKey(productId, flavor, bundle);
      setCart((prev) => {
        const existing = prev.find((line) => line.key === key);
        if (existing) {
          return prev.map((line) =>
            line.key === key ? { ...line, qty: clampQty(line.qty + qty) } : line,
          );
        }
        return [...prev, { key, productId, flavor, qty: clampQty(qty), bundle }];
      });
      setPulse((p) => p + 1);
      if (!silent) showToast(`${product.name} added to your bag`);
    },
    [showToast],
  );

  const changeQty = useCallback((key: string, delta: number) => {
    setCart((prev) =>
      prev.map((line) => (line.key === key ? { ...line, qty: clampQty(line.qty + delta) } : line)),
    );
  }, []);

  const removeLine = useCallback(
    (key: string) => {
      setCart((prev) => prev.filter((line) => line.key !== key));
      showToast("Removed from your bag");
    },
    [showToast],
  );

  const totals = useMemo<Totals>(() => {
    let count = 0;
    let regular = 0;
    let bundleQty = 0;
    let bundleSubtotal = 0;
    for (const line of cart) {
      const price = getProduct(line.productId).price * line.qty;
      count += line.qty;
      regular += price;
      if (line.bundle) {
        bundleQty += line.qty;
        bundleSubtotal += price;
      }
    }
    const tier = BUNDLE_TIERS.filter((t) => bundleQty >= t.min).slice(-1)[0];
    const bundlePct = tier?.pct ?? 0;
    const bundleSavings = Math.round(bundleSubtotal * bundlePct * 100) / 100;
    const total = Math.round((regular - bundleSavings) * 100) / 100;
    return {
      count,
      regular,
      bundleQty,
      bundleSubtotal,
      bundlePct,
      bundleSavings,
      total,
      freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - total),
    };
  }, [cart]);

  const startCheckout = useCallback(() => {
    if (cart.length === 0) return;
    setCheckoutStatus("processing");
    window.clearTimeout(checkoutTimer.current);
    checkoutTimer.current = window.setTimeout(() => {
      setOrderNumber(`IZ-${Math.floor(100000 + Math.random() * 900000)}`);
      setCheckoutStatus("complete");
      setCart([]);
    }, 1800);
  }, [cart.length]);

  // Return the checkout panel to idle once the drawer has closed after a demo order.
  useEffect(() => {
    if (!cartOpen && checkoutStatus === "complete") {
      resetTimer.current = window.setTimeout(() => setCheckoutStatus("idle"), 600);
      return () => window.clearTimeout(resetTimer.current);
    }
  }, [cartOpen, checkoutStatus]);

  const anyOpen = Boolean(cartOpen || searchOpen || menuOpen || quickViewId || detailId || notifyTarget || infoTopic);

  // Lock page scroll while any overlay is open.
  useEffect(() => {
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyOpen]);

  // Escape closes the top-most layer.
  useEffect(() => {
    if (!anyOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (notifyTarget) setNotifyTarget(null);
      else if (infoTopic) setInfoTopic(null);
      else if (quickViewId) setQuickViewId(null);
      else if (cartOpen) setCartOpen(false);
      else if (searchOpen) setSearchOpen(false);
      else if (menuOpen) setMenuOpen(false);
      else if (detailId) setDetailId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyOpen, notifyTarget, infoTopic, quickViewId, cartOpen, searchOpen, menuOpen, detailId]);

  const value: StoreValue = {
    cart,
    totals,
    pulse,
    addToCart,
    changeQty,
    removeLine,
    toast,
    showToast,
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    searchOpen,
    openSearch: () => setSearchOpen(true),
    closeSearch: () => setSearchOpen(false),
    menuOpen,
    setMenuOpen,
    quickViewId,
    openQuickView: (id) => setQuickViewId(id),
    closeQuickView: () => setQuickViewId(null),
    detailId,
    openDetail: (id) => {
      setQuickViewId(null);
      setSearchOpen(false);
      setDetailId(id);
    },
    closeDetail: () => setDetailId(null),
    notifyTarget,
    openNotify: (productId = null) => setNotifyTarget({ productId }),
    closeNotify: () => setNotifyTarget(null),
    infoTopic,
    openInfo: (topic) => setInfoTopic(topic),
    closeInfo: () => setInfoTopic(null),
    checkoutStatus,
    orderNumber,
    startCheckout,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
