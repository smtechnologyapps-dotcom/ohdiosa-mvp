"use client";

import { DollarSign, ExternalLink } from "lucide-react";

const mockReceivables = [
  { id: "ORD-9921", customer: "Elena R.", date: "2026-07-15", total: 4200, status: "Pending", dueDate: "2026-08-15" },
  { id: "ORD-9934", customer: "Valeria G.", date: "2026-07-18", total: 1550, status: "Pending", dueDate: "2026-08-18" },
  { id: "ORD-9880", customer: "Camila F.", date: "2026-06-20", total: 8900, status: "Overdue", dueDate: "2026-07-20" },
];

export default function ReceivablesPage() {
  const totalPending = mockReceivables.filter(r => r.status === 'Pending').reduce((acc, curr) => acc + curr.total, 0);
  const totalOverdue = mockReceivables.filter(r => r.status === 'Overdue').reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="border-b border-whisper pb-6">
        <h1 className="font-serif text-4xl text-gold mb-2">Cuentas por Cobrar</h1>
        <p className="text-steel font-sans text-sm">Administración de pagos pendientes y crédito de clientes.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-whisper p-6 flex items-center justify-between">
          <div>
            <span className="text-steel text-xs uppercase tracking-widest font-semibold block mb-2">Total Pendiente (Al día)</span>
            <p className="text-3xl text-ink font-mono">${totalPending.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-canvas border border-whisper flex items-center justify-center text-steel">
            <DollarSign size={24} />
          </div>
        </div>
        <div className="bg-surface border border-red-900/30 p-6 flex items-center justify-between">
          <div>
            <span className="text-red-400 text-xs uppercase tracking-widest font-semibold block mb-2">Total Vencido</span>
            <p className="text-3xl text-red-400 font-mono">${totalOverdue.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-950 border border-red-900 flex items-center justify-center text-red-400">
            <DollarSign size={24} />
          </div>
        </div>
      </div>

      {/* Receivables List */}
      <div className="bg-surface border border-whisper">
        <div className="p-4 border-b border-whisper">
          <h3 className="font-serif text-xl text-ink">Próximos Vencimientos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm border-collapse">
            <thead>
              <tr className="border-b border-whisper text-steel">
                <th className="p-4 font-normal uppercase tracking-widest text-xs">Orden</th>
                <th className="p-4 font-normal uppercase tracking-widest text-xs">Cliente</th>
                <th className="p-4 font-normal uppercase tracking-widest text-xs">Monto</th>
                <th className="p-4 font-normal uppercase tracking-widest text-xs">Fecha Emisión</th>
                <th className="p-4 font-normal uppercase tracking-widest text-xs">Vencimiento</th>
                <th className="p-4 font-normal uppercase tracking-widest text-xs">Estado</th>
                <th className="p-4 font-normal uppercase tracking-widest text-xs text-right">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {mockReceivables.map(r => (
                <tr key={r.id} className="border-b border-whisper/50 hover:bg-white/5 transition-colors group">
                  <td className="p-4 font-mono text-gold">{r.id}</td>
                  <td className="p-4 text-ink">{r.customer}</td>
                  <td className="p-4 font-mono">${r.total.toLocaleString()}</td>
                  <td className="p-4 font-mono text-steel">{r.date}</td>
                  <td className="p-4 font-mono text-steel">{r.dueDate}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center justify-center px-2 py-1 text-[10px] uppercase tracking-widest font-mono border ${
                      r.status === 'Pending' ? 'border-gold text-gold' : 'border-red-400 text-red-400'
                    }`}>
                      {r.status === 'Pending' ? 'Pendiente' : 'Vencido'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-steel hover:text-gold transition-colors inline-flex justify-end opacity-0 group-hover:opacity-100">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
