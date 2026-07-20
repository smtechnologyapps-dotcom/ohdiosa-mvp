import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { products } from "@/lib/data";

const categoryTitles = {
  clothes: "Alta Costura",
  accessories: "Joyas y Accesorios",
  bags: "Bolsos Premium",
  shoes: "Calzado Escultural"
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category as keyof typeof products;
  const categoryProductsList = products[categoryId] || [];
  const title = categoryTitles[categoryId] || "Colección";

  return (
    <div className="min-h-screen bg-canvas animate-in fade-in duration-1000 pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <header className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-steel hover:text-gold transition-colors text-xs uppercase tracking-widest font-semibold mb-8">
            <ArrowLeft size={16} /> Volver a Inicio
          </Link>
          <h1 className="font-serif text-5xl md:text-7xl text-ink tracking-tight mb-4">
            {title}
          </h1>
          <div className="w-24 h-[1px] bg-gold"></div>
        </header>

        {categoryProductsList.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-steel font-sans">No hay piezas disponibles en esta colección actualmente.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {categoryProductsList.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group cursor-pointer flex flex-col">
                {/* Product Image */}
                <div className="w-full aspect-[3/4] bg-surface relative overflow-hidden mb-6 border border-transparent group-hover:border-gold/30 transition-colors duration-700">
                  <Image 
                    src={`/images/product_${categoryId}.jpg`} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 z-0" 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10 pointer-events-none"></div>
                </div>
                
                {/* Product Info */}
                <div className="flex flex-col flex-1">
                  <span className="text-steel text-[10px] uppercase tracking-widest mb-2">{product.category}</span>
                  <h3 className="font-serif text-lg text-ink group-hover:text-gold transition-colors">{product.name}</h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-mono text-ink">${product.price.toLocaleString()}</span>
                    <span className="text-xs uppercase font-semibold text-gold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Descubrir
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
