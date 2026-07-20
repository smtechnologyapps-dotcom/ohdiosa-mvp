import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

// Mock data (In production, this would fetch from Firebase)
const categoryProducts = {
  clothes: [
    { id: 1, name: "Vestido Asimétrico Noir", price: 1200, category: "Alta Costura" },
    { id: 2, name: "Blazer Estructurado Oro", price: 1550, category: "Sastrería" },
    { id: 3, name: "Pantalón Seda Canvas", price: 920, category: "Pantalones" },
    { id: 4, name: "Abrigo Oversize Lana", price: 2100, category: "Abrigos" },
  ],
  accessories: [
    { id: 5, name: "Collar Champagne", price: 890, category: "Joyería Fina" },
    { id: 6, name: "Brazalete Geométrico", price: 1100, category: "Joyería Fina" },
    { id: 7, name: "Gafas Dark Acetato", price: 450, category: "Gafas" },
  ],
  bags: [
    { id: 8, name: "Bolso Tote Estructurado", price: 1800, category: "Bolsos de Mano" },
    { id: 9, name: "Clutch Oro Macizo", price: 3200, category: "Noche" },
  ],
  shoes: [
    { id: 10, name: "Botas Altas Cuero", price: 1450, category: "Botas" },
    { id: 11, name: "Stilettos Asimétricos", price: 980, category: "Tacones" },
  ]
};

const categoryTitles = {
  clothes: "Alta Costura",
  accessories: "Joyas y Accesorios",
  bags: "Bolsos Premium",
  shoes: "Calzado Escultural"
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category as keyof typeof categoryProducts;
  const products = categoryProducts[categoryId] || [];
  const title = categoryTitles[categoryId] || "Colección";

  return (
    <div className="min-h-screen bg-canvas animate-in fade-in duration-1000 pt-12 pb-24">
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

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-steel font-sans">No hay piezas disponibles en esta colección actualmente.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product, idx) => (
              <div key={product.id} className="group cursor-pointer flex flex-col">
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
                      Ver Pieza
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
