import { motion } from "framer-motion";
import { interests } from "../data";
import { Reveal, SectionTitle, TiltCard } from "../components/ui";

export default function Interests() {
  return (
    <section id="interests" className="relative z-10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="stuff i like"
          title="things i spend my free time on"
          sub="seven obsessions, stacked in space. hover to push them out of the screen."
        />

        <div className="grid gap-5 perspective sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((it, i) => (
            <Reveal key={it.id} delay={(i % 3) * 0.08} y={70}>
              <TiltCard glow={it.accent} className="glass h-full">
                <div className="preserve-3d relative h-full p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[5.5rem] font-bold leading-none opacity-[0.07]"
                    style={{ color: it.accent, transform: "translateZ(10px)" }}
                  >
                    {it.tag}
                  </div>

                  <div
                    className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border text-[13px]"
                    style={{
                      borderColor: `${it.accent}44`,
                      background: `${it.accent}14`,
                      color: it.accent,
                      transform: "translateZ(45px)",
                    }}
                  >
                    {it.glyph.slice(0, 2)}
                  </div>

                  <h3
                    className="font-display text-2xl font-semibold tracking-tight text-white"
                    style={{ transform: "translateZ(35px)" }}
                  >
                    {it.title}
                  </h3>
                  <div
                    className="mt-2 h-px w-12 origin-left transition-all duration-500 group-hover:w-24"
                    style={{ background: it.accent, transform: "translateZ(25px)" }}
                  />
                  <p
                    className="mt-4 text-[13.5px] leading-relaxed text-white/45"
                    style={{ transform: "translateZ(18px)" }}
                  >
                    {it.body}
                  </p>

                  <motion.div
                    aria-hidden
                    className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: `${it.accent}99`, transform: "translateZ(28px)" }}
                  >
                    {it.glyph}
                  </motion.div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
