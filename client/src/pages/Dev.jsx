/* ============================================================
   Dev.jsx — dev.zerotressete
   Design: Cyberpunk Editorial Holográfico — acento VERDE-CIANO
   Convertido para JavaScript
   ============================================================ */

import { useState } from "react";
import { Link } from "wouter";

const CARD_DEV = "https://d2xsxph8kpxj0f.cloudfront.net/310519663542977115/JnQTxZJyqkvzQNoD8LaQkg/card-dev-3z5GvimjtR39XYcYpXvHko.webp";
const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663542977115/JnQTxZJyqkvzQNoD8LaQkg/logo-037-d9pWLdnvph6ANwmqzeGK4i.webp";

const ACCENT = "oklch(0.80 0.20 150)";
const ACCENT_BG = "oklch(0.80 0.20 150 / 0.08)";
const ACCENT_BORDER = "oklch(0.80 0.20 150 / 0.35)";
const ACCENT_GLOW = "0 0 40px oklch(0.80 0.20 150 / 0.3)";

const projects = [
  {
    title: "zerotressete Hub",
    description: "Este próprio site — hub de projetos com design cyberpunk holográfico. Feito com Manus AI (vibe code) e customizado à mão. React + JavaScript + Tailwind.",
    tags: ["React", "JavaScript", "Tailwind", "Vibe Code"],
    year: "2025",
    status: "Live",
    link: "/",
    vibecode: true, // badge especial
  },
  {
    title: "Linha Cidadã",
    description: "API REST para gestão de demandas cidadãs, desenvolvida como projeto de curso. Autenticação JWT, rotas protegidas, persistência em SQLite.",
    tags: ["Node.js", "Express", "JWT", "SQLite", "bcrypt"],
    year: "2025",
    status: "Em desenvolvimento",
    link: "https://github.com/BauraLeatriz",
  },
];

const stack = [
  { category: "Frontend", items: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "JWT", "bcrypt"] },
  { category: "Banco de Dados", items: ["SQLite", "Drizzle ORM"] },
  { category: "Eletrônica", items: ["Arduino", "Sensores", "Prototipagem"] },
  { category: "Ferramentas", items: ["Git", "VS Code", "Vite"] },
];

const statusColors = {
  "Live": "oklch(0.80 0.20 150)",
  "Em desenvolvimento": "oklch(0.92 0.18 95)",
  "Concluído": "oklch(0.85 0.18 195)",
};

