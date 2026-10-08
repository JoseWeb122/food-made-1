import { motion } from "framer-motion";
import { EASE } from "../../lib/utils";
import { Reveal } from "../ui/Primitives";

const STATEMENT =
  "We believe food should taste of the place it came from, and leave you feeling more like yourself for having eaten it.";

const STATS = [
  { value: "2014", label: "Founded in a rented kitchen with two ovens" },
  { value: "42", label: "Partner farms and cooperatives we know by name" },
  { value: "0 g", label: "Refined sugar, in any jar we make" },
  { value: "100%", label: "Ingredients traceable to a specific harvest" },
];

export default function BrandIntro() {
  const words = STATEMENT.split(" ");
  return (
    <section id="about" className="relative bg-ivory px-5 pb-28 pt-28 md:px-10 md:pb-44 md:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow">About IZHAR</p>
        </Reveal>

        <p className="display mt-10 text-[2.1rem] leading-[1.2] tracking-[-0.025em] sm:text-5xl md:text-[3.5rem] md:leading-[1.12] lg:text-[4.3rem]">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0.12 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{ duration: 0.9, delay: (i % 6) * 0.05, ease: EASE }}
              className="mr-[0.27em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </p>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-5">
            <p className="text-[15px] leading-[1.9] text-bark/75">
              IZHAR started with two ovens, a rented kitchen and a stubborn idea: that the healthiest food should also be the
              most delicious. We still work the same way. Small batches, low temperatures, and ingredients we can name.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-6 md:col-start-7">
            <p className="text-[15px] leading-[1.9] text-bark/75">
              Today our jars are made with forty-two partner farms across four continents. Every lot carries a code that traces
              it back to the season and the field, because trust is something you can check, not something you are asked to
              believe.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-y-12 border-t border-bark/12 pt-12 md:mt-28 md:grid-cols-4 md:gap-x-10">
          {STATS.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 0.08} className="pr-4">
              <p className="display text-5xl md:text-6xl">{stat.value}</p>
              <p className="mt-4 max-w-[16rem] text-[13px] leading-relaxed text-bark/65">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
