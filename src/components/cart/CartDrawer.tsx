import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../../context/StoreContext";
import { FREE_SHIPPING_THRESHOLD, getProduct, products } from "../../data/catalog";
import { EASE, money } from "../../lib/utils";
import { ArrowIcon, CheckIcon, TrashIcon } from "../ui/Icons";
import { CloseButton, QtyStepper } from "../ui/Primitives";

export default function CartDrawer() {
  const { cartOpen, closeCart, cart, totals, changeQty, removeLine, checkoutStatus, orderNumber, startCheckout, addToCart, openDetail } =
    useStore();

  const progress = Math.min(100, (totals.total / FREE_SHIPPING_THRESHOLD) * 100);
  const isEmpty = cart.length === 0;

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div key="cart-layer" className="fixed inset-0 z-[70]" exit={{ opacity: 1 }}>
          <motion.button
            type="button"
            aria-label="Close bag"
            onClick={closeCart}
            className="absolute inset-0 bg-cacao/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col bg-ivory shadow-soft"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-bark/10 px-6 py-5">
              <div>
                <p className="eyebrow">Your bag</p>
                <p className="mt-1 text-xl font-light">
                  {totals.count} {totals.count === 1 ? "jar" : "jars"}
                </p>
              </div>
              <CloseButton onClick={closeCart} label="Close bag" />
            </div>

            {/* Free shipping progress */}
            {!isEmpty && checkoutStatus === "idle" && (
              <div className="border-b border-bark/10 px-6 py-4">
                <p className="text-[12px] text-bark/75">
                  {totals.freeShippingRemaining > 0 ? (
                    <>
                      You are <span className="font-medium text-bark">{money(totals.freeShippingRemaining)}</span> away from complimentary shipping.
                    </>
                  ) : (
                    <span className="font-medium text-moss">Complimentary shipping unlocked.</span>
                  )}
                </p>
                <div className="mt-3 h-px w-full bg-bark/10">
                  <motion.div
                    className="h-px bg-bark"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: EASE }}
                  />
                </div>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6">
              {checkoutStatus === "processing" && (
                <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                  <motion.span
                    className="h-10 w-10 rounded-full border border-bark/15 border-t-bark"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                  />
                  <div>
                    <p className="text-lg font-light">Preparing your order…</p>
                    <p className="mt-2 text-sm text-stone">Demo checkout — nothing is being charged.</p>
                  </div>
                </div>
              )}

              {checkoutStatus === "complete" && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="flex h-full flex-col items-center justify-center gap-6 py-10 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-moss text-ivory">
                    <CheckIcon className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="eyebrow">Order received</p>
                    <h3 className="display mt-3 text-4xl">Thank you.</h3>
                    <p className="mt-3 text-sm text-stone">
                      Order <span className="tabular-nums text-bark">{orderNumber}</span>
                    </p>
                  </div>
                  <p className="max-w-xs text-[13px] leading-relaxed text-bark/70">
                    This is a front-end demonstration. No payment was taken. In the live store, this step hands off to
                    secure Shopify Checkout.
                  </p>
                  <button type="button" onClick={closeCart} className="btn btn-primary mt-2">
                    Back to shopping
                  </button>
                </motion.div>
              )}

              {checkoutStatus === "idle" && isEmpty && (
                <div className="flex flex-col py-10">
                  <p className="display text-4xl">Your bag is quietly empty.</p>
                  <p className="mt-4 text-[14px] leading-relaxed text-bark/70">
                    Start with a favourite, or try one of these kitchen staples.
                  </p>
                  <div className="mt-8 divide-y divide-bark/10 border-y border-bark/10">
                    {[products[0], products[3], products[2]].map((p) => (
                      <div key={p.id} className="flex items-center gap-4 py-4">
                        <button
                          type="button"
                          onClick={() => {
                            closeCart();
                            openDetail(p.id);
                          }}
                          className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-linen"
                          aria-label={`View ${p.name}`}
                        >
                          <img src={p.image} alt="" className="h-full w-full object-cover" style={{ objectPosition: p.imagePosition ?? "center" }} />
                        </button>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-medium">{p.name}</p>
                          <p className="text-[13px] text-stone">{money(p.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(p.id, p.flavors[0])}
                          className="rounded-full border border-bark/25 px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors hover:border-bark hover:bg-bark hover:text-ivory"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={closeCart} className="btn btn-ghost mt-8 w-full">
                    Continue shopping
                  </button>
                </div>
              )}

              {checkoutStatus === "idle" && !isEmpty && (
                <ul className="divide-y divide-bark/10">
                  <AnimatePresence initial={false}>
                    {cart.map((line) => {
                      const product = getProduct(line.productId);
                      const lineTotal = product.price * line.qty;
                      return (
                        <motion.li
                          key={line.key}
                          layout
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40, height: 0, paddingTop: 0, paddingBottom: 0 }}
                          transition={{ duration: 0.7, ease: EASE }}
                          className="flex gap-4 py-6"
                        >
                          <div className="h-32 w-24 shrink-0 overflow-hidden rounded-2xl bg-linen">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                              style={{ objectPosition: product.imagePosition ?? "center" }}
                            />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-[15px] font-medium leading-snug">{product.name}</p>
                                <p className="mt-1 text-[12px] text-stone">Flavor · {line.flavor}</p>
                                {line.bundle && (
                                  <span className="mt-2 inline-block rounded-full bg-sage/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-moss">
                                    Bundle
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeLine(line.key)}
                                aria-label={`Remove ${product.name}`}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone transition-colors hover:bg-bark/5 hover:text-bark"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                              <QtyStepper value={line.qty} onChange={(next) => changeQty(line.key, next - line.qty)} className="h-10 scale-[0.92] origin-left" />
                              <span className="text-[15px] font-medium tabular-nums">{money(lineTotal)}</span>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer / totals */}
            {checkoutStatus === "idle" && !isEmpty && (
              <div className="border-t border-bark/10 bg-ivory px-6 pb-6 pt-5">
                <dl className="space-y-2.5 text-[14px]">
                  <div className="flex justify-between">
                    <dt className="text-bark/70">Subtotal</dt>
                    <dd className="tabular-nums">{money(totals.regular)}</dd>
                  </div>
                  {totals.bundleSavings > 0 && (
                    <motion.div
                      key={totals.bundleSavings}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="flex justify-between text-moss"
                    >
                      <dt>Bundle savings · {Math.round(totals.bundlePct * 100)}% off</dt>
                      <dd className="tabular-nums">−{money(totals.bundleSavings)}</dd>
                    </motion.div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-bark/70">Shipping</dt>
                    <dd className="text-bark/70">{totals.freeShippingRemaining > 0 ? "Calculated at checkout" : "Complimentary"}</dd>
                  </div>
                </dl>
                <div className="mt-4 flex items-baseline justify-between border-t border-bark/10 pt-4">
                  <span className="text-[14px]">Total</span>
                  <motion.span
                    key={totals.total}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-light tabular-nums"
                  >
                    {money(totals.total)}
                  </motion.span>
                </div>
                <button type="button" onClick={startCheckout} className="btn btn-primary mt-5 w-full">
                  Checkout <ArrowIcon className="h-4 w-4" />
                </button>
                <button type="button" onClick={closeCart} className="btn btn-ghost mt-3 w-full">
                  Continue shopping
                </button>
                <p className="mt-4 text-center text-[11px] text-stone">Prototype checkout — no payment is processed.</p>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
