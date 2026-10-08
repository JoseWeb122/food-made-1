import { useStore } from "../../context/StoreContext";
import type { Product } from "../../data/catalog";
import { PriceLine, Stars } from "../ui/Primitives";
import { AddToBagButton, FlavorPicker, useProductSelection } from "./ProductControls";
import { QtyStepper } from "../ui/Primitives";

export default function ProductCard({ product }: { product: Product }) {
  const { openQuickView, openDetail, openNotify } = useStore();
  const sel = useProductSelection(product);

  return (
    <article className="group flex h-full flex-col">
      <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-[22px] bg-linen">
        <img
          src={product.image}
          alt={`${product.name}, ${product.flavors[0]}`}
          loading="lazy"
          style={{ objectPosition: product.imagePosition ?? "center" }}
          className={`h-full w-full object-cover transition-[filter] duration-1000 ${product.soldOut ? "saturate-[0.6]" : ""}`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cacao/30 via-transparent to-transparent" />

        {product.badge && !product.soldOut && (
          <span className="glass absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-bark">
            {product.badge}
          </span>
        )}
        {product.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-cacao/30">
            <span className="glass rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] text-bark">Sold Out</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className="glass absolute inset-x-4 bottom-4 h-11 rounded-full text-[11px] uppercase tracking-[0.2em] text-bark transition-all duration-700 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
        >
          Quick View
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[1.1rem] font-medium leading-snug tracking-[-0.01em]">{product.name}</h3>
            <p className="mt-1 text-[13px] text-stone">{product.subtitle}</p>
          </div>
          <PriceLine price={product.price} compareAt={product.compareAt} className="shrink-0 flex-col !items-end !gap-0.5" />
        </div>

        <Stars rating={product.rating} reviews={product.reviews} className="mt-3" />

        <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-bark/70">{product.description}</p>

        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-sage">
          {product.tags.slice(0, 3).map((tag, i) => (
            <li key={tag} className="flex items-center gap-3">
              {i > 0 && <span className="text-bark/25">·</span>}
              {tag}
            </li>
          ))}
        </ul>

        {!product.soldOut ? (
          <>
            <div className="mt-5">
              <FlavorPicker flavors={product.flavors} value={sel.flavor} onChange={sel.setFlavor} className="gap-1.5" />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <QtyStepper value={sel.qty} onChange={sel.setQty} />
              <AddToBagButton added={sel.added} onClick={sel.add} className="h-12 flex-1 !px-4 !text-[11px]" />
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => openNotify(product.id)}
            className="btn btn-ghost mt-5 w-full"
          >
            Notify Me
          </button>
        )}

        <button
          type="button"
          onClick={() => openDetail(product.id)}
          className="mt-5 self-start border-b border-bark/25 pb-0.5 text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 hover:border-bark"
        >
          Product details
        </button>
      </div>
    </article>
  );
}
