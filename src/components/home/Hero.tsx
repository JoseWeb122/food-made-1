import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, scrollToId } from "../../lib/utils";
import { ArrowIcon } from "../ui/Icons";

const HEADLINE = ["Food, made", "closer to", "nature."];

export default function Hero() {
  const { scrollY } = useScroll();
  // Hero gently shortens as the visitor scrolls, handing over to the ribbon.
  const height = useTransform(scrollY, [0, 520], ["88vh", "68vh"]);
  // Image moves slower than the page for a subtle cinematic parallax.
  const imageY = useTransform(scrollY, [0, 800], [0, 170]);
  const copyOpacity = useTransform(scrollY, [0, 380], [1, 0]);
  const copyY = useTransform(scrollY, [0, 380], [0, -40]);

  return (
    <motion.section
      aria-label="Introduction"
      style={{ height }}
      className="relative min-h-[620px] w-full overflow-hidden bg-linen"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[8%] -bottom-[8%]">
        <motion.img
          src="/images/hero.jpg"
          alt="Raw almonds, golden granola, dried apricots and cacao nibs arranged on warm linen"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease: EASE }}
          className="h-full w-full object-cover object-[24%_72%] md:object-[center_62%]"
        />
      </motion.div>

      {/* Legibility veils: bottom on mobile, left-to-right on desktop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ivory via-ivory/35 to-transparent md:bg-gradient-to-r md:from-ivory/30 md:via-transparent md:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ivory/80 to-transparent" />

      <motion.div
        style={{ opacity: copyOpacity, y: copyY }}
        className="absolute inset-x-0 bottom-[16%] px-5 md:bottom-auto md:left-auto md:right-[7vw] md:top-[21vh] md:w-[36rem] md:px-0 xl:top-[24vh]"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.2, ease: EASE }}
          className="eyebrow"
        >
          Est. 2014 · Small-batch organic
        </motion.p>

        <h1 className="display mt-6 text-[3.1rem] sm:text-[4.2rem] md:text-[4.5rem] xl:text-[5.9rem]">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1.5">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 + i * 0.14, duration: 1.5, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="mt-7 text-[15px] tracking-[0.03em] text-bark/80 md:text-[17px]"
        >
          Organic. Raw. Vegan. Nutritionally dense.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1, ease: EASE }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <button type="button" onClick={() => scrollToId("shop")} className="btn btn-primary">
            Shop All <ArrowIcon className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => scrollToId("story")} className="btn btn-ghost">
            Discover Our Story
          </button>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="absolute bottom-8 right-7 hidden text-[10px] uppercase tracking-[0.22em] text-bark/55 md:block"
      >
        Batch 07 · Harvest 2026
      </motion.p>

      <motion.button
        type="button"
        onClick={() => scrollToId("ribbon", 0)}
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2 }}
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.26em] text-bark/70 md:bottom-8 md:text-[10px]"
      >
        <span>Scroll to explore</span>
        <span className="relative block h-10 w-px overflow-hidden bg-bark/15">
          <span className="scroll-line absolute inset-0 bg-bark" />
        </span>
      </motion.button>
    </motion.section>
  );
}
