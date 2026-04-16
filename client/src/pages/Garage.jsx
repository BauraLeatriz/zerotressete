/* ============================================================
   Garage.jsx — garage.zerotressete
   Design: Cyberpunk Editorial Holográfico — acento LARANJA
   Convertido para JavaScript
   ============================================================ */

import { useState } from "react";
import { Link } from "wouter";
import Gallery from "@/components/Gallery";

const CARD_GARAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663542977115/JnQTxZJyqkvzQNoD8LaQkg/card-garage-VvXSunpRfQv4AqvhR3CQnU.webp";
const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663542977115/JnQTxZJyqkvzQNoD8LaQkg/logo-037-d9pWLdnvph6ANwmqzeGK4i.webp";

const ACCENT = "oklch(0.75 0.22 45)";
const ACCENT_BG = "oklch(0.75 0.22 45 / 0.08)";
const ACCENT_BORDER = "oklch(0.75 0.22 45 / 0.35)";
const ACCENT_GLOW = "0 0 40px oklch(0.75 0.22 45 / 0.3)";

// Projetos de carro reais
const carProjects = [
  {
    title: "Gol G3 Oni",
    description: "Projeto de preparação e personalização do Gol G3. Modificações estéticas e mecânicas — de série pra algo único. Em andamento.",
    status: "Em andamento",
    progress: 15,
    tags: ["Motor", "Estética", "Preparação"],
    year: "2025–",
    highlight: true,
  },
];

// Projetos maker — em breve
const makerProjects = [
  {
    title: "Projetos Arduino",
    description: "Automação rural e projetos IoT usando Arduino. Sensores, atuadores e integração com a fazenda. Em planejamento.",
    status: "Em breve",
    tags: ["Arduino", "IoT", "Automação Rural"],
    year: "2025–",
  },
  {
    title: "Impressão 3D",
    description: "Projetos de fabricação digital e prototipagem. Peças customizadas para os projetos do 037. Aguardando equipamento (Bambu Lab P1S).",
    status: "Em breve",
    tags: ["3D Print", "Prototipagem", "Bambu Lab"],
    year: "2025–",
  },
];

// Ferramentas reais disponíveis
const tools = [
  { name: "Multímetro Fluke", category: "Eletrônica" },
  { name: "Estação de Solda", category: "Eletrônica" },
  { name: "Ferro de Solda", category: "Eletrônica" },
  { name: "Sugador de Solda", category: "Eletrônica" },
  { name: "Kit Chaves", category: "Mecânica" },
  { name: "Kit Arduino", category: "Prototipagem" },
  // Ferramentas planejadas
  { name: "Bambu Lab P1S ⟳", category: "Fabricação (em aquisição)" },
];

// Galeria placeholder — adicionar fotos reais depois
const galleryItems = [
  {
    id: "gol-g3-1",
    title: "Gol G3 Oni — Estado atual",
    category: "carros",
    image: "https://images.unsplash.com/photo-1494976866556-6812c9d1c72e?w=500&h=500&fit=crop",
    description: "Primeiro registro do projeto. Fotos reais em breve.",
  },
];

