import { useStore } from "../../context/StoreContext";
import type { CollectionTab } from "../../data/catalog";
import { socialLinks } from "../../data/catalog";
import { scrollToId } from "../../lib/utils";
import { Logo } from "../ui/Primitives";
import { socialIconMap } from "../ui/Icons";

type FooterLink = { label: string; action?: () => void; href?: string };

export default function Footer({ onCollection }: { onCollection: (tab: CollectionTab) => void }) {
  const { openNotify, openInfo } = useStore();

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "Shop",
      links: [
        { label: "Shop All", action: () => scrollToId("shop") },
        { label: "Collections", action: () => scrollToId("collections") },
        { label: "Bundles", action: () => onCollection("bundles") },
        { label: "Best Sellers", action: () => onCollection("best") },
        { label: "New Products", action: () => onCollection("new") },
      ],
    },
    {
      title: "About",
      links: [
        { label: "Our Story", action: () => scrollToId("story") },
        { label: "How We Create Our Products", action: () => scrollToId("story") },
        { label: "Stores We Are In", action: () => scrollToId("stores") },
        { label: "Contact", href: "mailto:hello@izharfoods.com" },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { label: "Shipping", action: () => openInfo("shipping") },
        { label: "Returns", action: () => openInfo("returns") },
        { label: "FAQ", action: () => openInfo("faq") },
        { label: "Notify Me", action: () => openNotify(null) },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-cacao text-ivory">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-24 md:px-10 md:pt-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-[2.6rem] leading-[1.02] md:text-[3.4rem]">
              Food, made <span className="text-sand/60">closer to nature.</span>
            </p>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-ivory/60">
              Organic, raw, vegan and nutritionally dense — small-batch food from partner farms we know by name.
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => openNotify(null)}
                className="btn btn-light-ghost !h-12 !text-[11px]"
              >
                Be the first to know
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[10px] uppercase tracking-[0.24em] text-sand/70">{col.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a href={link.href} className="text-[14px] text-ivory/80 transition-colors duration-500 hover:text-ivory">
                          {link.label}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={link.action}
                          className="text-left text-[14px] text-ivory/80 transition-colors duration-500 hover:text-ivory"
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.24em] text-sand/70">Social</h3>
              <ul className="mt-5 space-y-3.5">
                {socialLinks.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2.5 text-[14px] text-ivory/80 transition-colors duration-500 hover:text-ivory"
                    >
                      {(() => {
                        const Icon = socialIconMap[s.icon as keyof typeof socialIconMap];
                        return <Icon className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" />;
                      })()}
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-ivory/10 pt-8 md:flex-row md:items-center md:justify-between">
          <Logo tone="light" />
          <p className="text-[12px] text-ivory/50">© 2026 IZHAR Organic Food House. All rights reserved.</p>
          <div className="flex gap-6 text-[12px] text-ivory/60">
            <button type="button" onClick={() => openInfo("privacy")} className="transition-colors hover:text-ivory">
              Privacy
            </button>
            <button type="button" onClick={() => openInfo("terms")} className="transition-colors hover:text-ivory">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
