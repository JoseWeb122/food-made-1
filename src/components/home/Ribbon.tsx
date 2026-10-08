import { ribbonItems } from "../../data/catalog";

/** Seamless infinite marquee: the track holds two identical blocks and translates by exactly one block. */
export default function Ribbon() {
  return (
    <section
      id="ribbon"
      aria-label="Our promises"
      className="ribbon relative overflow-hidden border-y border-bark/10 bg-ivory py-6 md:py-8"
    >
      <div className="flex w-max animate-ribbon">
        {[0, 1].map((dup) => (
          <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
            {ribbonItems.map((item) => (
              <span key={`${dup}-${item}`} className="flex items-center">
                <span className="whitespace-nowrap px-8 text-[clamp(1.25rem,2.6vw,2.4rem)] font-light uppercase tracking-[0.14em] text-bark md:px-12">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-clay/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
