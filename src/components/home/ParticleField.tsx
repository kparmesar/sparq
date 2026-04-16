"use client";

import { useRef, useEffect } from "react";

// --- Simplex-inspired noise (fast 2D) ---
function createNoise() {
  const perm = new Uint8Array(512);
  const grad = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];
  for (let i = 0; i < 256; i++) perm[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  for (let i = 256; i < 512; i++) perm[i] = perm[i - 256];

  function dot(gi: number, x: number, y: number) {
    const g = grad[gi % 8];
    return g[0] * x + g[1] * y;
  }

  function fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
  }

  return function noise2D(x: number, y: number): number {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[perm[xi] + yi];
    const ab = perm[perm[xi] + yi + 1];
    const ba = perm[perm[xi + 1] + yi];
    const bb = perm[perm[xi + 1] + yi + 1];
    return lerp(
      lerp(dot(aa, xf, yf), dot(ba, xf - 1, yf), u),
      lerp(dot(ab, xf, yf - 1), dot(bb, xf - 1, yf - 1), u),
      v
    );
  };
}

// --- Types ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  speed: number;
}

const COLORS = [
  "234, 179, 8",    // yellow star
  "37, 99, 235",    // blue star
  "22, 163, 74",    // green star
  "147, 197, 253",  // light blue
  "255, 255, 255",  // white
  "167, 139, 250",  // soft purple
];

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const noiseRef = useRef(createNoise());
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const noise = noiseRef.current;

    function createParticle(startX?: number, startY?: number): Particle {
      const x = startX ?? Math.random() * w;
      const y = startY ?? Math.random() * h;
      const maxAlpha = 0.15 + Math.random() * 0.55;
      const maxLife = 300 + Math.random() * 600;
      return {
        x, y,
        vx: 0, vy: 0,
        radius: 0.6 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0,
        maxAlpha,
        life: 0,
        maxLife,
        speed: 0.1 + Math.random() * 0.2,
      };
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((w * h) / 3000), 250);
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const p = createParticle();
        p.life = Math.random() * p.maxLife; // stagger so they don't all fade in at once
        particles.push(p);
      }
      particlesRef.current = particles;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      timeRef.current += 0.002;
      const t = timeRef.current;
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Flow field angle from noise (two octaves for organic feel)
        const scale1 = 0.003;
        const scale2 = 0.006;
        const n1 = noise(p.x * scale1 + t, p.y * scale1 + t * 0.7);
        const n2 = noise(p.x * scale2 - t * 0.5, p.y * scale2 + t * 0.3);
        const angle = (n1 + n2 * 0.5) * Math.PI * 2;

        // Flow velocity
        p.vx += Math.cos(angle) * p.speed * 0.05;
        p.vy += Math.sin(angle) * p.speed * 0.05;

        // Mouse repulsion — gentle push
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = ((180 - dist) / 180) * 1.5;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }

        // Damping
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Lifecycle: fade in → sustain → fade out
        const fadeIn = Math.min(p.life / 60, 1);
        const fadeOut = Math.max((p.maxLife - p.life) / 60, 0);
        p.alpha = p.maxAlpha * Math.min(fadeIn, fadeOut);

        // Recycle dead particles
        if (p.life >= p.maxLife || p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          particles[i] = createParticle();
          continue;
        }

        // Draw glow for larger particles
        if (p.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.08})`;
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      }

      // Connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].alpha < 0.1) continue;
        for (let j = i + 1; j < particles.length; j++) {
          if (particles[j].alpha < 0.1) continue;
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy; // skip sqrt for perf
          if (dist < 5000) { // ~70px
            const a = (1 - dist / 5000) * Math.min(particles[i].alpha, particles[j].alpha) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${a})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "auto" }}
    />
  );
}
