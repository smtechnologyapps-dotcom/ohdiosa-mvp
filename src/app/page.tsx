"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Parallax setup
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const secondaryImageY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  useEffect(() => {
    const updateMaxScroll = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (carouselRef.current && containerRef.current && desktop) {
        setMaxScroll(carouselRef.current.scrollWidth - containerRef.current.clientWidth + 100);
      } else {
        setMaxScroll(0);
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
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-balance mb-6 flex flex-col"
          >
            <span className="overflow-hidden inline-block pb-2">
              <motion.span
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="inline-block"
              >
                Lujo
              </motion.span>
            </span>
            <span className="overflow-hidden inline-block pb-2">
              <motion.span
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="inline-block italic font-light text-gold"
              >
                Redefinido.
              </motion.span>
            </span>
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
            className="flex flex-wrap items-center gap-4"
          >
            <Link 
              href="/categories/clothes" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-canvas font-sans text-sm font-semibold tracking-wide hover:bg-gold-muted transition-colors shadow-lg shadow-gold/10"
            >
              DESCUBRIR COLECCIÓN
            </Link>

            <Link 
              href="/fitting-room" 
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-surface hover:bg-surface/80 text-foreground border border-whisper hover:border-gold/50 font-sans text-sm font-semibold tracking-wide transition-all shadow-md group"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>PROBADOR VIRTUAL 360°</span>
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
            <motion.div style={{ y: heroImageY }} className="absolute inset-0 -top-[20%] h-[140%]">
              <Image 
                src="/images/hero_main.jpg" 
                alt="Modelo usando alta costura OHDIOSA" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: secondaryImageY }}
            className="absolute bottom-0 left-0 w-1/2 h-[50%] md:h-[60%] border-4 border-background overflow-hidden z-20 hidden md:block group"
          >
            <motion.div className="absolute inset-0 -top-[20%] h-[140%]">
              <Image 
                src="/images/hero_secondary.jpg" 
                alt="Detalle de joyas oro" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>
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
          className="pl-6 md:pl-12 mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none cursor-ew-resize relative h-[70vh]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseMove={handleMouseMove}
        >
          <motion.div 
            ref={carouselRef}
            className="flex gap-8 w-max [&::-webkit-scrollbar]:hidden"
            style={{ x: isDesktop ? smoothX : 0 }}
          >
            {/* Category: Ropa Casual */}
            <motion.div className="min-w-[85vw] md:min-w-[480px] flex flex-col group snap-center md:snap-align-none">
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
            <motion.div className="min-w-[85vw] md:min-w-[480px] flex flex-col group snap-center md:snap-align-none">
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
            <motion.div className="min-w-[85vw] md:min-w-[480px] flex flex-col group snap-center md:snap-align-none">
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
            <motion.div className="min-w-[85vw] md:min-w-[480px] flex flex-col group snap-center md:snap-align-none">
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

      {/* Interactive Virtual Fitting Room Promo Section */}
      <section className="py-24 w-full bg-surface/40 border-t border-whisper relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>Innovación Exclusiva OHDIOSA</span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground tracking-tight leading-[1.1]">
              Atelier Virtual &amp; <br />
              <span className="italic text-gold font-light">Probador 360°</span>
            </h2>

            <p className="text-steel text-sm md:text-base leading-relaxed max-w-xl">
              Descubre cómo luce cada combinación en silueta real antes de adquirirla. Nuestro probador interactivo te permite coordinar vestidos asimétricos, sastrería estructurada, joyería fina y bolsos de mano a 60 FPS con total fidelidad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-canvas/60 border border-whisper/80">
                <div className="text-gold font-serif text-lg mb-1">Silueta de Pasarela</div>
                <p className="text-xs text-steel">Iluminación de estudio, halo champagne y física de tela en tiempo real.</p>
              </div>
              <div className="p-4 rounded-xl bg-canvas/60 border border-whisper/80">
                <div className="text-gold font-serif text-lg mb-1">Look Completo Atelier</div>
                <p className="text-xs text-steel">Descuento exclusivo al llevar el outfit y checkout directo por WhatsApp y Yappy.</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/fitting-room"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-muted text-canvas font-semibold text-sm tracking-wider uppercase transition-all shadow-xl shadow-gold/10"
              >
                <span>Probar Ahora en el Atelier</span>
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Teaser */}
          <div className="w-full lg:w-[480px] h-[520px] rounded-2xl bg-canvas border border-whisper p-6 relative flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between text-xs font-mono text-gold border-b border-whisper/80 pb-3">
              <span>PREVIEW • FW26</span>
              <span className="px-2 py-0.5 rounded bg-gold/15">MODO LIVE</span>
            </div>

            <div className="relative flex-1 flex items-center justify-center">
              <div className="w-48 h-80 rounded-full bg-gold/5 blur-2xl absolute" />
              <div className="text-center space-y-3 z-10">
                <div className="font-serif text-2xl text-foreground">Vestido Asimétrico Noir</div>
                <div className="text-xs font-mono text-steel">+ Collar Champagne Royal + Clutch Oro</div>
                <div className="font-mono text-xl text-gold font-bold">$3,290 USD</div>
                <div className="text-[11px] text-steel/70">Ahorro del 10% por Look Completo Aplicado</div>
              </div>
            </div>

            <Link
              href="/fitting-room"
              className="w-full py-3 text-center bg-surface hover:bg-white/5 border border-whisper hover:border-gold/50 rounded-xl text-xs font-medium text-foreground transition-all"
            >
              Abrir Probador Completo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
