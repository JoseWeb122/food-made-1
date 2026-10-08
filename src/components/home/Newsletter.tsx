import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { EASE, isValidEmail } from "../../lib/utils";
import { CheckIcon } from "../ui/Icons";
import { Reveal } from "../ui/Primitives";

const TOPICS = ["New products", "Recipes", "Nutrition", "Brand stories", "Special offers"];

type Status = "idle" | "sending" | "done";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState<string[]>(["New products", "Recipes"]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const toggleTopic = (t: string) => setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (topics.length === 0) {
      setError("Choose at least one topic you would like to hear about.");
      return;
    }
    setError("");
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 1100);
  };

  const reset = () => {
    setStatus("idle");
    setEmail("");
  };

  return (
    <section id="newsletter" className="relative overflow-hidden bg-sand/45 py-28 md:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">The Closer Journal</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display mt-5 text-[2.8rem] md:text-7xl lg:text-[5rem]">Good things, delivered.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-md text-[16px] leading-[1.8] text-bark/75">
              A monthly letter from our kitchen: new products before anyone else, seasonal recipes, nutrition explained
              plainly, the stories behind our farms, and the occasional offer worth opening for.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-[28px] bg-ivory p-7 shadow-soft md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {status !== "done" ? (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <label htmlFor="newsletter-email" className="text-[11px] uppercase tracking-[0.2em] text-stone">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "newsletter-error" : undefined}
                    className="mt-3 w-full border-b border-bark/25 bg-transparent pb-3 text-[17px] placeholder:text-bark/35 focus:border-bark focus:outline-none"
                  />
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        id="newsletter-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 text-[13px] text-clay"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-stone">I would like to hear about</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {TOPICS.map((t) => {
                      const on = topics.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleTopic(t)}
                          className={`rounded-full border px-4 py-2 text-[12px] transition-all duration-500 ${
                            on ? "border-bark bg-bark text-ivory" : "border-bark/20 text-bark/70 hover:border-bark hover:text-bark"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>

                  <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-10 w-full">
                    {status === "sending" ? "Subscribing…" : "Subscribe"}
                  </button>
                  <p className="mt-4 text-center text-[12px] text-stone">One letter a month. Unsubscribe in a single click.</p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  role="status"
                  className="flex flex-col items-start py-6"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-moss text-ivory">
                    <CheckIcon className="h-6 w-6" />
                  </span>
                  <h3 className="display mt-8 text-4xl">Welcome to the table.</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-bark/75">
                    Your first letter arrives soon. We have sent a confirmation to <span className="font-medium text-bark">{email}</span>.
                  </p>
                  <p className="mt-3 text-[13px] text-stone">Topics: {topics.join(", ") || "All letters"}</p>
                  <button type="button" onClick={reset} className="btn btn-ghost mt-8">
                    Subscribe another address
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
