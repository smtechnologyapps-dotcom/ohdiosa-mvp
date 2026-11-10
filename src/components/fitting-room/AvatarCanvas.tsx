"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  FittingItem,
  GarmentCategory,
  BodySilhouette,
  SILHOUETTE_PROFILES,
} from "@/lib/fittingRoomData";
import {
  Sparkles,
  Rotate3d,
  Ruler,
  Camera,
  Layers,
  Sparkle,
  Sliders,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface AvatarCanvasProps {
  selectedItems: { [key in GarmentCategory]?: FittingItem | null };
  silhouette: BodySilhouette;
  height: number;
  size: string;
  customFaceUrl: string | null;
  onOpenScanner: () => void;
  onRemoveItem?: (category: GarmentCategory) => void;
  onSelectItemCategory?: (category: GarmentCategory) => void;
}

export function AvatarCanvas({
  selectedItems,
  silhouette,
  height,
  size,
  customFaceUrl,
  onOpenScanner,
  onRemoveItem,
  onSelectItemCategory,
}: AvatarCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cameraMode, setCameraMode] = useState<"full" | "waist" | "closeup">("full");
  const [isTurntableActive, setIsTurntableActive] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // 3D Motion Coordinates with Springs for realistic fluid physical feel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 120, mass: 0.6 };
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const bgTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), springConfig);
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 80]), springConfig);
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, 80]), springConfig);

  // Turntable automatic gentle breathing & swaying loop
  useEffect(() => {
    if (!isTurntableActive || isHovered) return;
    let t = 0;
    const interval = setInterval(() => {
      t += 0.035;
      mouseX.set(Math.sin(t) * 0.35);
      mouseY.set(Math.cos(t * 0.7) * 0.12);
    }, 16);
    return () => clearInterval(interval);
  }, [isTurntableActive, isHovered, mouseX, mouseY]);

  // Handle interactive 3D pointer movement
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (!isTurntableActive) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  // --- MODELO FIJA CONSISTENTE ---
  // Una única modelo editorial icónica de OHDIOSA. El vestuario y los accesorios cambian sobre ella.
  const activeGarment = selectedItems.garment;

  // Obtenemos las proporciones físicas según la silueta seleccionada
  const silhouetteData = SILHOUETTE_PROFILES[silhouette] || SILHOUETTE_PROFILES.hourglass;
  const heightRatio = Math.max(0.92, Math.min(1.08, height / 170));

  // Matriz de deformación sutil de proporciones corporales
  const bodyMorphStyle = {
    transform: `scale(${silhouetteData.proportions.hipScale * 0.98}, ${heightRatio})`,
    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  // Camera zoom offsets based on active view mode
  const cameraTransforms = {
    full: { scale: 1.05, y: "0%" },
    waist: { scale: 1.45, y: "-12%" },
    closeup: { scale: 1.95, y: "-26%" },
  };

  // Imagen base fija de la modelo de pasarela para el vestido de gala
  // Para garantizar un mismo avatar uniforme, usamos la silueta de alta costura de la modelo de pasarela fija
  const baseModelSrc = activeGarment?.garmentOverlaySrc || "/images/evening.jpg";

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full min-h-[560px] lg:min-h-[720px] rounded-3xl overflow-hidden bg-canvas border border-whisper shadow-2xl flex items-center justify-center select-none perspective-[1400px] cursor-grab active:cursor-grabbing"
      style={{ perspective: 1400 }}
    >
      {/* 1. RUNWAY BACKGROUND DEPTH LAYER */}
      <motion.div
        style={{ x: bgTranslateX }}
        className="absolute inset-0 bg-radial-vignette pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-[#121215] to-[#050507]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90%] h-[60%] rounded-full bg-gold/15 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </motion.div>

      {/* 2. DYNAMIC SPECULAR LIGHTING SPOTLIGHT */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-60 transition-opacity"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(circle 380px at ${x}% ${y}%, rgba(254, 240, 138, 0.45), rgba(212, 175, 55, 0.15), transparent 70%)`
          ),
        }}
      />

      {/* 3. 3D ROTATABLE RUNWAY MODEL CONTAINER */}
      <motion.div
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center z-10"
      >
        {/* Breathing & Swaying Animation */}
        <motion.div
          animate={{
            scale: [1, 1.012, 1],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Active Model Photograph with Camera Smooth Zoom & Body Morphing */}
          <AnimatePresence mode="wait">
            <motion.div
              key={baseModelSrc + cameraMode + silhouette}
              initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
              animate={{
                opacity: 1,
                scale: cameraTransforms[cameraMode].scale,
                y: cameraTransforms[cameraMode].y,
                filter: "blur(0px)",
              }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={bodyMorphStyle}
              className="relative w-[92%] h-[92%] max-w-[540px] rounded-2xl overflow-hidden shadow-2xl border border-whisper/40"
            >
              <Image
                src={baseModelSrc}
                alt={activeGarment?.name || "Modelo OHDIOSA"}
                fill
                priority
                className="object-cover object-top transition-transform duration-700 select-none"
              />

              {/* Rostro Personalizado del Cliente (Si fue subido) */}
              {customFaceUrl && (
                <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-20 h-24 rounded-full overflow-hidden border border-gold/70 shadow-lg pointer-events-none z-15 backdrop-blur-[0.5px]">
                  <Image
                    src={customFaceUrl}
                    alt="Rostro Personalizado"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              )}

              {/* Shadow vignette around edges for editorial depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-transparent to-black/30 pointer-events-none" />

              {/* Floor contact shadow */}
              <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-canvas via-canvas/60 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Golden Particle Sparkles */}
          <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -70, -140],
                  opacity: [0, 0.8, 0],
                  scale: [0.6, 1.4, 0.4],
                }}
                transition={{
                  duration: 3 + i * 0.8,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${25 + i * 11}%`,
                  bottom: `${15 + (i % 3) * 20}%`,
                }}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-amber-200 to-gold blur-[1px] shadow-sm shadow-gold"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 4. TOP HUD BAR: Real-time Camera & Calibration Trigger */}
      <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-between pointer-events-none">
        {/* Left Badge: Active Silhouette & Scanner Trigger */}
        <button
          onClick={onOpenScanner}
          className="flex items-center gap-2 bg-canvas/85 hover:bg-canvas border border-whisper hover:border-gold/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono text-gold shadow-lg pointer-events-auto transition-all cursor-pointer group"
          title="Abrir Escáner de Silueta y Medidas"
        >
          <Ruler size={13} className="text-gold group-hover:rotate-12 transition-transform" />
          <span className="font-serif tracking-wider uppercase">
            {silhouetteData.name} • {height}cm ({size})
          </span>
          <span className="text-[10px] bg-gold/15 px-1.5 py-0.2 rounded text-gold font-sans font-semibold">
            Calibrar
          </span>
        </button>

        {/* Right HUD: Camera Mode Buttons */}
        <div className="flex items-center gap-1 bg-surface/90 backdrop-blur-md p-1 rounded-xl border border-whisper shadow-lg pointer-events-auto">
          <button
            onClick={() => setCameraMode("full")}
            title="Cámara Cuerpo Entero"
            className={`px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
              cameraMode === "full"
                ? "bg-gold text-canvas font-semibold shadow-sm"
                : "text-steel hover:text-foreground"
            }`}
          >
            Cuerpo
          </button>
          <button
            onClick={() => setCameraMode("waist")}
            title="Cámara Enfoque Medio (Cintura & Bolso)"
            className={`px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
              cameraMode === "waist"
                ? "bg-gold text-canvas font-semibold shadow-sm"
                : "text-steel hover:text-foreground"
            }`}
          >
            Silueta
          </button>
          <button
            onClick={() => setCameraMode("closeup")}
            title="Primer Plano (Escote & Joyas)"
            className={`px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
              cameraMode === "closeup"
                ? "bg-gold text-canvas font-semibold shadow-sm"
                : "text-steel hover:text-foreground"
            }`}
          >
            Joyería
          </button>
        </div>
      </div>

      {/* 5. FLOATING ACCESSORY & DETAIL CALLOUT */}
      <div className="absolute top-16 right-4 z-30 hidden sm:flex flex-col gap-2 pointer-events-auto">
        {selectedItems.jewelry && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 bg-surface/90 hover:bg-surface border border-whisper hover:border-gold/50 backdrop-blur-md p-2 rounded-xl text-xs shadow-xl max-w-[210px] transition-all group"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gold/30">
              <Image
                src="/images/product_accessories.jpg"
                alt="Detalle de Joyas"
                fill
                className="object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] text-gold uppercase font-mono tracking-wider">Joya Activa</div>
              <div className="text-foreground font-serif truncate">{selectedItems.jewelry.name}</div>
              <div className="text-[11px] text-steel font-mono">${selectedItems.jewelry.price}</div>
            </div>
          </motion.div>
        )}

        {selectedItems.bag && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 bg-surface/90 hover:bg-surface border border-whisper hover:border-gold/50 backdrop-blur-md p-2 rounded-xl text-xs shadow-xl max-w-[210px] transition-all group"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gold/30">
              <Image
                src="/images/product_bags.jpg"
                alt="Detalle Bolso"
                fill
                className="object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] text-gold uppercase font-mono tracking-wider">Bolso de Mano</div>
              <div className="text-foreground font-serif truncate">{selectedItems.bag.name}</div>
              <div className="text-[11px] text-steel font-mono">${selectedItems.bag.price}</div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 6. BOTTOM HUD: Active Outfit Bar & 3D Interactive Controls */}
      <div className="absolute bottom-4 inset-x-4 z-30 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        {/* Current Active Look Tags */}
        <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pointer-events-auto">
          {(["garment", "jewelry", "bag", "shoes"] as GarmentCategory[]).map((cat) => {
            const item = selectedItems[cat];
            if (!item) return null;
            return (
              <div
                key={cat}
                className="flex items-center gap-2 bg-canvas/90 border border-whisper hover:border-gold/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-foreground shadow-lg transition-all"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.accentHex || item.colorHex }}
                />
                <button
                  onClick={() => onSelectItemCategory?.(cat)}
                  className="font-medium hover:text-gold transition-colors truncate max-w-[130px] cursor-pointer"
                >
                  {item.name}
                </button>
                <span className="text-[10px] text-steel font-mono">${item.price}</span>
                {onRemoveItem && (
                  <button
                    onClick={() => onRemoveItem(cat)}
                    className="text-steel hover:text-red-400 text-xs ml-0.5 transition-colors cursor-pointer"
                    title={`Quitar ${item.name}`}
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* 3D Turntable Toggle Pill */}
        <div className="flex items-center gap-2 bg-surface/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-whisper shadow-lg pointer-events-auto">
          <Rotate3d size={14} className={isTurntableActive ? "text-gold animate-spin" : "text-steel"} style={{ animationDuration: "6s" }} />
          <button
            onClick={() => setIsTurntableActive(!isTurntableActive)}
            className="text-xs text-foreground hover:text-gold font-medium transition-colors cursor-pointer"
          >
            {isTurntableActive ? "Rotación 3D Activa" : "Rotación Pausada"}
          </button>
          <span className="text-whisper">•</span>
          <span className="text-[10px] text-steel hidden md:inline">Arrastra para girar</span>
        </div>
      </div>
    </div>
  );
}
