/* ============================================================
   Home.jsx — Hub principal zerotressete
   Design: Cyberpunk Editorial Holográfico
   Convertido para JavaScript
   ============================================================ */

import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663542977115/JnQTxZJyqkvzQNoD8LaQkg/hero-hub-nhjax5ipgNqmKsa3WiVLRS.webp";
const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663542977115/JnQTxZJyqkvzQNoD8LaQkg/logo-037-d9pWLdnvph6ANwmqzeGK4i.webp";
const CARD_TECH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663542977115/JnQTxZJyqkvzQNoD8LaQkg/card-tech-akW8PYVhomiowmPUuC9Q8b.webp";
const CARD_DEV = "https://d2xsxph8kpxj0f.cloudfront.net/310519663542977115/JnQTxZJyqkvzQNoD8LaQkg/card-dev-3z5GvimjtR39XYcYpXvHko.webp";
const CARD_GARAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663542977115/JnQTxZJyqkvzQNoD8LaQkg/card-garage-VvXSunpRfQv4AqvhR3CQnU.webp";

const subdomains = [
  {
    id: "tech",
    label: "tech.zerotressete",
    title: "TECH",
    description: "Consertos e manutenção de notebooks, desktops, consoles e eletrônica geral. Agende seu serviço.",
    image: CARD_TECH,
    accent: "oklch(0.85 0.18 195)",
    accentBg: "oklch(0.85 0.18 195 / 0.08)",
    accentGlow: "0 0 40px oklch(0.85 0.18 195 / 0.35)",
    accentBorder: "oklch(0.85 0.18 195 / 0.4)",
    href: "/tech",
    tag: "Eletrônica",
    number: "01",
  },
  {
    id: "dev",
    label: "dev.zerotressete",
    title: "DEV",
    description: "Portfólio de desenvolvimento em construção. JavaScript, Node.js e projetos reais do dia a dia.",
    image: CARD_DEV,
    accent: "oklch(0.80 0.20 150)",
    accentBg: "oklch(0.80 0.20 150 / 0.08)",
    accentGlow: "0 0 40px oklch(0.80 0.20 150 / 0.35)",
    accentBorder: "oklch(0.80 0.20 150 / 0.4)",
    href: "/dev",
    tag: "Software",
    number: "02",
  },
  {
    id: "garage",
    label: "garage.zerotressete",
    title: "GARAGE",
    description: "Projetos maker, Arduino, impressão 3D e preparação de carros. Onde as ideias ganham forma física.",
    image: CARD_GARAGE,
    accent: "oklch(0.75 0.22 45)",
    accentBg: "oklch(0.75 0.22 45 / 0.08)",
    accentGlow: "0 0 40px oklch(0.75 0.22 45 / 0.35)",
    accentBorder: "oklch(0.75 0.22 45 / 0.4)",
    href: "/garage",
    tag: "Maker & Auto",
    number: "03",
  },
];

