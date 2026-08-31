import { motion } from "framer-motion";
import { Reveal } from "../components/ui";

const links = [
  { label: "github", href: "https://github.com", handle: "@deep33m" },
  { label: "x / twitter", href: "https://x.com", handle: "@deep33m" },
  { label: "mail", href: "mailto:hey@deep33m.dev", handle: "hey@deep33m.dev" },
  { label: "discord", href: "#", handle: "deep33m" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-6 pb-16 pt-32">
      <div className="mx-auto max-w-7xl perspective">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-neon/70">
            end of archive
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-display text-[13vw] font-bold leading-[0.85] tracking-tighter text-grad sm:text-[9rem]">
            let's build
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.07}>
              <motion.a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ rotateX: -12, rotateY: 8, z: 40 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                style={{ transformPerspective: 900 }}
                className="glass preserve-3d group flex h-40 flex-col justify-between rounded-2xl p-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                  {l.label}
                </span>
                <span className="font-display text-lg text-white/80 transition-colors group-hover:text-neon">
                  {l.handle}
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} deep mane — digital archive</span>
          <span>built with react three fiber · rendered live</span>
        </div>
      </div>
    </section>
  );
}
