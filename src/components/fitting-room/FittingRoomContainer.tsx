"use client";

import React, { useState } from "react";
import {
  FITTING_ITEMS,
  CURATED_LOOKS,
  FittingItem,
  CuratedLook,
  GarmentCategory,
  BodySilhouette,
} from "@/lib/fittingRoomData";
import { AvatarCanvas } from "./AvatarCanvas";
import { LookCarousel } from "./LookCarousel";
import { LookPriceCalculator } from "./LookPriceCalculator";
import { SilhouetteScannerModal } from "./SilhouetteScannerModal";
import { Sparkles, ArrowLeft, Ruler } from "lucide-react";
import Link from "next/link";

export function FittingRoomContainer() {
  // Estado inicial de prendas: Look icónico pre-cargado
  const [selectedItems, setSelectedItems] = useState<{
    [key in GarmentCategory]?: FittingItem | null;
  }>({
    garment: FITTING_ITEMS.find((i) => i.id === "g1") || null, // Vestido Asimétrico Noir
    jewelry: FITTING_ITEMS.find((i) => i.id === "j1") || null, // Collar Champagne
    bag: FITTING_ITEMS.find((i) => i.id === "b1") || null,     // Clutch Oro Macizo
    shoes: FITTING_ITEMS.find((i) => i.id === "s1") || null,   // Stilettos Asimétricos
  });

  const [activeCategory, setActiveCategory] = useState<GarmentCategory | "curated">("garment");

  // Estado del perfil corporal y medidas (Escáner de Silueta)
  const [silhouette, setSilhouette] = useState<BodySilhouette>("hourglass");
  const [height, setHeight] = useState<number>(168);
  const [size, setSize] = useState<string>("S");
  const [customFaceUrl, setCustomFaceUrl] = useState<string | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);

  // Manejar selección o deselección de una prenda
  const handleSelectItem = (item: FittingItem) => {
    setSelectedItems((prev) => {
      const isAlreadySelected = prev[item.category]?.id === item.id;
      return {
        ...prev,
        [item.category]: isAlreadySelected ? null : item,
      };
    });
  };

  // Remover prenda de una categoría
  const handleRemoveItem = (category: GarmentCategory) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: null,
    }));
  };

  // Seleccionar un look curado de pasarela
  const handleSelectCuratedLook = (look: CuratedLook) => {
    const garment = FITTING_ITEMS.find((i) => i.id === look.itemIds.garment) || null;
    const jewelry = FITTING_ITEMS.find((i) => i.id === look.itemIds.jewelry) || null;
    const bag = FITTING_ITEMS.find((i) => i.id === look.itemIds.bag) || null;
    const shoes = FITTING_ITEMS.find((i) => i.id === look.itemIds.shoes) || null;

    setSelectedItems({ garment, jewelry, bag, shoes });
    if (look.bestSilhouette) {
      setSilhouette(look.bestSilhouette);
    }
  };

  // Inspiración del estilista (Randomizer)
  const handleRandomizeLook = () => {
    const garments = FITTING_ITEMS.filter((i) => i.category === "garment");
    const jewelries = FITTING_ITEMS.filter((i) => i.category === "jewelry");
    const bags = FITTING_ITEMS.filter((i) => i.category === "bag");
    const shoes = FITTING_ITEMS.filter((i) => i.category === "shoes");

    const randomGarment = garments[Math.floor(Math.random() * garments.length)];
    const randomJewelry = jewelries[Math.floor(Math.random() * jewelries.length)];
    const randomBag = bags[Math.floor(Math.random() * bags.length)];
    const randomShoes = shoes[Math.floor(Math.random() * shoes.length)];

    setSelectedItems({
      garment: randomGarment,
      jewelry: randomJewelry,
      bag: randomBag,
      shoes: randomShoes,
    });
  };

  // Aplicar perfil desde el modal de escáner
  const handleApplyProfile = (profile: {
    silhouette: BodySilhouette;
    height: number;
    size: string;
    customFaceUrl: string | null;
  }) => {
    setSilhouette(profile.silhouette);
    setHeight(profile.height);
    setSize(profile.size);
    setCustomFaceUrl(profile.customFaceUrl);
  };

  return (
    <div className="w-full min-h-[calc(100dvh-5rem)] flex flex-col justify-between max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12 py-6">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-steel uppercase font-mono tracking-widest mb-1">
            <Link href="/" className="hover:text-gold transition-colors flex items-center gap-1">
              <ArrowLeft size={12} />
              <span>Inicio</span>
            </Link>
            <span>/</span>
            <span className="text-gold">Atelier Virtual</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight flex items-center gap-3">
            <span>Probador Virtual &amp; Avatar 360°</span>
            <span className="text-xs font-mono font-normal uppercase px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/30">
              Couture Live
            </span>
          </h1>
        </div>

        {/* Action Trigger for Silhouette Scanner */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface hover:bg-surface/80 border border-whisper hover:border-gold/50 rounded-xl text-xs font-medium text-foreground transition-all cursor-pointer shadow-md group"
          >
            <Ruler size={14} className="text-gold group-hover:rotate-12 transition-transform" />
            <span>Escáner de Medidas &amp; Talla</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Split Atelier 50/50 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Avatar Canvas (5 Cols on Large) */}
        <div className="lg:col-span-5 h-[580px] lg:h-[720px] sticky top-24">
          <AvatarCanvas
            selectedItems={selectedItems}
            silhouette={silhouette}
            height={height}
            size={size}
            customFaceUrl={customFaceUrl}
            onOpenScanner={() => setIsScannerOpen(true)}
            onRemoveItem={handleRemoveItem}
            onSelectItemCategory={(cat) => setActiveCategory(cat)}
          />
        </div>

        {/* Right Column: Racks & Price Breakdown (7 Cols on Large) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Look Carousel / Selection Racks */}
          <div className="h-[460px] lg:h-[480px]">
            <LookCarousel
              selectedItems={selectedItems}
              activeSilhouette={silhouette}
              onSelectItem={handleSelectItem}
              onSelectCuratedLook={handleSelectCuratedLook}
              onRandomizeLook={handleRandomizeLook}
              onOpenScanner={() => setIsScannerOpen(true)}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          {/* Look Price Calculator / Checkout Integration */}
          <div>
            <LookPriceCalculator
              selectedItems={selectedItems}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
      </div>

      {/* Modal: Escáner de Silueta & Asesor de Talla */}
      <SilhouetteScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        currentSilhouette={silhouette}
        currentHeight={height}
        currentSize={size}
        customFaceUrl={customFaceUrl}
        onApplyProfile={handleApplyProfile}
      />
    </div>
  );
}
