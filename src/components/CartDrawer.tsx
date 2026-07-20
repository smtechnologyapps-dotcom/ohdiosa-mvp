"use client";

import { useCart } from "@/lib/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { items, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    setIsDrawerOpen(false);
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-surface border-l border-whisper shadow-2xl z-[101] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-whisper">
              <h2 className="font-serif text-2xl text-gold flex items-center gap-3">
                <ShoppingBag /> Mi Bolsa
              </h2>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-steel hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-steel">
                  <ShoppingBag size={48} className="opacity-20 mb-4" />
                  <p className="font-sans">Tu bolsa está vacía.</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-whisper pb-6">
                    <div className="w-20 aspect-[3/4] relative bg-background overflow-hidden flex-shrink-0">
                      <Image 
                        src={`/images/product_${item.image}.jpg`} 
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-ink text-sm pr-4">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-steel hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <span className="font-mono text-steel mt-1">${item.price.toLocaleString()}</span>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 border border-whisper px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-steel hover:text-gold"><Minus size={12} /></button>
                          <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-steel hover:text-gold"><Plus size={12} /></button>
                        </div>
                        <span className="font-mono text-gold">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-whisper bg-canvas">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-steel uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="font-mono text-2xl text-ink">${totalPrice.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-ink text-canvas hover:bg-gold transition-colors duration-500 py-4 text-sm uppercase tracking-widest font-semibold"
                >
                  Proceder al Pago
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
