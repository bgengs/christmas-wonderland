import { useEffect, useRef } from "react";

// Three-depth-layer canvas snowfall. Background flakes are small and slow,
// foreground flakes large and fast; on desktop the whole field drifts with
// the pointer for a gentle parallax. Density adapts to viewport size.

interface Flake {
  x: number;
  y: number;
  r: number;
  speed: number;
  sway: number;
  phase: number;
  layer: number;
}

export default function Snowfall({ density = 1, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    let raf = 0;
    let mouseX = 0;
    let targetMouseX = 0;

    const count = Math.floor(((w * h) / (14000 * devicePixelRatio * devicePixelRatio)) * density);
    const flakes: Flake[] = Array.from({ length: Math.max(40, count) }, () => {
      const layer = Math.random() < 0.45 ? 0 : Math.random() < 0.7 ? 1 : 2;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: (0.8 + layer * 0.9 + Math.random() * 1.2) * devicePixelRatio,
        speed: (0.25 + layer * 0.45 + Math.random() * 0.4) * devicePixelRatio,
        sway: (10 + Math.random() * 26) * devicePixelRatio,
        phase: Math.random() * Math.PI * 2,
        layer,
      };
    });

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    const onMouse = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);

    let t = 0;
    const draw = () => {
      t += 0.008;
      mouseX += (targetMouseX - mouseX) * 0.02;
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y += f.speed;
        if (f.y > h + 8) {
          f.y = -8;
          f.x = Math.random() * w;
        }
        const drift = Math.sin(t * 2 + f.phase) * f.sway * 0.06 + mouseX * (f.layer + 1) * 0.7 * devicePixelRatio;
        const alpha = 0.28 + f.layer * 0.24;
        ctx.beginPath();
        ctx.arc(f.x + drift, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254, 241, 232, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
