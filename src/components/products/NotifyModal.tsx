import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { useStore } from "../../context/StoreContext";
import { getProduct } from "../../data/catalog";
import { EASE, isValidEmail } from "../../lib/utils";
import { CheckIcon } from "../ui/Icons";
import { CloseButton } from "../ui/Primitives";

export default function NotifyModal() {
  const { notifyTarget, closeNotify } = useStore();
  return (
    <AnimatePresence>
      {notifyTarget && <NotifyDialog key={notifyTarget.productId ?? "general"} productId={notifyTarget.productId} onClose={closeNotify} />}
    </AnimatePresence>
  );
}

function NotifyDialog({ productId, onClose }: { productId: string | null; onClose: () => void }) {
  const product = productId ? getProduct(productId) : null;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 1000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[66] flex items-end justify-center md:items-center md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-cacao/50 backdrop-blur-[3px]" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Be the first to know"
        initial={{ y: 56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 36, opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative w-full overflow-hidden rounded-t-[28px] bg-ivory shadow-soft md:max-w-lg md:rounded-[28px]"
      >
        <div className="flex items-start justify-between gap-6 p-7 pb-0 md:p-10 md:pb-0">
          <div>
            <p className="eyebrow">{product ? "Notify me" : "Early access"}</p>
            <h2 className="display mt-3 text-4xl">Be the first to know.</h2>
          </div>
          <CloseButton onClick={onClose} label="Close" />
        </div>

        <div className="p-7 md:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {status !== "done" ? (
              <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
                {product ? (
                  <div className="flex items-center gap-4 rounded-2xl bg-linen p-4">
                    <img
                      src={product.image}
                      alt=""
                      className="h-16 w-14 shrink-0 rounded-xl object-cover"
                      style={{ objectPosition: product.imagePosition ?? "center" }}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-medium">{product.name}</p>
                      <p className="mt-1 text-[12px] text-stone">Sold out · we will email you when it returns</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[15px] leading-relaxed text-bark/75">
                    New drops, limited editions and restocks, delivered to you before they reach the shelf.
                  </p>
                )}

                <label htmlFor="notify-email" className="mt-8 block text-[11px] uppercase tracking-[0.2em] text-stone">
                  Email
                </label>
                <input
                  id="notify-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your email"
                  autoComplete="email"
                  aria-invalid={Boolean(error)}
                  className="mt-3 w-full border-b border-bark/25 bg-transparent pb-3 text-[17px] placeholder:text-bark/35 focus:border-bark focus:outline-none"
                />
                {error && <p className="mt-3 text-[13px] text-clay">{error}</p>}

                <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-8 w-full">
                  {status === "sending" ? "Saving your place…" : "Notify Me"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                role="status"
                className="py-4"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-moss text-ivory">
                  <CheckIcon className="h-6 w-6" />
                </span>
                <h3 className="display mt-7 text-3xl">You are on the list.</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-bark/75">
                  {product
                    ? `We will write to ${email} the moment ${product.name} is back in the kitchen.`
                    : `We will write to ${email} before anything goes on the shelf.`}
                </p>
                <button type="button" onClick={onClose} className="btn btn-ghost mt-8">
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
