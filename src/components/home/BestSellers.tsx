import { getProduct, type Product } from "../../data/catalog";
import { useStore } from "../../context/StoreContext";
import { CheckIcon } from "../ui/Icons";
import { PriceLine, QtyStepper, Reveal, SectionHeading, Stars } from "../ui/Primitives";
import { AddToBagButton, FlavorPicker, useProductSelection } from "../products/ProductControls";

const FEATURED_IDS = ["golden-oat-granola", "raw-almond-butter", "medjool-date-bites"];

export default function BestSellers() {
  return (
    <section id="bestsellers" className="relative bg-ivory px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading
          eyebrow="Best Sellers"
          title={
            <>
              The jars our table <span className="text-stone">reaches for.</span>
            </>
          }
        />

        <div className="mt-24 space-y-28 md:mt-32 md:space-y-44">
          {FEATURED_IDS.map((id, i) => (
            <FeatureRow key={id} product={getProduct(id)} index={i} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ product, index, reverse }: { product: Product; index: number; reverse: boolean }) {
  const { openDetail } = useStore();
  const sel = useProductSelection(product);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
      <Reveal className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
        <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-[28px] bg-linen md:aspect-[5/4] lg:aspect-[4/5]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ objectPosition: product.imagePosition ?? "center" }}
          />
          <span className="glass absolute left-5 top-5 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-bark">
            0{index + 1} · {product.badge ?? "Featured"}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.15} className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <p className="eyebrow">{product.category}</p>
        <h3 className="display mt-4 text-[2.6rem] md:text-6xl">{product.name}</h3>
        <p className="mt-4 text-lg font-light text-stone">{product.subtitle}</p>
        <p className="mt-7 text-[15px] leading-[1.85] text-bark/75">{product.story}</p>

        <ul className="mt-8 space-y-3.5 border-t border-bark/10 pt-8">
          {product.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 text-[14px] leading-relaxed">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
              {benefit}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <PriceLine price={product.price} compareAt={product.compareAt} size="lg" />
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-8">
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone">Flavor · {sel.flavor}</p>
          <FlavorPicker flavors={product.flavors} value={sel.flavor} onChange={sel.setFlavor} />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <QtyStepper value={sel.qty} onChange={sel.setQty} />
          <AddToBagButton added={sel.added} onClick={sel.add} className="h-12 min-w-[12rem] flex-1" />
        </div>

        <button
          type="button"
          onClick={() => openDetail(product.id)}
          className="mt-7 border-b border-bark/25 pb-0.5 text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 hover:border-bark"
        >
          Story, ingredients & nutrition
        </button>
      </Reveal>
    </div>
  );
}
