import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Truck } from "lucide-react";
import { getProductById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-canvas animate-in fade-in duration-1000 pt-12 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <header className="mb-12">
          <Link href={`/categories/${product.image}`} className="inline-flex items-center gap-2 text-steel hover:text-gold transition-colors text-xs uppercase tracking-widest font-semibold mb-8">
            <ArrowLeft size={16} /> Volver a {product.category}
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Product Image */}
          <div className="w-full aspect-[3/4] md:aspect-square lg:aspect-[3/4] bg-surface relative overflow-hidden border border-whisper">
            <Image 
              src={`/images/product_${product.image}.jpg`} 
              alt={product.name} 
              fill 
              className="object-cover" 
              priority
            />
          </div>

          {/* Right: Product Details & Emotional Connection */}
          <div className="flex flex-col h-full justify-center">
            <span className="text-steel text-[10px] uppercase tracking-widest mb-4 block">Colección {product.category}</span>
            <h1 className="font-serif text-4xl md:text-5xl text-gold mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="font-mono text-2xl text-ink mb-12">${product.price.toLocaleString()}</p>
            
            {/* The Emotional Connection Description */}
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-steel font-sans text-base leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-3 text-sm text-steel">
                <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                  <Check size={14} />
                </div>
                <span>Autenticidad garantizada OMNEX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-steel">
                <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                  <Truck size={14} />
                </div>
                <span>Envío asegurado en transporte blindado (24h)</span>
              </div>
            </div>

            <button className="w-full bg-ink text-canvas hover:bg-gold transition-colors duration-500 py-5 text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-3 group">
              Añadir a la Bolsa
              <span className="w-8 h-[1px] bg-canvas group-hover:w-12 transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
