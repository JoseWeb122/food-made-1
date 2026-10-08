import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { faqs } from "../../data/catalog";
import { useStore, type InfoTopic } from "../../context/StoreContext";
import { EASE } from "../../lib/utils";
import { ChevronIcon } from "../ui/Icons";
import { CloseButton } from "../ui/Primitives";

const COPY: Record<Exclude<InfoTopic, "faq">, { title: string; eyebrow: string; points: { h: string; p: string }[] }> = {
  shipping: {
    title: "Shipping",
    eyebrow: "Customer care",
    points: [
      { h: "Complimentary over $60", p: "Orders over $60 ship free within the continental United States." },
      { h: "Ships within 24 hours", p: "Orders placed before 2pm ET leave our kitchen the same business day, Monday to Friday." },
      { h: "Considered packaging", p: "Plant-based insulation and recyclable cartons keep jars cool and the planet lighter." },
      { h: "Tracking on every order", p: "You will receive a tracking link by email the moment your parcel is collected." },
    ],
  },
  returns: {
    title: "Returns",
    eyebrow: "Customer care",
    points: [
      { h: "Taste it, or we will make it right", p: "If a product is not for you, contact us within 30 days of delivery." },
      { h: "No questions asked", p: "We will send a replacement or a full refund, your choice. You do not need to return opened jars." },
      { h: "Start a return", p: "Write to care@izharfoods.com with your order number and we will reply within one working day." },
    ],
  },
  privacy: {
    title: "Privacy",
    eyebrow: "Legal",
    points: [
      { h: "What we collect", p: "Only what we need to deliver your order and, if you opt in, to send you good things by email." },
      { h: "What we never do", p: "We do not sell your details. Ever. You can unsubscribe or request deletion at any time." },
    ],
  },
  terms: {
    title: "Terms",
    eyebrow: "Legal",
    points: [
      { h: "Prototype notice", p: "This is a front-end design mockup. No orders are fulfilled and no payment is taken." },
      { h: "Product information", p: "Nutrition, ingredients and sourcing information reflect the current production batch and may vary by lot." },
    ],
  },
};

export default function InfoModal() {
  const { infoTopic, closeInfo } = useStore();
  return (
    <AnimatePresence>
      {infoTopic && (
        <motion.div
          key="info"
          className="fixed inset-0 z-[65] flex items-end justify-center md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button type="button" aria-label="Close" onClick={closeInfo} className="absolute inset-0 bg-cacao/45 backdrop-blur-[2px]" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={infoTopic}
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative max-h-[86dvh] w-full overflow-y-auto rounded-t-[28px] bg-ivory p-7 shadow-soft md:max-w-xl md:rounded-[28px] md:p-10"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow">{infoTopic === "faq" ? "Customer care" : COPY[infoTopic].eyebrow}</p>
                <h2 className="display mt-3 text-4xl">{infoTopic === "faq" ? "Questions, answered." : COPY[infoTopic].title}</h2>
              </div>
              <CloseButton onClick={closeInfo} label="Close" />
            </div>

            {infoTopic === "faq" ? (
              <FaqList />
            ) : (
              <div className="mt-8 divide-y divide-bark/10">
                {COPY[infoTopic].points.map((point) => (
                  <div key={point.h} className="py-5">
                    <h3 className="text-[15px] font-medium">{point.h}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-bark/70">{point.p}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-8 divide-y divide-bark/10 border-y border-bark/10">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="text-[15px] font-medium">{item.q}</span>
              <ChevronIcon className={`h-4 w-4 shrink-0 transition-transform duration-700 ease-premium ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-8 text-[14px] leading-relaxed text-bark/70">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
