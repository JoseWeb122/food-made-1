import type { CollectionTab } from "../../data/catalog";
import { collectionFeatures } from "../../data/catalog";
import { ArrowIcon } from "../ui/Icons";
import { Reveal, SectionHeading } from "../ui/Primitives";

export default function FeaturedCollections({ onSelect }: { onSelect: (tab: CollectionTab) => void }) {
  return (
    <section id="collections" className="bg-ivory px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured Collections"
            title={
              <>
                Shop by <span className="text-stone">appetite.</span>
              </>
            }
          />
          <p className="max-w-sm text-[14px] leading-relaxed text-bark/65">
            Three families of jars, each built around a different moment of the day.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-12 md:gap-6">
          {collectionFeatures.map((c, i) => (
            <Reveal
              key={c.key}
              delay={i * 0.1}
              className={c.key === "snacks" ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}
            >
              <button
                type="button"
                onClick={() => onSelect(c.key)}
                aria-label={`Shop ${c.title}`}
                className="group relative block h-full min-h-[26rem] w-full overflow-hidden rounded-[26px] bg-linen text-left md:min-h-[24rem]"
              >
                <div className="img-zoom absolute inset-0">
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: c.position ?? "center" }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-cacao/75 via-cacao/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 text-ivory md:p-10">
                  <div>
                    <p className="eyebrow !text-sand">0{i + 1} — Collection</p>
                    <h3 className="display mt-3 text-4xl md:text-6xl">{c.title}</h3>
                    <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-ivory/80">{c.copy}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/40 transition-all duration-700 group-hover:border-ivory group-hover:bg-ivory group-hover:text-bark">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
