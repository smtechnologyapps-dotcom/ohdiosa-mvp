import Link from "next/link";
import { Package, DollarSign, LayoutDashboard, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-whisper bg-surface flex flex-col fixed h-full z-40 pt-24 pb-8 px-6">
        <div className="flex-1 flex flex-col gap-2 font-sans">
          <span className="text-xs text-steel uppercase tracking-widest font-semibold mb-4 px-3">
            Dashboard
          </span>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm text-steel hover:text-gold hover:bg-white/5 rounded-md transition-colors">
            <LayoutDashboard size={18} /> Resumen
          </Link>
          <Link href="/admin/inventory" className="flex items-center gap-3 px-3 py-2 text-sm text-steel hover:text-gold hover:bg-white/5 rounded-md transition-colors">
            <Package size={18} /> Inventario Automático
          </Link>
          <Link href="/admin/receivables" className="flex items-center gap-3 px-3 py-2 text-sm text-steel hover:text-gold hover:bg-white/5 rounded-md transition-colors">
            <DollarSign size={18} /> Cuentas por Cobrar
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-steel hover:text-gold hover:bg-white/5 rounded-md transition-colors">
            <Settings size={18} /> Configuración
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <div className="flex-1 ml-64 p-8 pt-24 min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