function TiltCard({ card }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 12, y: -x * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className="relative group cursor-pointer"
    >
      <Link href={card.href}>
        <div
          className="relative overflow-hidden rounded-lg h-[480px] md:h-[560px]"
          style={{
            background: "oklch(0.11 0.02 265 / 0.9)",
            border: `1px solid ${card.accentBorder}`,
            boxShadow: isHovered ? card.accentGlow : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{
              backgroundImage: `url(${card.image})`,
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, oklch(0.09 0.025 265 / 0.3) 0%, oklch(0.09 0.025 265 / 0.75) 50%, oklch(0.09 0.025 265 / 0.97) 100%)`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.04) 2px, oklch(0 0 0 / 0.04) 4px)",
            }}
          />
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${card.accent} 0%, transparent 50%, ${card.accent} 100%)`,
                opacity: 0.06,
              }}
            />
          )}
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span
                className="text-xs font-mono uppercase tracking-widest px-2 py-1 rounded"
                style={{
                  color: card.accent,
                  background: card.accentBg,
                  border: `1px solid ${card.accentBorder}`,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                {card.tag}
              </span>
              <span
                className="text-6xl font-bold opacity-10 leading-none select-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: card.accent }}
              >
                {card.number}
              </span>
            </div>
            <div>
              <p
                className="text-xs mb-3 opacity-50 tracking-widest uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {card.label}
              </p>
              <h2
                className="text-7xl font-bold leading-none mb-4"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: card.accent,
                  textShadow: `0 0 30px ${card.accent}`,
                }}
              >
                {card.title}
              </h2>
              <p
                className="text-sm leading-relaxed mb-6 opacity-75"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {card.description}
              </p>
              <div
                className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-all duration-300"
                style={{
                  color: card.accent,
                  fontFamily: "'Syne', sans-serif",
                  transform: isHovered ? "translateX(8px)" : "translateX(0)",
                }}
              >
                <span>Acessar</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.09 0.025 265)" }}>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: scrollY > 50 ? "oklch(0.09 0.025 265 / 0.9)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom: scrollY > 50 ? "1px solid oklch(1 0 0 / 0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="037" className="w-10 h-10 object-contain" />
          <span
            className="text-lg font-bold tracking-widest"
            style={{ fontFamily: "'Syne', sans-serif", color: "oklch(0.95 0.005 265)" }}
          >
            zerotressete
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {subdomains.map((s) => (
            <Link key={s.id} href={s.href}>
              <span
                className="text-xs tracking-widest uppercase transition-colors duration-200 hover:opacity-100 opacity-50"
                style={{ fontFamily: "'Syne', sans-serif", color: s.accent }}
              >
                {s.id}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, oklch(0.09 0.025 265 / 0.6) 0%, oklch(0.09 0.025 265 / 0.85) 60%, oklch(0.09 0.025 265) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, oklch(0 0 0 / 0.03) 3px, oklch(0 0 0 / 0.03) 6px)",
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-6 flex justify-center">
            <img src={LOGO} alt="037" className="w-24 h-24 md:w-32 md:h-32 object-contain animate-float" />
          </div>
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4 opacity-50"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            — hub de projetos —
          </p>
          <h1
            className="text-[clamp(5rem,18vw,16rem)] font-bold leading-none mb-6 holo-text"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            037
          </h1>
          <p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed opacity-60 mb-12"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Três universos. Uma identidade. Eletrônica, software e mecânica — tudo em um só lugar.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {subdomains.map((s) => (
              <Link key={s.id} href={s.href}>
                <span
                  className="px-4 py-2 rounded text-xs tracking-widest uppercase transition-all duration-300 hover:opacity-100"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: s.accent,
                    background: s.accentBg,
                    border: `1px solid ${s.accentBorder}`,
                  }}
                >
                  {s.id}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-current to-transparent" />
        </div>
      </section>

      {/* Cards */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p
                className="text-xs tracking-[0.4em] uppercase mb-3 opacity-40"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                — universos —
              </p>
              <h2
                className="text-6xl md:text-8xl font-bold leading-none holo-text"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                PROJETOS
              </h2>
            </div>
            <div
              className="hidden md:block text-right opacity-30 text-xs"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <p>zerotressete.com</p>
              <p>v1.0.0</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subdomains.map((card) => (
              <TiltCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats — ajuste os números conforme a realidade do projeto crescer */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 3, suffix: "", label: "Universos", accent: "oklch(0.85 0.18 195)" },
              { value: 1, suffix: "+", label: "Projetos ativos", accent: "oklch(0.80 0.20 150)" },
              { value: 2, suffix: "", label: "Projetos dev", accent: "oklch(0.75 0.25 320)" },
              { value: 1, suffix: "", label: "Build garage", accent: "oklch(0.75 0.22 45)" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-5xl md:text-6xl font-bold mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", color: stat.accent }}
                >
                  <AnimatedCounter target={stat.value} />
                  {stat.suffix}
                </div>
                <p
                  className="text-xs opacity-40 tracking-widest uppercase"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="037" className="w-8 h-8 object-contain opacity-60" />
            <span
              className="text-sm opacity-30 tracking-widest"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              zerotressete © 2025
            </span>
          </div>
          <div className="flex items-center gap-6">
            {subdomains.map((s) => (
              <Link key={s.id} href={s.href}>
                <span
                  className="text-xs tracking-widest uppercase opacity-30 hover:opacity-70 transition-opacity"
                  style={{ fontFamily: "'Syne', sans-serif", color: s.accent }}
                >
                  {s.id}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
