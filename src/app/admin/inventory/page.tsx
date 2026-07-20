"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";

const mockInventory = [
  { id: "SKU-001", name: "Vestido Asimétrico Noir", category: "Clothes", price: 1200, stock: 12, status: "Normal" },
  { id: "SKU-002", name: "Blazer Estructurado Oro", category: "Clothes", price: 1550, stock: 3, status: "Low" },
  { id: "SKU-003", name: "Collar Champagne", category: "Accessories", price: 890, stock: 0, status: "Out" },
  { id: "SKU-004", name: "Pantalón Seda Canvas", category: "Clothes", price: 920, stock: 24, status: "Normal" },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-whisper pb-6 gap-4">
        <div>
          <h1 className="font-serif text-4xl text-gold mb-2">Inventario Automático</h1>
          <p className="text-steel font-sans text-sm">Gestión de existencias y control de productos.</p>
        </div>
        <button className="flex items-center gap-2 bg-gold text-canvas px-6 py-3 font-sans text-xs uppercase tracking-widest hover:bg-gold-muted transition-colors font-semibold">
          <Plus size={16} /> Agregar Producto
        </button>
      </header>

      {/* Controls */}
      <div className="flex justify-between items-center bg-surface border border-whisper p-4">
        <div className="flex items-center gap-3 w-full max-w-md bg-canvas border border-whisper px-4 py-2 focus-within:border-gold transition-colors">
          <Search size={16} className="text-steel" />
          <input 
            type="text" 
            placeholder="Buscar por SKU o Nombre..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-ink font-sans placeholder:text-steel"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-whisper overflow-x-auto">
        <table className="w-full text-left font-sans text-sm border-collapse">
          <thead>
            <tr className="border-b border-whisper text-steel">
              <th className="p-4 font-normal uppercase tracking-widest text-xs">SKU</th>
              <th className="p-4 font-normal uppercase tracking-widest text-xs">Producto</th>
              <th className="p-4 font-normal uppercase tracking-widest text-xs">Categoría</th>
              <th className="p-4 font-normal uppercase tracking-widest text-xs">Precio</th>
              <th className="p-4 font-normal uppercase tracking-widest text-xs">Stock</th>
              <th className="p-4 font-normal uppercase tracking-widest text-xs">Estado</th>
              <th className="p-4 font-normal uppercase tracking-widest text-xs text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockInventory.map(item => (
              <tr key={item.id} className="border-b border-whisper/50 hover:bg-white/5 transition-colors group">
                <td className="p-4 font-mono text-steel">{item.id}</td>
                <td className="p-4 text-ink">{item.name}</td>
                <td className="p-4 text-steel">{item.category}</td>
                <td className="p-4 font-mono">${item.price}</td>
                <td className="p-4 font-mono">{item.stock}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center justify-center px-2 py-1 text-[10px] uppercase tracking-widest font-mono border ${
                    item.status === 'Normal' ? 'border-steel/50 text-steel' :
                    item.status === 'Low' ? 'border-gold text-gold' :
                    'border-red-400 text-red-400'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-steel hover:text-gold transition-colors"><Edit2 size={16} /></button>
                    <button className="text-steel hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
