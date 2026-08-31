import { useEffect, useState } from "react";

/** Global mutable scroll state readable inside the r3f render loop (no re-renders). */
export const scrollState = {
  progress: 0, // 0..1 over full document
  velocity: 0,
  y: 0,
  section: 0,
  pointerX: 0,
  pointerY: 0,
};

let bound = false;

export function bindScrollState() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  let last = window.scrollY;

  const onScroll = () => {
    const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
    scrollState.y = window.scrollY;
    scrollState.progress = Math.min(1, Math.max(0, window.scrollY / max));
    scrollState.velocity = window.scrollY - last;
    last = window.scrollY;
    scrollState.section = Math.floor(window.scrollY / window.innerHeight);
  };

  const onMove = (e: PointerEvent) => {
    scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onMove, { passive: true });
  onScroll();
}

export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      setP(Math.min(1, Math.max(0, window.scrollY / max)));
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return p;
}
