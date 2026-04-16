/* ============================================================
   Gallery.jsx — Componente de galeria com lightbox
   Convertido para JavaScript
   ============================================================ */

import { useState } from "react";
import { X } from "lucide-react";

// Em JS não há interface — props esperadas:
// items: [{ id, title, category, image, description? }]
// accentColor, accentBg, accentBorder, accentGlow: strings de cor

export default function Gallery({ items, accentColor, accentBg, accentBorder, accentGlow }) {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("todos");

  const categories = ["todos", ...Array.from(new Set(items.map((item) => item.category)))];
  const filteredItems = filter === "todos" ? items : items.filter((item) => item.category === filter);

  const selectedItem = items.find((item) => item.id === selectedId);
  const selectedIndex = filteredItems.findIndex((item) => item.id === selectedId);

  const handlePrevious = () => {
    if (selectedIndex > 0) setSelectedId(filteredItems[selectedIndex - 1].id);
  };

  const handleNext = () => {
    if (selectedIndex < filteredItems.length - 1) setSelectedId(filteredItems[selectedIndex + 1].id);
  };

  // Navegação por teclado no lightbox
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedId(null);
  };

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setSelectedId(null);
            }}
            className="px-4 py-2 rounded text-xs tracking-widest uppercase transition-all duration-300 capitalize"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: filter === cat ? "oklch(0.09 0.025 265)" : accentColor,
              background: filter === cat ? accentColor : "transparent",
              border: `1px solid ${filter === cat ? accentColor : accentBorder}`,
              boxShadow: filter === cat ? accentGlow : "none",
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div
          className="py-20 text-center opacity-30"
          style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.875rem" }}
        >
          Nenhuma foto ainda. Em breve.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                aspectRatio: "1",
                border: `1px solid ${accentBorder}`,
                background: "oklch(0.11 0.02 265 / 0.5)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, oklch(0 0 0 / 0.8) 100%)",
                }}
              >
                <h3
                  className="text-sm font-bold mb-1"
                  style={{ fontFamily: "'Syne', sans-serif", color: accentColor }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs opacity-70 capitalize"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "oklch(0 0 0 / 0.85)" }}
          onClick={() => setSelectedId(null)}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="relative max-w-4xl w-full rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              border: `2px solid ${accentColor}`,
              boxShadow: accentGlow,
            }}
          >
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded transition-all duration-200 hover:scale-110"
              style={{ background: "oklch(0 0 0 / 0.6)", color: accentColor }}
            >
              <X size={24} />
            </button>

            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full h-auto"
            />

            <div className="p-6" style={{ background: "oklch(0.09 0.025 265)" }}>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: accentColor }}
              >
                {selectedItem.title}
              </h2>
              <p
                className="text-xs mb-4 opacity-60 capitalize"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {selectedItem.category}
              </p>
              {selectedItem.description && (
                <p
                  className="text-sm leading-relaxed opacity-70"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {selectedItem.description}
                </p>
              )}

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={handlePrevious}
                  disabled={selectedIndex === 0}
                  className="px-4 py-2 rounded text-xs tracking-widest uppercase transition-all duration-300 disabled:opacity-30"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: accentColor,
                    background: accentBg,
                    border: `1px solid ${accentBorder}`,
                  }}
                >
                  ← Anterior
                </button>
                <span
                  className="text-xs opacity-60"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {selectedIndex + 1} de {filteredItems.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={selectedIndex === filteredItems.length - 1}
                  className="px-4 py-2 rounded text-xs tracking-widest uppercase transition-all duration-300 disabled:opacity-30"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: accentColor,
                    background: accentBg,
                    border: `1px solid ${accentBorder}`,
                  }}
                >
                  Próxima →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
