import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-whisper bg-background pt-24 pb-12 px-6 md:px-12 mt-auto">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="font-serif text-3xl tracking-widest uppercase text-foreground mb-6 block">
            OHDIOSA
          </Link>
          <p className="text-steel font-sans max-w-sm text-sm leading-relaxed">
            Redefiniendo el lujo a través del diseño asimétrico y la artesanía de alta costura. Explora la exclusividad en cada detalle.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-gold text-lg mb-2">Colecciones</h4>
          <Link href="/categories/clothes" className="text-steel hover:text-foreground transition-colors text-sm">
            Ropa de Alta Costura
          </Link>
          <Link href="/categories/accessories" className="text-steel hover:text-foreground transition-colors text-sm">
            Accesorios Exclusivos
          </Link>
          <Link href="/new" className="text-steel hover:text-foreground transition-colors text-sm">
            Nuevos Lanzamientos
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-gold text-lg mb-2">Asistencia</h4>
          <Link href="/admin" className="text-steel hover:text-foreground transition-colors text-sm">
            Portal Administrativo
          </Link>
          <button className="text-steel hover:text-foreground transition-colors text-sm text-left">
            Contactar Asistente 24/7
          </button>
          <Link href="/returns" className="text-steel hover:text-foreground transition-colors text-sm">
            Política de Devoluciones
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-whisper flex flex-col md:flex-row justify-between items-center text-xs text-steel gap-4 md:gap-0">
        <p>© {new Date().getFullYear()} OHDIOSA. Todos los derechos reservados.</p>
        <p className="font-serif tracking-widest text-gold opacity-90 uppercase">Una creación de <span className="font-bold">OMNEX</span></p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-gold transition-colors">Privacidad</Link>
          <Link href="/terms" className="hover:text-gold transition-colors">Términos</Link>
        </div>
      </div>
    </footer>
  );
}
