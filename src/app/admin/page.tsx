export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="flex justify-between items-end border-b border-whisper pb-6">
        <div>
          <h1 className="font-serif text-4xl text-gold mb-2">Resumen General</h1>
          <p className="text-steel font-sans text-sm">Vista ejecutiva de OHDIOSA E-Commerce.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {/* KPI Cards */}
        <div className="bg-surface border border-whisper p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
          <span className="text-steel text-xs uppercase tracking-widest font-semibold block mb-4">Ventas del Mes</span>
          <p className="text-3xl text-ink font-mono">$124,500</p>
          <span className="text-[10px] text-green-500 font-mono mt-2 block">+12.5% vs mes anterior</span>
        </div>

        <div className="bg-surface border border-whisper p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
          <span className="text-steel text-xs uppercase tracking-widest font-semibold block mb-4">Cuentas por Cobrar</span>
          <p className="text-3xl text-gold font-mono">$32,100</p>
          <span className="text-[10px] text-steel font-mono mt-2 block">14 pedidos pendientes de pago</span>
        </div>

        <div className="bg-surface border border-whisper p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
          <span className="text-steel text-xs uppercase tracking-widest font-semibold block mb-4">Inventario Bajo</span>
          <p className="text-3xl text-red-400 font-mono">8</p>
          <span className="text-[10px] text-steel font-mono mt-2 block">SKUs requieren reabastecimiento</span>
        </div>
      </div>
    </div>
  );
}
