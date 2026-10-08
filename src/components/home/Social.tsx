import { socialLinks } from "../../data/catalog";
import { ArrowUpRightIcon, socialIconMap } from "../ui/Icons";
import { Reveal, SectionHeading } from "../ui/Primitives";

const LIFESTYLE = [
  { src: "/images/editorial-1.jpg", caption: "Breakfast, unhurried", pos: "center 55%", href: "https://instagram.com/izharfoods" },
  { src: "/images/p-matcha.jpg", caption: "Afternoon ritual", pos: "center", href: "https://tiktok.com/@izharfoods" },
  { src: "/images/editorial-2.jpg", caption: "Harvest season", pos: "40% 50%", href: "https://pinterest.com/izharfoods" },
];

export default function Social() {
  return (
    <section id="social" className="bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Follow the kitchen"
            title={
              <>
                Life at the <span className="text-stone">table.</span>
              </>
            }
          />
          <p className="max-w-sm text-[14px] leading-relaxed text-bark/65">
            Recipes from our kitchen, visits to partner farms, and the slow making behind every jar.
          </p>
        </div>

        <div className="mt-16 grid gap-3 md:grid-cols-3 md:gap-5">
          {LIFESTYLE.map((item, i) => (
            <Reveal key={item.src} delay={i * 0.1}>
              <a href={item.href} target="_blank" rel="noreferrer" className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] bg-linen md:aspect-[3/4]">
                <div className="img-zoom absolute inset-0">
                  <img src={item.src} alt={item.caption} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: item.pos }} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-cacao/60 via-transparent to-transparent" />
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-ivory">
                  <span className="display text-2xl md:text-3xl">{item.caption}</span>
                  <ArrowUpRightIcon className="h-5 w-5 shrink-0 transition-transform duration-700 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-bark/12 bg-bark/12 md:grid-cols-3 xl:grid-cols-6">
          {socialLinks.map((s) => {
            const Icon = socialIconMap[s.icon as keyof typeof socialIconMap];
            return (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${s.name}, ${s.handle}`}
                  className="group flex h-full flex-col gap-8 bg-ivory p-6 transition-colors duration-700 hover:bg-linen md:p-7"
                >
                  <span className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-bark/15 transition-all duration-700 group-hover:border-bark group-hover:bg-bark group-hover:text-ivory">
                      <Icon className="h-[1.1rem] w-[1.1rem]" />
                    </span>
                    <ArrowUpRightIcon className="h-4 w-4 text-bark/35 transition-all duration-700 group-hover:text-bark" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium">{s.name}</span>
                    <span className="mt-1 block truncate text-[12px] text-stone">{s.handle}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
