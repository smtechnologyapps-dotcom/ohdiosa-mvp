"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsDrawerOpen } = useCart();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-whisper">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Desktop Nav - Left */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-sans tracking-wide">
            <Link href="/categories/clothes" className="text-steel hover:text-gold transition-colors uppercase">
              Colección
            </Link>
            <Link href="/categories/accessories" className="text-steel hover:text-gold transition-colors uppercase">
              Accesorios
            </Link>
          </nav>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl md:text-3xl tracking-widest uppercase text-foreground">
            OHDIOSA
          </Link>

          {/* Desktop Nav - Right */}
          <nav className="flex items-center gap-6">
            <button className="hidden md:block text-foreground hover:text-gold transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link href="/admin" className="text-foreground hover:text-gold transition-colors">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="text-foreground hover:text-gold transition-colors relative cursor-pointer"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] bg-gold text-canvas rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 z-50 bg-background flex flex-col p-6"
          >
            <div className="flex justify-end mb-8">
              <button 
                className="text-foreground hover:text-gold text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                ✕ Cerrar
              </button>
            </div>
            <nav className="flex flex-col gap-6 font-serif text-3xl">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">
                Inicio
              </Link>
              <Link href="/categories/clothes" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">
                Colección
              </Link>
              <Link href="/categories/accessories" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">
                Accesorios
              </Link>
              <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">
                Administración
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
