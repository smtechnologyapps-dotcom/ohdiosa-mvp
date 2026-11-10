"use client";

import React, { useRef, useEffect, useState } from "react";
import { FittingItem, GarmentCategory } from "@/lib/fittingRoomData";
import { Sparkles, Eye, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface AvatarCanvasProps {
  selectedItems: { [key in GarmentCategory]?: FittingItem | null };
  onRemoveItem?: (category: GarmentCategory) => void;
  onSelectItemCategory?: (category: GarmentCategory) => void;
}

export function AvatarCanvas({ selectedItems, onRemoveItem, onSelectItemCategory }: AvatarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [lightingMode, setLightingMode] = useState<"runway" | "studio" | "golden">("runway");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [transitionProgress, setTransitionProgress] = useState<number>(1);
  const animFrameRef = useRef<number | null>(null);

  // Trigger flash effect on item change
  useEffect(() => {
    setTransitionProgress(0);
    const start = performance.now();
    const duration = 450; // ms

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(1, elapsed / duration);
      setTransitionProgress(progress);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [
    selectedItems.garment?.id,
    selectedItems.jewelry?.id,
    selectedItems.bag?.id,
    selectedItems.shoes?.id,
  ]);

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let particleTime = 0;

    const render = () => {
      particleTime += 0.02;

      // Handle High-DPI screens
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // --- 1. FONDO DE ESTUDIO / PASARELA DE LUJO ---
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (lightingMode === "runway") {
        bgGrad.addColorStop(0, "#08080A");
        bgGrad.addColorStop(0.5, "#121215");
        bgGrad.addColorStop(1, "#09090B");
      } else if (lightingMode === "golden") {
        bgGrad.addColorStop(0, "#0F0D08");
        bgGrad.addColorStop(0.6, "#1A160F");
        bgGrad.addColorStop(1, "#0A0906");
      } else {
        bgGrad.addColorStop(0, "#141416");
        bgGrad.addColorStop(1, "#0C0C0E");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Halo de luz cenital / Backlight
      const centerX = width / 2;
      const avatarCenterY = height * 0.48;
      const radialHalo = ctx.createRadialGradient(
        centerX,
        avatarCenterY - 40,
        20,
        centerX,
        avatarCenterY,
        Math.min(width, height) * 0.55
      );
      if (lightingMode === "golden") {
        radialHalo.addColorStop(0, "rgba(212, 175, 55, 0.22)");
        radialHalo.addColorStop(0.5, "rgba(212, 175, 55, 0.06)");
        radialHalo.addColorStop(1, "rgba(212, 175, 55, 0)");
      } else {
        radialHalo.addColorStop(0, "rgba(240, 220, 160, 0.16)");
        radialHalo.addColorStop(0.5, "rgba(212, 175, 55, 0.04)");
        radialHalo.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = radialHalo;
      ctx.fillRect(0, 0, width, height);

      // Líneas de pasarela / Escenario arquitectónico
      ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - width * 0.4, height * 0.92);
      ctx.lineTo(centerX + width * 0.4, height * 0.92);
      ctx.stroke();

      // Sombra de contacto en el piso
      ctx.save();
      const shadowGrad = ctx.createRadialGradient(
        centerX,
        height * 0.88,
        5,
        centerX,
        height * 0.88,
        width * 0.3
      );
      shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.7)");
      shadowGrad.addColorStop(0.6, "rgba(0, 0, 0, 0.25)");
      shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = shadowGrad;
      ctx.scale(1, 0.25);
      ctx.beginPath();
      ctx.arc(centerX, (height * 0.88) / 0.25, width * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- 2. DIBUJO DEL AVATAR / SILUETA DE ALTA COSTURA ---
      ctx.save();
      // Aplicar zoom centrado si está activo
      if (zoomLevel !== 1) {
        ctx.translate(centerX, avatarCenterY);
        ctx.scale(zoomLevel, zoomLevel);
        ctx.translate(-centerX, -avatarCenterY);
      }

      // Proporciones del maniquí editorial (Head -> Torso -> Hips -> Legs)
      const scaleFactor = Math.min(width / 360, height / 640);
      const headY = height * 0.14;
      const headRadius = 22 * scaleFactor;
      const neckY = headY + headRadius * 1.5;
      const shoulderY = neckY + 16 * scaleFactor;
      const bustY = shoulderY + 36 * scaleFactor;
      const waistY = bustY + 44 * scaleFactor;
      const hipY = waistY + 48 * scaleFactor;
      const kneeY = hipY + 105 * scaleFactor;
      const ankleY = kneeY + 115 * scaleFactor;

      // Color base del maniquí (bronce editorial pulido)
      const skinBase = "#DDBA98";
      const skinShade = "#BA9672";
      const skinHighlight = "#F5DCC4";

      // Cabeza & Peinado Editorial
      // Pelo Chignon Alto Noir
      ctx.fillStyle = "#141416";
      ctx.beginPath();
      ctx.arc(centerX, headY - 14 * scaleFactor, 18 * scaleFactor, 0, Math.PI * 2);
      ctx.fill();

      // Rostro
      const faceGrad = ctx.createLinearGradient(
        centerX - headRadius,
        headY,
        centerX + headRadius,
        headY
      );
      faceGrad.addColorStop(0, skinShade);
      faceGrad.addColorStop(0.45, skinBase);
      faceGrad.addColorStop(1, skinHighlight);

      ctx.fillStyle = faceGrad;
      ctx.beginPath();
      ctx.ellipse(centerX, headY, headRadius * 0.72, headRadius * 1.1, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cuello estilizado
      ctx.fillStyle = faceGrad;
      ctx.beginPath();
      ctx.moveTo(centerX - 8 * scaleFactor, headY + headRadius * 0.8);
      ctx.lineTo(centerX + 8 * scaleFactor, headY + headRadius * 0.8);
      ctx.lineTo(centerX + 12 * scaleFactor, shoulderY);
      ctx.lineTo(centerX - 12 * scaleFactor, shoulderY);
      ctx.closePath();
      ctx.fill();

      // Brazos y silueta base anatómica
      // Brazo Izquierdo (hacia abajo, relajado)
      ctx.strokeStyle = skinBase;
      ctx.lineWidth = 11 * scaleFactor;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(centerX - 42 * scaleFactor, shoulderY + 4 * scaleFactor);
      ctx.lineTo(centerX - 52 * scaleFactor, waistY + 10 * scaleFactor);
      ctx.lineTo(centerX - 56 * scaleFactor, hipY + 45 * scaleFactor);
      ctx.stroke();

      // Brazo Derecho (apoyado sutilmente en cadera / portando bolso)
      ctx.beginPath();
      ctx.moveTo(centerX + 42 * scaleFactor, shoulderY + 4 * scaleFactor);
      ctx.lineTo(centerX + 54 * scaleFactor, waistY + 12 * scaleFactor);
      ctx.lineTo(centerX + 48 * scaleFactor, hipY + 36 * scaleFactor);
      ctx.stroke();

      // Piernas (postura de pasarela esbelta)
      ctx.lineWidth = 14 * scaleFactor;
      // Pierna Izquierda
      ctx.beginPath();
      ctx.moveTo(centerX - 16 * scaleFactor, hipY);
      ctx.lineTo(centerX - 18 * scaleFactor, kneeY);
      ctx.lineTo(centerX - 20 * scaleFactor, ankleY);
      ctx.stroke();

      // Pierna Derecha
      ctx.beginPath();
      ctx.moveTo(centerX + 16 * scaleFactor, hipY);
      ctx.lineTo(centerX + 15 * scaleFactor, kneeY);
      ctx.lineTo(centerX + 14 * scaleFactor, ankleY);
      ctx.stroke();

      // --- 3. DIBUJO DE PRENDAS DINÁMICAS (PAINTER'S ORDER) ---

      // A. CALZADO (SHOES)
      const activeShoe = selectedItems.shoes;
      if (activeShoe) {
        if (activeShoe.renderKey === "boots_overknee_noir") {
          // Botas altas de cuero sobre la rodilla
          ctx.fillStyle = "#161618";
          ctx.beginPath();
          // Bota izquierda
          ctx.rect(centerX - 27 * scaleFactor, kneeY - 20 * scaleFactor, 18 * scaleFactor, 138 * scaleFactor);
          // Bota derecha
          ctx.rect(centerX + 5 * scaleFactor, kneeY - 20 * scaleFactor, 18 * scaleFactor, 138 * scaleFactor);
          ctx.fill();

          // Tacón escultórico
          ctx.fillStyle = "#D4AF37";
          ctx.fillRect(centerX - 28 * scaleFactor, ankleY + 2 * scaleFactor, 6 * scaleFactor, 16 * scaleFactor);
          ctx.fillRect(centerX + 4 * scaleFactor, ankleY + 2 * scaleFactor, 6 * scaleFactor, 16 * scaleFactor);
        } else if (activeShoe.renderKey === "sandals_minimal_gold") {
          // Sandalias minimalistas champagne con tiras doradas
          ctx.strokeStyle = "#E5C158";
          ctx.lineWidth = 2.5 * scaleFactor;
          // Tiras tobillo izq
          ctx.beginPath();
          ctx.arc(centerX - 20 * scaleFactor, ankleY - 2 * scaleFactor, 7 * scaleFactor, 0, Math.PI);
          ctx.stroke();
          // Tiras tobillo der
          ctx.beginPath();
          ctx.arc(centerX + 14 * scaleFactor, ankleY - 2 * scaleFactor, 7 * scaleFactor, 0, Math.PI);
          ctx.stroke();
          // Tacón fino oro
          ctx.fillStyle = "#D4AF37";
          ctx.fillRect(centerX - 22 * scaleFactor, ankleY, 2.5 * scaleFactor, 18 * scaleFactor);
          ctx.fillRect(centerX + 12 * scaleFactor, ankleY, 2.5 * scaleFactor, 18 * scaleFactor);
        } else {
          // Stilettos Asimétricos Noir (s1 default)
          ctx.fillStyle = "#0A0A0C";
          // Zapato izq
          ctx.beginPath();
          ctx.ellipse(centerX - 20 * scaleFactor, ankleY + 8 * scaleFactor, 10 * scaleFactor, 6 * scaleFactor, -0.2, 0, Math.PI * 2);
          ctx.fill();
          // Zapato der
          ctx.beginPath();
          ctx.ellipse(centerX + 15 * scaleFactor, ankleY + 8 * scaleFactor, 10 * scaleFactor, 6 * scaleFactor, 0.2, 0, Math.PI * 2);
          ctx.fill();
          // Tacón de aguja dorado
          ctx.fillStyle = "#D4AF37";
          ctx.fillRect(centerX - 24 * scaleFactor, ankleY + 6 * scaleFactor, 2.5 * scaleFactor, 15 * scaleFactor);
          ctx.fillRect(centerX + 11 * scaleFactor, ankleY + 6 * scaleFactor, 2.5 * scaleFactor, 15 * scaleFactor);
        }
      }

      // B. PRENDA PRINCIPAL / ALTA COSTURA (GARMENTS)
      const activeGarment = selectedItems.garment;
      if (activeGarment) {
        if (activeGarment.renderKey === "dress_asymmetric_noir") {
          // Vestido Asimétrico Noir: hombro caído, abertura escultural
          const dressGrad = ctx.createLinearGradient(
            centerX - 50 * scaleFactor,
            shoulderY,
            centerX + 50 * scaleFactor,
            kneeY + 80 * scaleFactor
          );
          dressGrad.addColorStop(0, "#19191D");
          dressGrad.addColorStop(0.5, "#0F0F12");
          dressGrad.addColorStop(1, "#08080A");

          ctx.fillStyle = dressGrad;
          ctx.beginPath();
          // Hombro izquierdo cubierto
          ctx.moveTo(centerX - 42 * scaleFactor, shoulderY + 4 * scaleFactor);
          // Escote asimétrico pasando bajo el hombro derecho
          ctx.quadraticCurveTo(centerX, bustY - 6 * scaleFactor, centerX + 34 * scaleFactor, bustY + 8 * scaleFactor);
          // Cintura entallada
          ctx.lineTo(centerX + 26 * scaleFactor, waistY);
          ctx.lineTo(centerX + 32 * scaleFactor, hipY);
          // Caída larga con abertura de pierna izquierda
          ctx.lineTo(centerX + 40 * scaleFactor, kneeY + 90 * scaleFactor);
          ctx.lineTo(centerX - 4 * scaleFactor, kneeY + 92 * scaleFactor);
          // Abertura de alta costura descubriendo pierna izq
          ctx.lineTo(centerX - 8 * scaleFactor, hipY + 20 * scaleFactor);
          ctx.lineTo(centerX - 30 * scaleFactor, waistY);
          ctx.closePath();
          ctx.fill();

          // Ribete sutil dorado en el escote asimétrico
          ctx.strokeStyle = "rgba(212, 175, 55, 0.85)";
          ctx.lineWidth = 2 * scaleFactor;
          ctx.beginPath();
          ctx.moveTo(centerX - 42 * scaleFactor, shoulderY + 4 * scaleFactor);
          ctx.quadraticCurveTo(centerX, bustY - 6 * scaleFactor, centerX + 34 * scaleFactor, bustY + 8 * scaleFactor);
          ctx.stroke();

        } else if (activeGarment.renderKey === "blazer_structured_gold") {
          // Blazer Estructurado Oro con pantalones rectos
          // Pantalón sastre negro
          ctx.fillStyle = "#121214";
          ctx.beginPath();
          ctx.moveTo(centerX - 28 * scaleFactor, waistY + 15 * scaleFactor);
          ctx.lineTo(centerX + 28 * scaleFactor, waistY + 15 * scaleFactor);
          ctx.lineTo(centerX + 26 * scaleFactor, ankleY - 4 * scaleFactor);
          ctx.lineTo(centerX + 3 * scaleFactor, ankleY - 4 * scaleFactor);
          ctx.lineTo(centerX, hipY + 15 * scaleFactor);
          ctx.lineTo(centerX - 3 * scaleFactor, ankleY - 4 * scaleFactor);
          ctx.lineTo(centerX - 26 * scaleFactor, ankleY - 4 * scaleFactor);
          ctx.closePath();
          ctx.fill();

          // Blazer estructurado con solapa champagne
          ctx.fillStyle = "#1E1E22";
          ctx.beginPath();
          // Hombros pagoda imponentes
          ctx.moveTo(centerX - 48 * scaleFactor, shoulderY - 3 * scaleFactor);
          ctx.lineTo(centerX - 12 * scaleFactor, neckY + 4 * scaleFactor);
          ctx.lineTo(centerX + 12 * scaleFactor, neckY + 4 * scaleFactor);
          ctx.lineTo(centerX + 48 * scaleFactor, shoulderY - 3 * scaleFactor);
          ctx.lineTo(centerX + 38 * scaleFactor, waistY + 28 * scaleFactor);
          ctx.lineTo(centerX - 38 * scaleFactor, waistY + 28 * scaleFactor);
          ctx.closePath();
          ctx.fill();

          // Solapa de satén dorado en 'V'
          ctx.fillStyle = "#D4AF37";
          ctx.beginPath();
          ctx.moveTo(centerX - 12 * scaleFactor, neckY + 4 * scaleFactor);
          ctx.lineTo(centerX, waistY + 10 * scaleFactor);
          ctx.lineTo(centerX + 12 * scaleFactor, neckY + 4 * scaleFactor);
          ctx.lineTo(centerX + 24 * scaleFactor, bustY);
          ctx.lineTo(centerX, waistY + 12 * scaleFactor);
          ctx.lineTo(centerX - 24 * scaleFactor, bustY);
          ctx.closePath();
          ctx.fill();

          // Botones de latón dorado
          ctx.fillStyle = "#FEF08A";
          ctx.beginPath();
          ctx.arc(centerX + 5 * scaleFactor, waistY + 16 * scaleFactor, 3 * scaleFactor, 0, Math.PI * 2);
          ctx.arc(centerX + 5 * scaleFactor, waistY + 24 * scaleFactor, 3 * scaleFactor, 0, Math.PI * 2);
          ctx.fill();

        } else if (activeGarment.renderKey === "dress_gala_champagne") {
          // Vestido Gala Seda Champagne con brillo fluido
          const champGrad = ctx.createLinearGradient(
            centerX - 40 * scaleFactor,
            shoulderY,
            centerX + 40 * scaleFactor,
            ankleY
          );
          champGrad.addColorStop(0, "#E6C87C");
          champGrad.addColorStop(0.3, "#FFF5D6");
          champGrad.addColorStop(0.7, "#C59B3F");
          champGrad.addColorStop(1, "#997322");

          ctx.fillStyle = champGrad;
          ctx.beginPath();
          ctx.moveTo(centerX - 36 * scaleFactor, shoulderY + 8 * scaleFactor);
          ctx.lineTo(centerX + 36 * scaleFactor, shoulderY + 8 * scaleFactor);
          ctx.lineTo(centerX + 26 * scaleFactor, waistY);
          ctx.lineTo(centerX + 34 * scaleFactor, hipY);
          ctx.lineTo(centerX + 24 * scaleFactor, kneeY);
          // Sirena con cola amplia
          ctx.lineTo(centerX + 55 * scaleFactor, ankleY + 12 * scaleFactor);
          ctx.lineTo(centerX - 55 * scaleFactor, ankleY + 12 * scaleFactor);
          ctx.lineTo(centerX - 24 * scaleFactor, kneeY);
          ctx.lineTo(centerX - 34 * scaleFactor, hipY);
          ctx.lineTo(centerX - 26 * scaleFactor, waistY);
          ctx.closePath();
          ctx.fill();

          // Pliegues y reflejos de luz
          ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
          ctx.lineWidth = 1.5 * scaleFactor;
          ctx.beginPath();
          ctx.moveTo(centerX - 10 * scaleFactor, waistY);
          ctx.quadraticCurveTo(centerX + 5 * scaleFactor, kneeY, centerX - 18 * scaleFactor, ankleY);
          ctx.stroke();

        } else if (activeGarment.renderKey === "coat_cocoon_wool") {
          // Abrigo Cocoon Lana Charcoal
          ctx.fillStyle = "#27272A";
          ctx.beginPath();
          // Silueta oversized envolvente
          ctx.moveTo(centerX - 52 * scaleFactor, shoulderY - 4 * scaleFactor);
          ctx.lineTo(centerX + 52 * scaleFactor, shoulderY - 4 * scaleFactor);
          ctx.lineTo(centerX + 58 * scaleFactor, waistY + 10 * scaleFactor);
          ctx.lineTo(centerX + 45 * scaleFactor, kneeY + 30 * scaleFactor);
          ctx.lineTo(centerX - 45 * scaleFactor, kneeY + 30 * scaleFactor);
          ctx.lineTo(centerX - 58 * scaleFactor, waistY + 10 * scaleFactor);
          ctx.closePath();
          ctx.fill();

          // Cinturón ceñido con hebilla dorada
          ctx.fillStyle = "#18181B";
          ctx.fillRect(centerX - 35 * scaleFactor, waistY + 8 * scaleFactor, 70 * scaleFactor, 10 * scaleFactor);
          ctx.fillStyle = "#D4AF37";
          ctx.fillRect(centerX - 7 * scaleFactor, waistY + 6 * scaleFactor, 14 * scaleFactor, 14 * scaleFactor);
        }
      }

      // C. JOYERÍA & ACCESORIOS (JEWELRY)
      const activeJewelry = selectedItems.jewelry;
      if (activeJewelry) {
        if (activeJewelry.renderKey === "necklace_champagne") {
          // Gargantilla Royal que descansa en la clavícula
          ctx.strokeStyle = "#D4AF37";
          ctx.lineWidth = 4 * scaleFactor;
          ctx.beginPath();
          ctx.arc(centerX, shoulderY - 2 * scaleFactor, 16 * scaleFactor, 0.2, Math.PI - 0.2);
          ctx.stroke();

          // Destello central
          ctx.fillStyle = "#FFF";
          ctx.beginPath();
          ctx.arc(centerX, shoulderY + 14 * scaleFactor, 3 * scaleFactor, 0, Math.PI * 2);
          ctx.fill();
        } else if (activeJewelry.renderKey === "cuff_geometric_gold") {
          // Brazalete geométrico en muñeca derecha
          ctx.fillStyle = "#E5C158";
          ctx.fillRect(centerX + 44 * scaleFactor, hipY + 28 * scaleFactor, 12 * scaleFactor, 10 * scaleFactor);
        } else if (activeJewelry.renderKey === "sunglasses_dark_noir") {
          // Gafas oscuras de acetato en el rostro
          ctx.fillStyle = "#09090B";
          ctx.fillRect(centerX - 16 * scaleFactor, headY - 4 * scaleFactor, 32 * scaleFactor, 9 * scaleFactor);
          // Puente y cristales
          ctx.fillStyle = "#27272A";
          ctx.fillRect(centerX - 14 * scaleFactor, headY - 2 * scaleFactor, 11 * scaleFactor, 6 * scaleFactor);
          ctx.fillRect(centerX + 3 * scaleFactor, headY - 2 * scaleFactor, 11 * scaleFactor, 6 * scaleFactor);
        }
      }

      // D. BOLSOS (BAGS)
      const activeBag = selectedItems.bag;
      if (activeBag) {
        if (activeBag.renderKey === "clutch_gold_sculptural") {
          // Clutch facetado sostenido en la mano derecha
          ctx.fillStyle = "#D4AF37";
          ctx.beginPath();
          ctx.moveTo(centerX + 44 * scaleFactor, hipY + 38 * scaleFactor);
          ctx.lineTo(centerX + 64 * scaleFactor, hipY + 34 * scaleFactor);
          ctx.lineTo(centerX + 66 * scaleFactor, hipY + 54 * scaleFactor);
          ctx.lineTo(centerX + 46 * scaleFactor, hipY + 58 * scaleFactor);
          ctx.closePath();
          ctx.fill();
          // Faceta brillante
          ctx.fillStyle = "#FEF08A";
          ctx.beginPath();
          ctx.moveTo(centerX + 46 * scaleFactor, hipY + 38 * scaleFactor);
          ctx.lineTo(centerX + 58 * scaleFactor, hipY + 36 * scaleFactor);
          ctx.lineTo(centerX + 50 * scaleFactor, hipY + 46 * scaleFactor);
          ctx.closePath();
          ctx.fill();
        } else if (activeBag.renderKey === "tote_structured_black") {
          // Bolso Tote Box de cuero negro con asas doradas
          ctx.fillStyle = "#18181B";
          ctx.beginPath();
          ctx.rect(centerX - 72 * scaleFactor, hipY + 30 * scaleFactor, 28 * scaleFactor, 32 * scaleFactor);
          ctx.fill();
          // Herrajes de oro
          ctx.strokeStyle = "#D4AF37";
          ctx.lineWidth = 2 * scaleFactor;
          ctx.beginPath();
          ctx.arc(centerX - 58 * scaleFactor, hipY + 28 * scaleFactor, 7 * scaleFactor, Math.PI, 0);
          ctx.stroke();
        }
      }

      // --- 4. EFECTOS ESPECIALES DE DESTELLO Y PARTÍCULAS DORADAS ---
      if (lightingMode === "golden" || transitionProgress < 1) {
        const particleCount = transitionProgress < 1 ? 16 : 8;
        for (let i = 0; i < particleCount; i++) {
          const px = centerX + Math.sin(particleTime + i * 1.3) * (70 * scaleFactor);
          const py = shoulderY + ((particleTime * 25 + i * 45) % (ankleY - shoulderY));
          const pSize = 1.8 + Math.sin(particleTime * 2 + i) * 1.2;

          ctx.fillStyle = `rgba(212, 175, 55, ${0.4 + Math.sin(particleTime * 3 + i) * 0.3})`;
          ctx.beginPath();
          ctx.arc(px, py, pSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Flash de cambio de atuendo
      if (transitionProgress < 1) {
        const flashAlpha = (1 - transitionProgress) * 0.28;
        ctx.fillStyle = `rgba(212, 175, 55, ${flashAlpha})`;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.restore(); // restore zoom & translations

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [selectedItems, zoomLevel, lightingMode, transitionProgress]);

  return (
    <div className="relative w-full h-full min-h-[520px] md:min-h-[640px] flex items-center justify-center bg-canvas rounded-2xl overflow-hidden border border-whisper shadow-2xl">
      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair touch-none"
      />

      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-canvas/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-whisper text-xs font-serif tracking-wider text-gold">
        <Sparkles size={14} className="text-gold animate-pulse" />
        <span>ATELIER 360° • EDICIÓN ALTA COSTURA</span>
      </div>

      {/* Lighting Control Bar (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-surface/85 backdrop-blur-md p-1 rounded-xl border border-whisper">
        <button
          onClick={() => setLightingMode("runway")}
          title="Modo Pasarela Nocturna"
          className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
            lightingMode === "runway"
              ? "bg-gold text-canvas font-semibold shadow-sm"
              : "text-steel hover:text-foreground"
          }`}
        >
          Pasarela
        </button>
        <button
          onClick={() => setLightingMode("golden")}
          title="Modo Halo Champagne"
          className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
            lightingMode === "golden"
              ? "bg-gold text-canvas font-semibold shadow-sm"
              : "text-steel hover:text-foreground"
          }`}
        >
          Champagne
        </button>
        <button
          onClick={() => setLightingMode("studio")}
          title="Modo Estudio Editorial"
          className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
            lightingMode === "studio"
              ? "bg-gold text-canvas font-semibold shadow-sm"
              : "text-steel hover:text-foreground"
          }`}
        >
          Estudio
        </button>
      </div>

      {/* Floating Active Pieces Badges (Interactive Hotspots) */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-1.5 justify-center md:justify-start pointer-events-auto">
        {(["garment", "jewelry", "bag", "shoes"] as GarmentCategory[]).map((cat) => {
          const item = selectedItems[cat];
          if (!item) return null;
          return (
            <div
              key={cat}
              className="group flex items-center gap-2 bg-surface/90 hover:bg-surface border border-whisper/80 hover:border-gold/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-foreground transition-all shadow-lg"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.accentHex || item.colorHex }} />
              <button 
                onClick={() => onSelectItemCategory?.(cat)}
                className="font-medium hover:text-gold transition-colors text-left truncate max-w-[140px]"
              >
                {item.name}
              </button>
              <span className="text-[10px] text-steel font-mono">${item.price}</span>
              {onRemoveItem && (
                <button
                  onClick={() => onRemoveItem(cat)}
                  className="text-steel hover:text-red-400 text-xs ml-1 transition-colors"
                  title={`Quitar ${item.name}`}
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Zoom & Reset Tools (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:flex flex-col gap-1.5 bg-surface/80 backdrop-blur-md p-1.5 rounded-xl border border-whisper">
        <button
          onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.15))}
          title="Acercar silueta"
          className="p-1.5 rounded-lg text-steel hover:text-gold hover:bg-white/5 transition-all"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.15))}
          title="Alejar silueta"
          className="p-1.5 rounded-lg text-steel hover:text-gold hover:bg-white/5 transition-all"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          title="Restablecer vista"
          className="p-1.5 rounded-lg text-steel hover:text-gold hover:bg-white/5 transition-all"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
