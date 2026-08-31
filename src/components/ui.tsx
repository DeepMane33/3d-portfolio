import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------- Reveal */
export function Reveal({
  children,
  delay = 0,
  y = 60,
  rotate = 14,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("preserve-3d", className)}
      initial={{ opacity: 0, y, rotateX: rotate, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------- TiltCard */
export function TiltCard({
  children,
  className,
  intensity = 12,
  glow = "#7cf5d5",
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glow?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 180, damping: 20 });
  const sy = useSpring(my, { stiffness: 180, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const sheen = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(430px circle at ${x * 100}% ${y * 100}%, ${glow}26, transparent 62%)`
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000, ...style }}
      whileHover={{ z: 40, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={cn(
        "relative preserve-3d rounded-2xl overflow-hidden group",
        className
      )}
    >
      {children}
      {/* specular sheen */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: sheen }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
        style={{ boxShadow: `inset 0 0 40px -12px ${glow}` }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------ Counter */
export function Counter({
  to,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------- SectionTitle */
export function SectionTitle({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-14 perspective">
      <Reveal>
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.35em] text-neon/70">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-neon/60" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl font-semibold tracking-tight text-grad">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-xl text-sm sm:text-base text-white/45 leading-relaxed">
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ Marquee */
export function Marquee({ items, speed = 26 }: { items: string[]; speed?: number }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-white/[0.015] py-4">
      <motion.div
        className="flex gap-10 whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className="font-mono text-xs uppercase tracking-[0.3em] text-white/35"
          >
            {t} <span className="text-neon/60">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
