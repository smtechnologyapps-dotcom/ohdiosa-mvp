"use client";

import React, { useState } from "react";
import {
  FITTING_ITEMS,
  CURATED_LOOKS,
  FittingItem,
  CuratedLook,
  GarmentCategory,
  BodySilhouette,
  SILHOUETTE_PROFILES,
} from "@/lib/fittingRoomData";
import { Check, Sparkles, Shuffle, Info, ChevronRight, Sliders, Ruler, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LookCarouselProps {
  selectedItems: { [key in GarmentCategory]?: FittingItem | null };
  activeSilhouette: BodySilhouette;
  onSelectItem: (item: FittingItem) => void;
  onSelectCuratedLook: (look: CuratedLook) => void;
  onRandomizeLook: () => void;
  onOpenScanner: () => void;
  activeCategory: GarmentCategory | "curated";
  setActiveCategory: (cat: GarmentCategory | "curated") => void;
}

export function LookCarousel({
  selectedItems,
  activeSilhouette,
  onSelectItem,
  onSelectCuratedLook,
  onRandomizeLook,
  onOpenScanner,
  activeCategory,
  setActiveCategory,
}: LookCarouselProps) {
  const [inspectingItem, setInspectingItem] = useState<FittingItem | null>(null);
  const [filterOnlyRecommended, setFilterOnlyRecommended] = useState<boolean>(false);

  const silhouetteProfile = SILHOUETTE_PROFILES[activeSilhouette];

  const categories = [
    { key: "garment" as const, label: "Alta Costura", icon: "👗", count: 4 },
    { key: "jewelry" as const, label: "Joyería", icon: "✨", count: 3 },
    { key: "bag" as const, label: "Bolsos", icon: "👜", count: 2 },
    { key: "shoes" as const, label: "Calzado", icon: "👠", count: 3 },
    { key: "curated" as const, label: "Looks de Pasarela", icon: "👑", count: 4 },
  ];

  let currentCategoryItems =
    activeCategory === "curated"
      ? []
      : FITTING_ITEMS.filter((item) => item.category === activeCategory);

  if (filterOnlyRecommended && activeCategory !== "curated") {
    currentCategoryItems = currentCategoryItems.filter((item) =>
      item.favoredSilhouettes.includes(activeSilhouette)
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface/50 rounded-2xl border border-whisper p-4 md:p-6 backdrop-blur-xl">
      {/* Top Bar: Silhouette Feedback Banner */}
      <div className="flex items-center justify-between bg-canvas/60 border border-whisper/80 rounded-xl px-3.5 py-2 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-steel font-mono">Silueta Activa:</span>
          <span className="font-serif text-foreground font-semibold">
            {silhouetteProfile.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterOnlyRecommended(!filterOnlyRecommended)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
              filterOnlyRecommended
                ? "bg-gold text-canvas font-bold shadow-sm"
                : "text-steel hover:text-foreground bg-surface border border-whisper"
            }`}
            title="Filtrar prendas recomendadas para tu silueta"
          >
            <Filter size={12} />
            <span>{filterOnlyRecommended ? "Solo Recomendadas" : "Todas"}</span>
          </button>

          <button
            onClick={onOpenScanner}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono text-gold hover:bg-gold/10 transition-colors cursor-pointer"
          >
            <Ruler size={12} />
            <span>Cambiar Medidas</span>
          </button>
        </div>
      </div>

      {/* Category Tabs & Quick Action */}
      <div className="flex items-center justify-between gap-2 border-b border-whisper/80 pb-3 mb-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-gold text-canvas font-semibold shadow-md"
                    : "text-steel hover:text-foreground hover:bg-surface"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-gold rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Randomizer Button */}
        <button
          onClick={onRandomizeLook}
          title="Generar combinación al azar del estilista"
          className="flex items-center gap-1.5 px-3 py-2 bg-whisper/20 hover:bg-gold/20 text-gold border border-gold/40 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer"
        >
          <Shuffle size={14} />
          <span className="hidden sm:inline">Inspiración</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pr-1">
        {activeCategory === "curated" ? (
          /* CURATED LOOKS VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {CURATED_LOOKS.map((look) => {
              const isLookActive =
                selectedItems.garment?.id === look.itemIds.garment &&
                selectedItems.jewelry?.id === look.itemIds.jewelry &&
                selectedItems.bag?.id === look.itemIds.bag &&
                selectedItems.shoes?.id === look.itemIds.shoes;

              const isBestForSilhouette = look.bestSilhouette === activeSilhouette;

              return (
                <div
                  key={look.id}
                  onClick={() => onSelectCuratedLook(look)}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                    isLookActive
                      ? "bg-gold/10 border-gold shadow-lg shadow-gold/5"
                      : "bg-surface/80 border-whisper hover:border-gold/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                          {look.occasion}
                        </span>
                        {isBestForSilhouette && (
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            ★ Ideal Silueta
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-base text-foreground mt-1.5 group-hover:text-gold transition-colors">
                        {look.title}
                      </h4>
                    </div>
                    {isLookActive && (
                      <span className="p-1 rounded-full bg-gold text-canvas">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-steel line-clamp-2 mb-4 leading-relaxed">
                    {look.subtitle}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-whisper/40 text-xs">
                    <span className="text-gold font-mono font-medium flex items-center gap-1">
                      <Sparkles size={12} />
                      {look.discountPercentage}% OFF Atelier
                    </span>
                    <span className="text-foreground font-medium group-hover:text-gold flex items-center gap-1">
                      {isLookActive ? "En Silueta" : "Probar Todo"}
                      <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ITEMS RACK VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentCategoryItems.map((item) => {
              const isSelected = selectedItems[item.category]?.id === item.id;
              const isFavored = item.favoredSilhouettes.includes(activeSilhouette);

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                    isSelected
                      ? "bg-gold/10 border-gold shadow-lg shadow-gold/5 ring-1 ring-gold"
                      : "bg-surface/80 border-whisper hover:border-gold/50 hover:bg-surface"
                  }`}
                >
                  <div>
                    {/* Header: Tag, Silhouette Match & Color swatch */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-steel bg-canvas/60 px-2 py-0.5 rounded-full border border-whisper">
                          {item.tag}
                        </span>
                        {isFavored && (
                          <span
                            className="text-[10px] font-mono text-gold bg-gold/15 border border-gold/30 px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
                            title={item.silhouetteAdvice}
                          >
                            <Sparkles size={10} />
                            <span>Para tu silueta</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-whisper shadow-sm"
                          style={{ backgroundColor: item.colorHex }}
                          title={item.colorName}
                        />
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-gold text-canvas flex items-center justify-center">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h4 className="font-serif text-sm md:text-base text-foreground group-hover:text-gold transition-colors mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-steel leading-relaxed line-clamp-2 mb-2">
                      {item.description}
                    </p>

                    {/* Styling Advice for Active Silhouette */}
                    {isFavored && (
                      <div className="text-[11px] text-amber-200/80 bg-amber-950/20 border border-amber-500/20 p-1.5 rounded-lg mb-2 leading-tight flex items-start gap-1">
                        <span className="text-gold shrink-0">✨</span>
                        <span>{item.silhouetteAdvice}</span>
                      </div>
                    )}

                    {/* Fabric note */}
                    <div className="text-[11px] text-steel/80 mb-3 flex items-center gap-1 font-mono">
                      <span>🧵</span>
                      <span className="truncate">{item.fabric}</span>
                    </div>
                  </div>

                  {/* Footer: Price & Details button */}
                  <div className="flex items-center justify-between pt-3 border-t border-whisper/40 text-xs mt-auto">
                    <div>
                      <span className="font-mono text-base font-bold text-foreground">
                        ${item.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectingItem(inspectingItem?.id === item.id ? null : item);
                        }}
                        className="p-1.5 text-steel hover:text-gold hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        title="Ver especificaciones de taller"
                      >
                        <Info size={14} />
                      </button>

                      <span
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                          isSelected
                            ? "bg-gold text-canvas font-semibold"
                            : "bg-surface border border-whisper group-hover:border-gold/40 text-foreground"
                        }`}
                      >
                        {isSelected ? "Activa" : "Probar"}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Item Specs Drawer */}
                  <AnimatePresence>
                    {inspectingItem?.id === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-whisper/60 text-xs text-steel space-y-1 overflow-hidden"
                      >
                        <p className="font-semibold text-foreground">Ficha de Taller:</p>
                        {item.specs.map((spec, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px]">
                            <span className="w-1 h-1 rounded-full bg-gold" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
