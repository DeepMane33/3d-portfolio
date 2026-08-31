import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { identities } from "../data";
import { Reveal, SectionTitle } from "../components/ui";

export default function Identity() {
  const [idx, setIdx] = useState(0);
  const cur = identities[idx];

  return (
    <section id="identity" className="relative z-10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="what i actually love to do"
          title="just a guy who codes, plays guitar & watches too much anime"
          sub="three faces of the same person. flip between them."
        />

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* tabs */}
          <div className="flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible perspective">
            {identities.map((id, i) => {
              const on = i === idx;
              return (
                <motion.button
                  key={id.key}
                  onClick={() => setIdx(i)}
                  whileHover={{ rotateY: on ? 0 : -8, z: 24 }}
                  animate={{ rotateY: on ? -4 : 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  style={{ transformPerspective: 900 }}
                  className={`preserve-3d relative min-w-[190px] shrink-0 rounded-xl border p-4 text-left transition-colors ${
                    on
                      ? "border-white/20 bg-white/[0.07]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: on ? id.accent : "rgba(255,255,255,0.3)" }}
                  >
                    0{i + 1}
                  </span>
                  <div className="mt-2 font-display text-lg font-medium text-white">
                    {id.label}
                  </div>
                  <div className="font-mono text-[11px] text-white/30">{id.kana}</div>
                  {on && (
                    <motion.span
                      layoutId="id-bar"
                      className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                      style={{ background: id.accent }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* panel */}
          <div className="perspective min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.key}
                initial={{ opacity: 0, rotateY: 35, z: -160, x: 60 }}
                animate={{ opacity: 1, rotateY: 0, z: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: -25, z: -120, x: -40 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="glass preserve-3d relative h-full overflow-hidden rounded-3xl p-8 sm:p-12 noise"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full blur-[90px] opacity-30"
                  style={{ background: cur.accent }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-4 select-none font-display text-[7rem] font-bold leading-none opacity-[0.06]"
                >
                  {cur.kana}
                </div>

                <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                  <span style={{ color: cur.accent }}>{cur.label}</span>
                </h3>

                <div className="mt-8 space-y-5 max-w-2xl">
                  {cur.lines.map((l, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.12, duration: 0.7 }}
                      className="text-sm leading-relaxed text-white/55 sm:text-[15px]"
                    >
                      {l}
                    </motion.p>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                  {cur.chips.map((c, i) => (
                    <motion.span
                      key={c}
                      initial={{ opacity: 0, y: 16, rotateX: -40 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.45 + i * 0.06 }}
                      whileHover={{ y: -4, z: 20 }}
                      className="preserve-3d rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[11px] tracking-wide text-white/60"
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Reveal className="mx-auto mt-24 max-w-7xl">
        <blockquote className="border-l-2 border-neon/50 pl-6 font-display text-xl italic leading-relaxed text-white/70 sm:text-3xl">
          “the journey matters more than the destination” — applies to code as much
          as narrative.
        </blockquote>
      </Reveal>
    </section>
  );
}
