import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Interests from "./sections/Interests";
import Identity from "./sections/Identity";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import { Marquee } from "./components/ui";
import { bindScrollState } from "./lib/scroll";

const Scene = lazy(() => import("./three/Scene"));

function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotateY: 360, rotateX: 360 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
              className="mx-auto h-16 w-16 border border-neon/50"
              style={{ transformStyle: "preserve-3d" }}
            />
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.5em] text-white/40">
              compiling reality…
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    bindScrollState();
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-white noise">
      <Loader done={ready} />

      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* readability scrim over the webgl layer */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(5,6,10,0) 25%, rgba(5,6,10,0.75) 75%, rgba(5,6,10,0.95) 100%)",
        }}
      />

      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Marquee
            items={[
              "anime",
              "technology",
              "artificial intelligence",
              "ui / ux",
              "日本語",
              "video editing",
              "football",
              "guitar",
            ]}
          />
          <Interests />
          <Identity />
          <Work />
          <Contact />
        </main>
      </div>
    </div>
  );
}
