import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from "../data";
import { SectionTitle, TiltCard } from "../components/ui";
import ProjectVisual from "../three/ProjectVisual";

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -14]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.3]);
  const flip = i % 2 === 1;

  return (
    <div ref={ref} className="perspective">
      <motion.div
        style={{ rotateX, scale, opacity, transformPerspective: 1400 }}
        className="preserve-3d"
      >
        <TiltCard glow={p.accent} intensity={7} className="glass">
          <div
            className={`grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-2 ${
              flip ? "lg:[direction:rtl]" : ""
            }`}
          >
            <div className="[direction:ltr]" style={{ transform: "translateZ(30px)" }}>
              <div className="flex items-baseline gap-4">
                <span
                  className="font-display text-5xl font-bold opacity-30"
                  style={{ color: p.accent }}
                >
                  {p.num}
                </span>
                <h3 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {p.name}
                </h3>
              </div>
              <p className="mt-5 max-w-lg text-[13.5px] leading-relaxed text-white/45">
                {p.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.split(" / ").map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <button
                className="group/btn mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] transition-colors"
                style={{ color: p.accent }}
              >
                view case
                <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-2">
                  →
                </span>
              </button>
            </div>

            <div
              className="relative h-[260px] overflow-hidden rounded-2xl border border-white/8 bg-[#07090f] sm:h-[320px] [direction:ltr]"
              style={{ transform: "translateZ(55px)" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background: `radial-gradient(circle at 50% 60%, ${p.accent}33, transparent 65%)`,
                }}
              />
              <ProjectVisual shape={p.shape} accent={p.accent} />
              <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
                realtime · webgl
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative z-10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="selected work"
          title="things i actually shipped"
          sub="every one of these started as a random idea at 2am."
        />
        <div className="space-y-16">
          {projects.map((p, i) => (
            <ProjectCard key={p.num} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
