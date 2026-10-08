import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { storyChapters } from "../../data/catalog";
import { EASE } from "../../lib/utils";
import { ArrowIcon } from "../ui/Icons";
import { Reveal } from "../ui/Primitives";

const IMAGE_POSITIONS = ["30% 40%", "70% 55%", "50% 30%", "20% 60%", "80% 40%", "50% 70%"];

export default function StoryTabs() {
  const [active, setActive] = useState(0);
  const chapter = storyChapters[active];

  const next = () => setActive((i) => (i + 1) % storyChapters.length);

  return (
    <section id="story" className="relative bg-linen py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left: heading + tabs */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">How we created this magic »</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display mt-5 text-[2.6rem] leading-[1.02] md:text-6xl">
                How We Created <span className="text-stone">This Magic</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-bark/70">
                Six chapters on ingredients, sourcing, preparation and philosophy. Choose one to read its story.
              </p>
            </Reveal>

            <div
              role="tablist"
              aria-label="Brand story chapters"
              className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
            >
              {storyChapters.map((c, i) => {
                const on = i === active;
                return (
                  <button
                    key={c.id}
                    id={`tab-${c.id}`}
                    role="tab"
                    aria-selected={on}
                    aria-controls="story-panel"
                    onMouseEnter={() => {
                      if (window.matchMedia("(hover: hover)").matches) setActive(i);
                    }}
                    onClick={() => setActive(i)}
                    className={`group flex shrink-0 items-center gap-4 rounded-full border px-5 py-3 text-left transition-all duration-700 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:px-0 lg:py-6 ${
                      on
                        ? "border-bark bg-bark text-ivory lg:border-bark/12 lg:bg-transparent lg:text-bark"
                        : "border-bark/20 text-bark/60 hover:text-bark lg:border-bark/12"
                    }`}
                  >
                    <span className="text-[10px] tabular-nums opacity-60">0{i + 1}</span>
                    <span className="text-[12px] uppercase tracking-[0.16em] lg:text-[14px]">{c.label}</span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto hidden text-[13px] transition-all duration-700 lg:inline ${on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}
                    >
                      &gt;&gt;
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: animated content panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.id}
                id="story-panel"
                role="tabpanel"
                aria-labelledby={`tab-${chapter.id}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-sand">
                  <motion.img
                    src="/images/story.jpg"
                    alt="Hands opening a fresh raw cacao pod over a wooden board"
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: EASE }}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: IMAGE_POSITIONS[active] }}
                  />
                  <div className="glass absolute inset-x-4 bottom-4 rounded-2xl p-5 md:inset-x-5 md:bottom-5">
                    <p className="display text-4xl">{chapter.stat.value}</p>
                    <p className="mt-2 text-[12px] leading-snug text-bark/70">{chapter.stat.label}</p>
                  </div>
                </div>

                <div>
                  <p className="eyebrow">{chapter.eyebrow}</p>
                  <h3 className="display mt-4 text-3xl md:text-[2.6rem] md:leading-[1.08]">{chapter.title}</h3>
                  <div className="mt-6 space-y-5 text-[15px] leading-[1.85] text-bark/75">
                    {chapter.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <button type="button" onClick={next} className="group mt-10 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.18em]">
                    Next chapter
                    <ArrowIcon className="h-4 w-4 transition-transform duration-700 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
