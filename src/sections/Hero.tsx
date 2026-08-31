import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { stats } from "../data";
import { Counter } from "../components/ui";

const TITLE = "DEEP33M".split("");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotX = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.8], ["blur(0px)", "blur(12px)"]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center px-6 perspective"
    >
      <motion.div
        style={{ y, rotateX: rotX, opacity, filter: blur }}
        className="preserve-3d relative z-10 w-full max-w-6xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/60">
            digital archive · v3.0
          </span>
        </motion.div>

        <h1 className="preserve-3d flex justify-center font-display text-[16vw] font-bold leading-[0.85] tracking-tighter sm:text-[13vw] lg:text-[11rem]">
          {TITLE.map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, rotateY: -95, z: -220, y: 60 }}
              animate={{ opacity: 1, rotateY: 0, z: 0, y: 0 }}
              transition={{
                delay: 0.25 + i * 0.07,
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ z: 90, rotateY: 16, color: "#7cf5d5" }}
              className="preserve-3d inline-block cursor-default text-grad drop-shadow-[0_18px_40px_rgba(124,245,213,0.18)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {c}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mx-auto mt-8 max-w-xl text-balance text-sm leading-relaxed text-white/50 sm:text-base"
        >
          A personal archive of code, creativity, and the pursuit of freedom —
          rendered in real time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ rotateX: -10, rotateY: 8, z: 30 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="glass preserve-3d rounded-xl px-4 py-5 text-left"
              style={{ transformPerspective: 800 }}
            >
              <div className="font-display text-3xl font-semibold text-white">
                <Counter to={s.value} suffix={s.suffix} duration={1400 + i * 200} />
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="group relative overflow-hidden rounded-full bg-neon px-7 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink transition-transform hover:scale-105"
          >
            <span className="relative z-10">enter the archive</span>
            <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#identity"
            className="rounded-full border border-white/15 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 transition hover:border-white/40 hover:text-white"
          >
            who is deep
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30"
      >
        <div className="flex flex-col items-center gap-3">
          scroll
          <span className="h-10 w-px bg-gradient-to-b from-neon/70 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