function ProgressBar({ value, accent }) {
  return (
    <div
      className="w-full h-1.5 rounded-full overflow-hidden"
      style={{ background: "oklch(1 0 0 / 0.08)" }}
    >
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, ${accent}, oklch(0.92 0.18 95))`,
          boxShadow: `0 0 8px ${accent}`,
        }}
      />
    </div>
  );
}

export default function Garage() {
  const [activeTab, setActiveTab] = useState("carros");

  const tabs = [
    { id: "carros", label: "🚗 Carros" },
    { id: "maker", label: "🔧 Maker" },
    { id: "galeria", label: "📸 Galeria" },
    // Futuramente: arduino, impressao3d como abas separadas
  ];

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
              garage
            </span>
          </div>
        </Link>
        <a
          href="https://instagram.com/garage.zerotressete"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded text-xs tracking-widest uppercase transition-all duration-300 hover:opacity-90"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: ACCENT,
            background: ACCENT_BG,
            border: `1px solid ${ACCENT_BORDER}`,
          }}
        >
          IG
        </a>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${CARD_GARAGE})` }}
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
            — garage.zerotressete —
          </p>
          <h1
            className="text-[clamp(3rem,12vw,11rem)] font-bold leading-none mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT, textShadow: `0 0 60px ${ACCENT}` }}
          >
            GARAGE
          </h1>
          <p
            className="text-base md:text-lg max-w-lg leading-relaxed opacity-60"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Projetos maker, DIY e preparação de carros. Onde as ideias ganham forma física.
          </p>
        </div>
      </section>

      {/* Builds */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              — projetos —
            </p>
            <h2 className="text-6xl md:text-7xl font-bold leading-none mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}>
              BUILDS
            </h2>
            <div className="flex gap-3 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-5 py-2 rounded text-xs tracking-widest uppercase transition-all duration-200"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: activeTab === tab.id ? "oklch(0.09 0.025 265)" : ACCENT,
                    background: activeTab === tab.id ? ACCENT : ACCENT_BG,
                    border: `1px solid ${ACCENT_BORDER}`,
                    boxShadow: activeTab === tab.id ? ACCENT_GLOW : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Carros */}
          {activeTab === "carros" && (
            <div className="space-y-6">
              {carProjects.map((project, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg transition-all duration-300"
                  style={{
                    background: project.highlight ? "oklch(0.12 0.025 265 / 0.9)" : "oklch(0.11 0.02 265 / 0.7)",
                    border: project.highlight ? `1px solid ${ACCENT_BORDER}` : "1px solid oklch(1 0 0 / 0.06)",
                    boxShadow: project.highlight ? ACCENT_GLOW : "none",
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {project.highlight && (
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              fontFamily: "'IBM Plex Mono', monospace",
                              color: ACCENT,
                              background: ACCENT_BG,
                              border: `1px solid ${ACCENT_BORDER}`,
                            }}
                          >
                            ● Em andamento
                          </span>
                        )}
                        <span className="text-xs opacity-30" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {project.year}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif", color: "oklch(0.95 0.005 265)" }}>
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed opacity-55 mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="text-xs px-2 py-1 rounded"
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
                    </div>
                    <div className="md:w-32">
                      <span className="text-xs opacity-50" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        Progresso
                      </span>
                      <ProgressBar value={project.progress} accent={ACCENT} />
                      <span className="text-xs opacity-50 mt-1 block" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Maker */}
          {activeTab === "maker" && (
            <div className="space-y-6">
              {makerProjects.map((project, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg transition-all duration-300"
                  style={{
                    background: "oklch(0.11 0.02 265 / 0.7)",
                    border: "1px solid oklch(1 0 0 / 0.06)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            color: "oklch(0.92 0.18 95)",
                            background: "oklch(0.92 0.18 95 / 0.1)",
                            border: "1px solid oklch(0.92 0.18 95 / 0.35)",
                          }}
                        >
                          {project.status}
                        </span>
                        <span className="text-xs opacity-30" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {project.year}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif", color: "oklch(0.95 0.005 265)" }}>
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed opacity-55 mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="text-xs px-2 py-1 rounded"
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Gallery */}
          {activeTab === "galeria" && (
            <Gallery
              items={galleryItems}
              accentColor={ACCENT}
              accentBg={ACCENT_BG}
              accentBorder={ACCENT_BORDER}
              accentGlow={ACCENT_GLOW}
            />
          )}
        </div>
      </section>

      {/* Tools */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              — arsenal —
            </p>
            <h2 className="text-6xl md:text-7xl font-bold leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}>
              FERRAMENTAS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool, i) => (
              <div
                key={i}
                className="p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "oklch(0.11 0.02 265 / 0.8)",
                  border: "1px solid oklch(1 0 0 / 0.06)",
                  opacity: tool.category.includes("em aquisição") ? 0.6 : 1,
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
                <p className="text-sm font-bold mb-1" style={{ fontFamily: "'Syne', sans-serif", color: ACCENT }}>
                  {tool.name}
                </p>
                <p className="text-xs opacity-50" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {tool.category}
                </p>
              </div>
            ))}
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
            garage.zerotressete © 2025
          </span>
        </div>
      </footer>
    </div>
  );
}
