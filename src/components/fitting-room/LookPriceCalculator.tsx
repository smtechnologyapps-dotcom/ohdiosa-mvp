"use client";

import React, { useState } from "react";
import { FittingItem, GarmentCategory, calculateLookTotal } from "@/lib/fittingRoomData";
import { useCart } from "@/lib/CartContext";
import {
  ShoppingBag,
  Send,
  Sparkles,
  QrCode,
  Check,
  Share2,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LookPriceCalculatorProps {
  selectedItems: { [key in GarmentCategory]?: FittingItem | null };
  onRemoveItem: (category: GarmentCategory) => void;
}

export function LookPriceCalculator({
  selectedItems,
  onRemoveItem,
}: LookPriceCalculatorProps) {
  const { addToCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [isYappyModalOpen, setIsYappyModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const selectedIds = {
    garment: selectedItems.garment?.id,
    jewelry: selectedItems.jewelry?.id,
    bag: selectedItems.bag?.id,
    shoes: selectedItems.shoes?.id,
  };

  const { subtotal, discountRate, discountAmount, total, items, itemCount } =
    calculateLookTotal(selectedIds);

  const handleAddAllToCart = () => {
    setIsAdding(true);
    items.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: "clothes", // fallback image key
      });
    });
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const handleWhatsAppConcierge = () => {
    const phone = "50765091352";
    let message = `*SOLICITUD DE ATELIER OHDIOSA - PROBADOR VIRTUAL*\n\n`;
    message += `Hola, deseo consultar y agendar la confección/reserva de mi look personalizado de pasarela:\n\n`;

    items.forEach((item) => {
      message += `• *${item.name}* (${item.categoryLabel}) — $${item.price.toLocaleString()}\n`;
    });

    message += `\n*Subtotal:* $${subtotal.toLocaleString()}`;
    if (discountAmount > 0) {
      message += `\n*Cortesía Atelier (${Math.round(discountRate * 100)}%):* -$${discountAmount.toLocaleString()}`;
    }
    message += `\n*TOTAL DEL LOOK:* $${total.toLocaleString()} USD\n\n`;
    message += `¿Tienen disponibilidad en atelier o entrega personalizada en Panamá?`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  };

  const handleShareLook = () => {
    const lookSummary = `Mi Look OHDIOSA: ${items.map((i) => i.name).join(" + ")} (Total: $${total.toLocaleString()})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(lookSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-surface/70 rounded-2xl border border-whisper p-5 backdrop-blur-xl flex flex-col justify-between">
      {/* Header with Title and Item Counter */}
      <div>
        <div className="flex items-center justify-between border-b border-whisper/80 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-gold/10 text-gold border border-gold/20">
              <Sparkles size={16} />
            </span>
            <div>
              <h3 className="font-serif text-lg text-foreground leading-tight">
                Composición de Silueta
              </h3>
              <p className="text-xs text-steel font-mono">
                {itemCount} {itemCount === 1 ? "pieza activa" : "piezas activas"} en atelier
              </p>
            </div>
          </div>

          <button
            onClick={handleShareLook}
            title="Copiar o compartir look"
            className="flex items-center gap-1.5 text-xs text-steel hover:text-gold transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
            <span className="hidden sm:inline">{copied ? "Copiado" : "Compartir"}</span>
          </button>
        </div>

        {/* Selected Pieces Mini List */}
        <div className="space-y-2 mb-4 max-h-[160px] overflow-y-auto pr-1">
          {items.length === 0 ? (
            <p className="text-xs text-steel italic py-3 text-center">
              Selecciona prendas o accesorios en el carrusel para componer tu silueta.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-xs bg-canvas/40 p-2 rounded-xl border border-whisper/50 group"
              >
                <div className="flex items-center gap-2 overflow-hidden pr-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.colorHex }}
                  />
                  <span className="text-foreground font-medium truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-steel font-medium">
                    ${item.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => onRemoveItem(item.category)}
                    className="text-steel hover:text-red-400 p-0.5 rounded transition-colors"
                    title="Remover"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-1.5 pt-3 border-t border-whisper/80 text-xs font-mono mb-4">
          <div className="flex justify-between text-steel">
            <span>Subtotal de Piezas:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-gold font-medium">
              <span className="flex items-center gap-1">
                <Tag size={12} />
                Cortesía Atelier ({Math.round(discountRate * 100)}%):
              </span>
              <span>-${discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between text-foreground font-serif text-lg font-bold pt-2 border-t border-whisper/40">
            <span>Total del Look:</span>
            <span className="font-mono text-gold text-xl">${total.toLocaleString()}</span>
          </div>

          {itemCount >= 2 && discountAmount === 0 && (
            <p className="text-[11px] text-steel italic">
              Agrega 1 pieza más para desbloquear un 10% de cortesía en el look completo.
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        {/* Add All To Cart */}
        <button
          onClick={handleAddAllToCart}
          disabled={items.length === 0 || isAdding}
          className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
            items.length === 0
              ? "bg-whisper/20 text-steel cursor-not-allowed"
              : "bg-gold hover:bg-gold-muted text-canvas font-semibold shadow-gold/20"
          }`}
        >
          <ShoppingBag size={16} />
          <span>{isAdding ? "Agregando al Atelier..." : "Añadir Look al Carrito"}</span>
        </button>

        {/* Secondary Grid: WhatsApp & Yappy */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleWhatsAppConcierge}
            disabled={items.length === 0}
            className="py-2.5 px-3 bg-surface hover:bg-white/5 border border-whisper hover:border-gold/40 text-foreground rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={14} className="text-emerald-400" />
            <span>WhatsApp Atelier</span>
          </button>

          <button
            onClick={() => setIsYappyModalOpen(true)}
            disabled={items.length === 0}
            className="py-2.5 px-3 bg-surface hover:bg-white/5 border border-whisper hover:border-gold/40 text-foreground rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <QrCode size={14} className="text-sky-400" />
            <span>Pago Yappy</span>
          </button>
        </div>

        {/* Security / Quality Seal */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-steel/80 pt-2 font-mono">
          <ShieldCheck size={12} className="text-gold" />
          <span>Atelier Alta Costura • Hecho a medida en Panamá & París</span>
        </div>
      </div>

      {/* YAPPY MODAL */}
      <AnimatePresence>
        {isYappyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsYappyModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-whisper rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative"
            >
              <button
                onClick={() => setIsYappyModalOpen(false)}
                className="absolute top-4 right-4 text-steel hover:text-foreground text-sm"
              >
                ✕
              </button>

              <div className="w-14 h-14 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full flex items-center justify-center mx-auto">
                <QrCode size={28} />
              </div>

              <div>
                <h4 className="font-serif text-lg text-foreground">
                  Pago Directo con Yappy
                </h4>
                <p className="text-xs text-steel mt-1">
                  Transfiere de forma inmediata y asegura las piezas exclusivas de tu look.
                </p>
              </div>

              <div className="bg-canvas/60 p-4 rounded-xl border border-whisper/80 text-left font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-steel">Total a transferir:</span>
                  <span className="text-gold font-bold text-sm">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel">Comercio Yappy:</span>
                  <span className="text-foreground font-bold">@ohdiosapanama</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel">Teléfono Concierge:</span>
                  <span className="text-foreground font-bold">+507 6509-1352</span>
                </div>
              </div>

              <p className="text-[11px] text-steel">
                Tras enviar el pago en tu App de Banco General, envía el comprobante por WhatsApp para confirmar la confección o entrega personalizada.
              </p>

              <button
                onClick={() => {
                  setIsYappyModalOpen(false);
                  handleWhatsAppConcierge();
                }}
                className="w-full py-2.5 bg-gold text-canvas rounded-xl font-medium text-xs hover:bg-gold-muted transition-colors cursor-pointer"
              >
                Reportar Comprobante por WhatsApp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
