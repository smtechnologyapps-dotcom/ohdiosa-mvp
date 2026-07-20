"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const updateMaxScroll = () => {
      if (carouselRef.current && containerRef.current) {
        setMaxScroll(carouselRef.current.scrollWidth - containerRef.current.clientWidth + 100);
      }
    };
    
    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || maxScroll <= 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPercent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    x.set(-maxScroll * xPercent);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Asymmetric */}
      <section className="relative min-h-[90vh] flex flex-col md:flex-row max-w-[1400px] mx-auto w-full pt-12 px-6 md:px-12 gap-12 overflow-hidden">
        {/* Left Typography Focus */}
        <div className="flex-1 flex flex-col justify-center mt-20 md:mt-0 z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-balance mb-6"
          >
            Lujo <br className="hidden md:block"/>
            <span className="italic font-light text-gold">Redefinido.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-steel font-sans max-w-md text-sm md:text-base leading-relaxed mb-10"
          >
            Explora la colección FW26 de OHDIOSA. Siluetas asimétricas, 
            tejidos de alta costura y detalles en oro champagne que marcan
            un nuevo estándar de exclusividad.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Link 
              href="/categories/clothes" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-canvas font-sans text-sm font-semibold tracking-wide hover:bg-gold-muted transition-colors"
            >
              DESCUBRIR COLECCIÓN
            </Link>
          </motion.div>
        </div>

        {/* Right Asymmetric Images */}
        <div className="flex-1 relative flex items-center justify-center md:justify-end gap-6 h-[60vh] md:h-auto mt-12 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-2/3 h-[80%] md:h-[90%] overflow-hidden z-0 group"
          >
            <Image 
              src="/images/hero_main.jpg" 
              alt="Modelo usando alta costura OHDIOSA" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              priority
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 w-1/2 h-[50%] md:h-[60%] border-4 border-background overflow-hidden z-20 hidden md:block group"
          >
            <Image 
              src="/images/hero_secondary.jpg" 
              alt="Detalle de joyas oro" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Categories Carousel (Mouse Move Interactive) */}
      <section className="py-32 w-full bg-background border-t border-whisper overflow-hidden">
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl">
            Explora las <span className="italic text-gold">Colecciones</span>
          </h2>
          <p className="text-steel font-sans text-sm mt-4 max-w-lg leading-relaxed">
            Mueve tu cursor para desplazarte por nuestras colecciones exclusivas.
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="pl-6 md:pl-12 mx-auto overflow-visible cursor-ew-resize relative h-[70vh]"
          onMouseMove={handleMouseMove}
        >
          <motion.div 
            ref={carouselRef}
            className="flex gap-8 w-max"
            style={{ x: smoothX }}
          >
            {/* Category: Ropa Casual */}
            <motion.div className="min-w-[320px] md:min-w-[480px] flex flex-col group">
              <Link href="/categories/casual" className="block w-full h-[60vh] bg-surface relative overflow-hidden border border-transparent hover:border-gold/30 transition-colors duration-700">
                <Image 
                  src="/images/casual.jpg" 
                  alt="Ropa Casual Premium" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700 z-0"></div>
              </Link>
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <h3 className="font-serif text-xl text-ink group-hover:text-gold transition-colors">Estilo Casual</h3>
                  <p className="text-steel font-sans text-xs mt-2 uppercase tracking-widest">Ropa de Día</p>
                </div>
              </div>
            </motion.div>

            {/* Category: Ropa de Noche */}
            <motion.div className="min-w-[320px] md:min-w-[480px] flex flex-col group">
              <Link href="/categories/noche" className="block w-full h-[60vh] bg-surface relative overflow-hidden border border-transparent hover:border-gold/30 transition-colors duration-700">
                <Image 
                  src="/images/evening.jpg" 
                  alt="Ropa de Noche" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700 z-0"></div>
              </Link>
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <h3 className="font-serif text-xl text-ink group-hover:text-gold transition-colors">Vestir de Noche</h3>
                  <p className="text-steel font-sans text-xs mt-2 uppercase tracking-widest">Gala & Elegancia</p>
                </div>
              </div>
            </motion.div>

            {/* Category: Trabajo */}
            <motion.div className="min-w-[320px] md:min-w-[480px] flex flex-col group">
              <Link href="/categories/trabajo" className="block w-full h-[60vh] bg-surface relative overflow-hidden border border-transparent hover:border-gold/30 transition-colors duration-700">
                <Image 
                  src="/images/work.jpg" 
                  alt="Ropa de Trabajo" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700 z-0"></div>
              </Link>
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <h3 className="font-serif text-xl text-ink group-hover:text-gold transition-colors">Poder & Oficina</h3>
                  <p className="text-steel font-sans text-xs mt-2 uppercase tracking-widest">Estilo para Trabajo</p>
                </div>
              </div>
            </motion.div>

            {/* Category: Accesorios */}
            <motion.div className="min-w-[320px] md:min-w-[480px] flex flex-col group">
              <Link href="/categories/accesorios" className="block w-full h-[60vh] bg-surface relative overflow-hidden border border-transparent hover:border-gold/30 transition-colors duration-700">
                <Image 
                  src="/images/jewelry.jpg" 
                  alt="Joyas y Accesorios" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700 z-0"></div>
              </Link>
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <h3 className="font-serif text-xl text-ink group-hover:text-gold transition-colors">Joyas & Accesorios</h3>
                  <p className="text-steel font-sans text-xs mt-2 uppercase tracking-widest">Piezas Exclusivas</p>
                </div>
              </div>
            </motion.div>
            
            {/* Empty space block to allow scrolling completely past the last item safely */}
            <div className="min-w-[12vw] h-1"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
