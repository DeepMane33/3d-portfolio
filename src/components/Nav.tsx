import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "../data";

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });
  const [active, setActive] = useState("hero");
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: bar }}
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gradient-to-r from-neon via-violet to-ember"
      />
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          solid ? "backdrop-blur-xl bg-ink/60 border-b border-white/8" : ""
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#hero" className="group flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/5 font-display text-sm font-bold text-neon transition-transform duration-500 group-hover:[transform:rotateY(180deg)] preserve-3d">
              D
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/55">
              deep33m
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative block rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors ${
                    active === l.id ? "text-ink" : "text-white/50 hover:text-white"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-neon"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full border border-neon/40 bg-neon/10 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-neon transition hover:bg-neon hover:text-ink sm:block"
          >
            say hi
          </a>
        </nav>
      </header>
    </>
  );
}
