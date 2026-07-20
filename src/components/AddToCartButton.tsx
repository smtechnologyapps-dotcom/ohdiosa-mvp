"use client";

import { useCart } from "@/lib/CartContext";

export function AddToCartButton({ product }: { product: { id: string, name: string, price: number, image: string } }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
      className="w-full bg-ink text-canvas hover:bg-gold transition-colors duration-500 py-5 text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-3 group"
    >
      Añadir a la Bolsa
      <span className="w-8 h-[1px] bg-canvas group-hover:w-12 transition-all duration-300"></span>
    </button>
  );
}
