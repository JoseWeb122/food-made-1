import type { ComponentType } from "react";
import { trustBadges } from "../../data/catalog";
import { DropIcon, FlaskIcon, LeafIcon, ShieldIcon, SproutIcon } from "../ui/Icons";
import { Reveal, SectionHeading } from "../ui/Primitives";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  leaf: LeafIcon,
  flask: FlaskIcon,
  sprout: SproutIcon,
  shield: ShieldIcon,
  drop: DropIcon,
};

const PILLARS = [
  {
    title: "Ingredient transparency",
    copy: "Full ingredient lists and nutrition panels on every product page, to the gram. Nothing is listed as “natural flavor”.",
  },
  {
    title: "Quality promise",
    copy: "Every batch is tested by an independent lab before it leaves our kitchen. If a jar is not right, we replace it.",
  },
  {
    title: "Sourcing philosophy",
    copy: "We visit each partner farm before we sign and again each harvest, and pay above fair-trade floors for the long term.",
  },
  {
    title: "Nutrition-first",
    copy: "Serving sizes that reflect how people really eat, with fiber, protein and fat designed in, not sweetness added on top.",
  },
];

export default function Trust() {
  return (
    <section id="transparency" className="relative overflow-hidden bg-linen py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-20 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Transparency"
              title={
                <>
                  Nothing to hide. <span className="text-stone">Everything to show.</span>
                </>
              }
              body="Trust is built by being checkable. Here is how we make sure every jar earns it."
            />

            <Reveal delay={0.25} className="mt-14">
              <figure className="rounded-[26px] border border-bark/12 bg-ivory p-8 md:p-10">
                <blockquote className="display text-2xl leading-snug md:text-[1.9rem]">
                  “We would rather make fewer jars, and be able to tell you exactly where every almond came from.”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bark text-[12px] font-semibold tracking-wide text-ivory">
                    IZ
                  </span>
                  <span className="text-[13px]">
                    <span className="block font-medium">Izhar</span>
                    <span className="text-stone">Founder & head of sourcing</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[26px] border border-bark/12 bg-bark/12 md:grid-cols-3">
              {trustBadges.map((badge, i) => {
                const Icon = ICONS[badge.icon];
                return (
                  <Reveal key={badge.label} delay={i * 0.05} className="h-full">
                    <div className="group flex h-full flex-col gap-6 bg-ivory p-6 transition-colors duration-700 hover:bg-[#fbf8f2] md:p-8">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bark/15 text-bark transition-all duration-700 group-hover:border-moss group-hover:text-moss">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-[15px] font-medium">{badge.label}</h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-bark/65">{badge.copy}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12">
              {PILLARS.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 0.08}>
                  <p className="text-[11px] tabular-nums text-clay">0{i + 1}</p>
                  <h3 className="mt-3 text-xl font-light">{pillar.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.8] text-bark/70">{pillar.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
