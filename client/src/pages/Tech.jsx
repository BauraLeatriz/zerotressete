/* ============================================================
   Tech.jsx — tech.zerotressete
   Design: Cyberpunk Editorial Holográfico — acento CIANO
   Convertido para JavaScript
   ============================================================ */

import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const CARD_TECH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663542977115/JnQTxZJyqkvzQNoD8LaQkg/card-tech-akW8PYVhomiowmPUuC9Q8b.webp";
const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663542977115/JnQTxZJyqkvzQNoD8LaQkg/logo-037-d9pWLdnvph6ANwmqzeGK4i.webp";

const ACCENT = "oklch(0.85 0.18 195)";
const ACCENT_BG = "oklch(0.85 0.18 195 / 0.08)";
const ACCENT_BORDER = "oklch(0.85 0.18 195 / 0.35)";
const ACCENT_GLOW = "0 0 40px oklch(0.85 0.18 195 / 0.3)";

// Smartphones e Wearables removidos — serviços reais disponíveis
const services = [
  {
    icon: "💻",
    title: "Notebooks",
    description: "Limpeza, troca de pasta térmica, HD/SSD, memória RAM, teclado e diagnóstico completo.",
    time: "2–5 dias úteis",
  },
  {
    icon: "🖥️",
    title: "Desktops",
    description: "Montagem, upgrade, limpeza e diagnóstico de hardware e software.",
    time: "1–3 dias úteis",
  },
  {
    icon: "🎮",
    title: "Consoles",
    description: "Reparo de PlayStation, Xbox, Nintendo — leitura de disco, HDMI, joystick.",
    time: "3–7 dias úteis",
  },
  {
    icon: "🔌",
    title: "Eletrônica Geral",
    description: "Placas, fontes, carregadores, solda e diagnóstico de componentes.",
    time: "Variável",
  },
];

// Reparos recentes — admin pode adicionar via painel futuramente
const portfolio = [
  {
    device: "Dell Inspiron 15",
    service: "Limpeza + troca de pasta térmica + SSD",
    status: "Concluído",
    tag: "Notebook",
  },
  // Adicione mais entradas aqui ou via painel admin
];

export default function Tech() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    device: "",
    problem: "",
    date: "",
  });

  const createSchedule = trpc.schedule.create.useMutation({
    onSuccess: () => {
      toast.success("Agendamento enviado com sucesso!", {
        description: "Entraremos em contato em até 24h para confirmar.",
      });
      setForm({ name: "", email: "", phone: "", device: "", problem: "", date: "" });
    },
    onError: (error) => {
      toast.error("Erro ao enviar agendamento", {
        description: error.message || "Tente novamente mais tarde.",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.device || !form.problem) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    await createSchedule.mutate({
      name: form.name,
      email: form.email || undefined,
      phone: form.phone,
      device: form.device,
      problem: form.problem,
      date: form.date || undefined,
    });
  };

  const inputStyle = {
    background: "oklch(0.12 0.02 265 / 0.8)",
    border: `1px solid ${ACCENT_BORDER}`,
    color: "oklch(0.95 0.005 265)",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.875rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.375rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

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
              tech
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/tech.zerotressete"
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
            href="#agendar"
            className="px-4 py-2 rounded text-xs tracking-widest uppercase transition-all duration-300 hover:opacity-90"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "oklch(0.09 0.025 265)",
              background: ACCENT,
              boxShadow: ACCENT_GLOW,
            }}
          >
            Agendar
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${CARD_TECH})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, oklch(0.09 0.025 265 / 0.5) 0%, oklch(0.09 0.025 265 / 0.85) 60%, oklch(0.09 0.025 265) 100%)",
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
            — tech.zerotressete —
          </p>
          <h1
            className="text-[clamp(4rem,14vw,12rem)] font-bold leading-none mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT, textShadow: `0 0 60px ${ACCENT}` }}
          >
            TECH
          </h1>
          <p
            className="text-base md:text-lg max-w-lg leading-relaxed opacity-60"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Consertos e manutenção de eletrônicos com diagnóstico preciso e peças de qualidade.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              — serviços —
            </p>
            <h2 className="text-6xl md:text-7xl font-bold leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}>
              O QUE FAZEMOS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <div
                key={i}
                className="p-6 rounded-lg transition-all duration-300 hover:scale-[1.02] group"
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
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "'Syne', sans-serif", color: ACCENT }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed opacity-60 mb-4"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs opacity-50"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: ACCENT }}
                  >
                    Orçamento sob consulta
                  </span>
                  <span
                    className="text-xs opacity-40"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {service.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent repairs */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              — portfólio —
            </p>
            <h2 className="text-6xl md:text-7xl font-bold leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "oklch(0.95 0.005 265)" }}>
              REPAROS RECENTES
            </h2>
          </div>
          <div className="space-y-3">
            {portfolio.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{
                  background: "oklch(0.11 0.02 265 / 0.5)",
                  border: "1px solid oklch(1 0 0 / 0.05)",
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: ACCENT,
                      background: ACCENT_BG,
                      border: `1px solid ${ACCENT_BORDER}`,
                    }}
                  >
                    {item.tag}
                  </span>
                  <div>
                    <p className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "oklch(0.95 0.005 265)" }}>
                      {item.device}
                    </p>
                    <p className="text-xs opacity-50" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {item.service}
                    </p>
                  </div>
                </div>
                <span className="text-xs opacity-40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Form */}
      <section id="agendar" className="py-24 px-6" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              — agende seu serviço —
            </p>
            <h2 className="text-6xl md:text-7xl font-bold leading-none mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}>
              AGENDAR
            </h2>
            <p className="text-sm opacity-60 max-w-md" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Preencha o formulário e entraremos em contato em até 24h para confirmar o agendamento.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Seu nome *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  disabled={createSchedule.isPending}
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="WhatsApp / Telefone *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle}
                  disabled={createSchedule.isPending}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="E-mail (opcional)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                disabled={createSchedule.isPending}
              />
              <input
                type="text"
                placeholder="Dispositivo *"
                value={form.device}
                onChange={(e) => setForm({ ...form, device: e.target.value })}
                style={inputStyle}
                disabled={createSchedule.isPending}
              />
            </div>

            <textarea
              placeholder="Descreva o problema *"
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
              style={{ ...inputStyle, minHeight: "120px", resize: "none" }}
              disabled={createSchedule.isPending}
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              style={inputStyle}
              disabled={createSchedule.isPending}
            />

            <button
              type="submit"
              disabled={createSchedule.isPending}
              className="w-full py-3 rounded font-bold tracking-widest uppercase transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: ACCENT,
                color: "oklch(0.09 0.025 265)",
                fontSize: "0.875rem",
                boxShadow: ACCENT_GLOW,
              }}
            >
              {createSchedule.isPending ? "Enviando..." : "Agendar Serviço"}
            </button>
          </form>
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
            tech.zerotressete © 2025
          </span>
        </div>
      </footer>
    </div>
  );
}
