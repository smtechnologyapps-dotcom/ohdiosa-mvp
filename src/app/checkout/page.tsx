"use client";

import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CreditCard, Smartphone, Banknote, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PaymentMethod = "card" | "yappy" | "cash";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-6 animate-in fade-in duration-1000">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-surface border border-whisper p-12 flex flex-col items-center max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6 text-gold">
            <CheckCircle size={40} />
          </div>
          <h1 className="font-serif text-3xl text-gold mb-4">Pago Exitoso</h1>
          <p className="text-steel font-sans mb-8">
            Tu orden ha sido procesada con éxito. Recibirás un correo con los detalles del envío blindado.
          </p>
          <Link href="/" className="bg-ink text-canvas hover:bg-gold transition-colors py-4 px-8 uppercase tracking-widest text-xs font-semibold w-full">
            Volver a la Boutique
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas pt-32 pb-24 animate-in fade-in duration-1000">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <header className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-steel hover:text-gold transition-colors text-xs uppercase tracking-widest font-semibold mb-8">
            <ArrowLeft size={16} /> Seguir Comprando
          </Link>
          <h1 className="font-serif text-4xl text-ink tracking-tight mb-4">Checkout</h1>
          <div className="w-12 h-[1px] bg-gold"></div>
        </header>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Form & Payment */}
          <div className="flex-1 flex flex-col gap-12">
            <section>
              <h2 className="font-serif text-2xl text-gold mb-6">Detalles de Envío</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre completo" className="col-span-2 bg-surface border border-whisper p-4 text-sm text-ink placeholder:text-steel focus:border-gold outline-none transition-colors" required />
                <input type="email" placeholder="Correo electrónico" className="col-span-2 bg-surface border border-whisper p-4 text-sm text-ink placeholder:text-steel focus:border-gold outline-none transition-colors" required />
                <input type="text" placeholder="Dirección de entrega" className="col-span-2 bg-surface border border-whisper p-4 text-sm text-ink placeholder:text-steel focus:border-gold outline-none transition-colors" required />
                <input type="text" placeholder="Ciudad" className="bg-surface border border-whisper p-4 text-sm text-ink placeholder:text-steel focus:border-gold outline-none transition-colors" required />
                <input type="text" placeholder="Código Postal" className="bg-surface border border-whisper p-4 text-sm text-ink placeholder:text-steel focus:border-gold outline-none transition-colors" required />
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-gold mb-6">Método de Pago</h2>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <button onClick={() => setMethod("card")} className={`p-4 border flex flex-col items-center gap-3 transition-colors ${method === 'card' ? 'border-gold text-gold bg-gold/5' : 'border-whisper text-steel hover:border-gold/50'}`}>
                  <CreditCard size={24} />
                  <span className="text-xs uppercase tracking-widest font-semibold">Tarjeta</span>
                </button>
                <button onClick={() => setMethod("yappy")} className={`p-4 border flex flex-col items-center gap-3 transition-colors ${method === 'yappy' ? 'border-gold text-gold bg-gold/5' : 'border-whisper text-steel hover:border-gold/50'}`}>
                  <Smartphone size={24} />
                  <span className="text-xs uppercase tracking-widest font-semibold">Yappy</span>
                </button>
                <button onClick={() => setMethod("cash")} className={`p-4 border flex flex-col items-center gap-3 transition-colors ${method === 'cash' ? 'border-gold text-gold bg-gold/5' : 'border-whisper text-steel hover:border-gold/50'}`}>
                  <Banknote size={24} />
                  <span className="text-xs uppercase tracking-widest font-semibold">Efectivo</span>
                </button>
              </div>

              <form onSubmit={handlePayment} className="bg-surface border border-whisper p-6 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {method === "card" && (
                    <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
                      <p className="text-steel text-sm mb-2">Paga de forma segura con tu Tarjeta de Crédito o Débito.</p>
                      <input type="text" placeholder="Número de Tarjeta" className="bg-background border border-whisper p-4 text-sm text-ink outline-none" required />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM/AA" className="bg-background border border-whisper p-4 text-sm text-ink outline-none" required />
                        <input type="text" placeholder="CVC" className="bg-background border border-whisper p-4 text-sm text-ink outline-none" required />
                      </div>
                    </motion.div>
                  )}
                  {method === "yappy" && (
                    <motion.div key="yappy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center py-8">
                      <div className="w-32 h-32 bg-white flex items-center justify-center mb-6">
                        {/* Placeholder for QR Code */}
                        <div className="grid grid-cols-5 grid-rows-5 gap-1 w-24 h-24">
                          {Array.from({length: 25}).map((_, i) => (
                            <div key={i} className={`bg-ink ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-steel text-sm mb-2">Escanea el código QR o busca nuestro número en Yappy Directorio:</p>
                      <p className="text-2xl font-mono text-gold">@OHDIOSA (6000-0000)</p>
                    </motion.div>
                  )}
                  {method === "cash" && (
                    <motion.div key="cash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col justify-center h-full">
                      <p className="text-steel text-sm leading-relaxed">
                        Pago contra entrega. Nuestro servicio de mensajería blindada cobrará en efectivo al momento de entregar tu pedido exclusivo en la dirección indicada.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <button type="submit" disabled={items.length === 0} className="w-full mt-8 bg-ink text-canvas hover:bg-gold transition-colors py-4 uppercase tracking-widest text-xs font-semibold disabled:opacity-50">
                  {method === "yappy" ? "Confirmar Pago Enviado" : method === "cash" ? "Confirmar Pedido" : "Pagar Ahora"}
                </button>
              </form>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-surface border border-whisper p-6 sticky top-24">
              <h3 className="font-serif text-xl text-gold mb-6">Resumen del Pedido</h3>
              <div className="flex flex-col gap-4 mb-6 border-b border-whisper pb-6">
                {items.length === 0 ? (
                  <p className="text-steel text-sm">Tu bolsa está vacía.</p>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 aspect-[3/4] relative bg-background flex-shrink-0">
                        <Image src={`/images/product_${item.image}.jpg`} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col flex-1 justify-center">
                        <span className="font-serif text-sm text-ink line-clamp-1">{item.name}</span>
                        <span className="text-xs text-steel">Cant: {item.quantity}</span>
                        <span className="font-mono text-xs mt-1">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex flex-col gap-3 font-mono text-sm text-steel mb-6">
                <div className="flex justify-between"><span>Subtotal</span><span>${totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Envío Blindado</span><span className="text-gold">Cortesía</span></div>
              </div>
              
              <div className="flex justify-between items-center pt-6 border-t border-whisper">
                <span className="uppercase tracking-widest text-xs font-semibold">Total</span>
                <span className="font-mono text-2xl text-gold">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