export default function Dev() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const filters = ["Todos", "React", "Node.js", "Arduino"];

  const filtered = activeFilter === "Todos"
    ? projects
    : projects.filter((p) => p.tags.some((t) => t.includes(activeFilter)));

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.09 0.025 265)" }}>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "oklch(0.09 0.025 265 / 0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid oklch(1 0 0 / 0.06)",
        }}
      >
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={LOGO} alt="037" className="w-8 h-8 object-contain" />
            <span className="text-sm opacity-40 tracking-widest" style={{ fontFamily: "'Syne', sans-serif" }}>
              zerotressete
            </span>
            <span className="opacity-20 text-sm">/</span>
            <span className="text-sm font-bold tracking-widest" style={{ fontFamily: "'Syne', sans-serif", color: ACCENT }}>
              dev
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/dev.zerotressete"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded text-xs tracking-widest uppercase transition-all duration-300 hover:opacity-90"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: ACCENT,
              background: ACCENT_BG,
              border: `1px solid ${ACCENT_BORDER}`,
            }}
          >
            IG
          </a>
          <a
            href="https://github.com/BauraLeatriz"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded text-xs tracking-widest uppercase transition-all duration-300 hover:opacity-90"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "oklch(0.09 0.025 265)",
              background: ACCENT,
              boxShadow: ACCENT_GLOW,
            }}
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${CARD_DEV})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, oklch(0.09 0.025 265 / 0.4) 0%, oklch(0.09 0.025 265 / 0.8) 60%, oklch(0.09 0.025 265) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.04) 2px, oklch(0 0 0 / 0.04) 4px)",
          }}
        />
        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4 opacity-40"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: ACCENT }}
          >
            — dev.zerotressete —
          </p>
          <h1
            className="text-[clamp(4rem,14vw,12rem)] font-bold leading-none mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT, textShadow: `0 0 60px ${ACCENT}` }}
          >
            DEV
          </h1>
          <p
            className="text-base md:text-lg max-w-lg leading-relaxed opacity-60"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Portfólio de desenvolvimento em construção. JavaScript, Node.js e projetos reais do dia a dia.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                — projetos —
              </p>
              <h2 className="text-6xl md:text-7xl font-bold leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}>
                TRABALHOS
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-3 py-1.5 rounded text-xs tracking-widest uppercase transition-all duration-200"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: activeFilter === f ? "oklch(0.09 0.025 265)" : ACCENT,
                    background: activeFilter === f ? ACCENT : ACCENT_BG,
                    border: `1px solid ${ACCENT_BORDER}`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((project, i) => (
              <div
                key={i}
                className="p-6 rounded-lg transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: "oklch(0.11 0.02 265 / 0.8)",
                  border: "1px solid oklch(1 0 0 / 0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = `1px solid ${ACCENT_BORDER}`;
                  e.currentTarget.style.boxShadow = ACCENT_GLOW;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid oklch(1 0 0 / 0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs opacity-30" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    {project.year}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.vibecode && (
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: "oklch(0.85 0.25 310)",
                          background: "oklch(0.85 0.25 310 / 0.1)",
                          border: "1px solid oklch(0.85 0.25 310 / 0.35)",
                        }}
                      >
                        vibe code ✦
                      </span>
                    )}
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: statusColors[project.status] || ACCENT,
                        background: `${statusColors[project.status] || ACCENT}15`,
                        border: `1px solid ${statusColors[project.status] || ACCENT}40`,
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif", color: "oklch(0.95 0.005 265)" }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-55 mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: ACCENT,
                        background: ACCENT_BG,
                        border: `1px solid ${ACCENT_BORDER}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && project.link !== "/" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: ACCENT }}
                  >
                    ver no GitHub →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              — tecnologias —
            </p>
            <h2 className="text-6xl md:text-7xl font-bold leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "oklch(0.95 0.005 265)" }}>
              STACK
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stack.map((group, i) => (
              <div key={i}>
                <p
                  className="text-xs tracking-widest uppercase mb-4 opacity-40"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: ACCENT }}
                >
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "oklch(0.80 0.01 265)",
                        background: "oklch(0.13 0.02 265 / 0.8)",
                        border: "1px solid oklch(1 0 0 / 0.08)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal contact */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-lg overflow-hidden"
            style={{
              background: "oklch(0.08 0.02 265)",
              border: `1px solid ${ACCENT_BORDER}`,
              boxShadow: ACCENT_GLOW,
            }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)", background: "oklch(0.11 0.02 265)" }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
              <div className="w-3 h-3 rounded-full opacity-70" style={{ background: ACCENT }} />
              <span className="text-xs opacity-30 ml-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                dev@zerotressete ~ %
              </span>
            </div>
            <div className="p-6 space-y-2">
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.875rem" }}>
                <span style={{ color: ACCENT }}>$ </span>
                <span className="opacity-70">whoami</span>
              </p>
              <p className="opacity-50 text-sm pl-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                Laura Beatriz (Baura) — dev em formação, Minas Gerais
              </p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.875rem" }}>
                <span style={{ color: ACCENT }}>$ </span>
                <span className="opacity-70">cat contact.txt</span>
              </p>
              <div className="pl-4 space-y-1">
                <p className="opacity-50 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  github: github.com/BauraLeatriz
                </p>
                <p className="opacity-50 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  instagram: @dev.zerotressete
                </p>
                {/* Adicione email/outros contatos quando estiver pronto */}
              </div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.875rem" }}>
                <span style={{ color: ACCENT }}>$ </span>
                <span className="opacity-70">echo "aprendendo na prática, um projeto de cada vez"</span>
              </p>
              <p className="opacity-50 text-sm pl-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                aprendendo na prática, um projeto de cada vez
              </p>
              <p className="flex items-center gap-1" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.875rem" }}>
                <span style={{ color: ACCENT }}>$ </span>
                <span
                  className="inline-block w-2 h-4 opacity-70"
                  style={{ background: ACCENT, animation: "pulse 1s step-end infinite" }}
                />
              </p>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <a
              href="https://github.com/BauraLeatriz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded text-xs tracking-widest uppercase text-center transition-all duration-300 hover:opacity-90"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: ACCENT,
                background: ACCENT_BG,
                border: `1px solid ${ACCENT_BORDER}`,
              }}
            >
              GitHub
            </a>
            <a
              href="https://instagram.com/dev.zerotressete"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded text-xs tracking-widest uppercase text-center transition-all duration-300 hover:opacity-90"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: ACCENT,
                color: "oklch(0.09 0.025 265)",
                boxShadow: ACCENT_GLOW,
              }}
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer opacity-40 hover:opacity-70 transition-opacity">
              <img src={LOGO} alt="037" className="w-7 h-7 object-contain" />
              <span className="text-xs tracking-widest" style={{ fontFamily: "'Syne', sans-serif" }}>
                ← voltar ao hub
              </span>
            </div>
          </Link>
          <span className="text-xs opacity-20" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            dev.zerotressete © 2025
          </span>
        </div>
      </footer>
    </div>
  );
}
