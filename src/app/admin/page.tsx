"use client";

import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data structure for different timeframes
const mockData = {
  "7D": {
    kpis: {
      ventas: "$34,200", ventasTrend: "+5.2%",
      rotacion: "4.2 días", rotacionTrend: "-1.1%",
      cobrar: "$12,400", cobrarTrend: "+2.0%",
      ticket: "$1,850", ticketTrend: "+8.4%",
      conversion: "3.2%", conversionTrend: "+0.5%",
      stockBajo: "3", stockBajoTrend: "urgente",
      recurrentes: "42%", recurrentesTrend: "+2.1%"
    },
    chart: [
      { name: "Lun", ventas: 4000, cobros: 2400 },
      { name: "Mar", ventas: 3000, cobros: 1398 },
      { name: "Mie", ventas: 2000, cobros: 9800 },
      { name: "Jue", ventas: 2780, cobros: 3908 },
      { name: "Vie", ventas: 1890, cobros: 4800 },
      { name: "Sab", ventas: 2390, cobros: 3800 },
      { name: "Dom", ventas: 3490, cobros: 4300 },
    ]
  },
  "30D": {
    kpis: {
      ventas: "$124,500", ventasTrend: "+12.5%",
      rotacion: "18 días", rotacionTrend: "-3.4%",
      cobrar: "$32,100", cobrarTrend: "-5.0%",
      ticket: "$1,620", ticketTrend: "+4.1%",
      conversion: "2.8%", conversionTrend: "+0.2%",
      stockBajo: "8", stockBajoTrend: "atención",
      recurrentes: "38%", recurrentesTrend: "+5.4%"
    },
    chart: [
      { name: "Sem 1", ventas: 24000, cobros: 18000 },
      { name: "Sem 2", ventas: 32000, cobros: 21000 },
      { name: "Sem 3", ventas: 28000, cobros: 29000 },
      { name: "Sem 4", ventas: 40500, cobros: 32000 },
    ]
  },
  "YTD": {
    kpis: {
      ventas: "$845,200", ventasTrend: "+24.0%",
      rotacion: "45 días", rotacionTrend: "-8.2%",
      cobrar: "$95,000", cobrarTrend: "-12.0%",
      ticket: "$1,450", ticketTrend: "+15.2%",
      conversion: "2.4%", conversionTrend: "+0.8%",
      stockBajo: "12", stockBajoTrend: "estable",
      recurrentes: "45%", recurrentesTrend: "+12.0%"
    },
    chart: [
      { name: "Ene", ventas: 85000, cobros: 70000 },
      { name: "Feb", ventas: 92000, cobros: 81000 },
      { name: "Mar", ventas: 110000, cobros: 95000 },
      { name: "Abr", ventas: 105000, cobros: 89000 },
      { name: "May", ventas: 125000, cobros: 110000 },
      { name: "Jun", ventas: 145000, cobros: 120000 },
    ]
  }
};

type TimeFrame = keyof typeof mockData;

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState<TimeFrame>("30D");
  const data = mockData[timeframe];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end border-b border-whisper pb-6 gap-6">
        <div>
          <h1 className="font-serif text-4xl text-gold mb-2">Panel de Control Global</h1>
          <p className="text-steel font-sans text-sm">Visión ejecutiva centralizada de OHDIOSA E-Commerce.</p>
        </div>
        
        {/* Global Time Filter */}
        <div className="flex bg-surface border border-whisper p-1 rounded-sm w-fit">
          {(["7D", "30D", "YTD"] as TimeFrame[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                timeframe === tf 
                  ? "bg-gold text-canvas" 
                  : "text-steel hover:text-gold"
              }`}
            >
              {tf === "YTD" ? "Año Actual" : `Últimos ${tf}`}
            </button>
          ))}
        </div>
      </header>

      {/* 7 KPIs Grid (Bento Style) */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={timeframe}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-sans grid-flow-dense"
        >
          {/* 1. Ventas Mensuales (Col Span 2) */}
          <div className="bg-surface border border-whisper p-6 relative overflow-hidden group col-span-1 md:col-span-2">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
            <span className="text-steel text-xs uppercase tracking-widest font-semibold block mb-4">Ingresos Brutos</span>
            <p className="text-4xl text-ink font-mono">{data.kpis.ventas}</p>
            <span className="text-[11px] text-green-500 font-mono mt-2 block">{data.kpis.ventasTrend} vs periodo anterior</span>
          </div>

          {/* 2. Cuentas por Cobrar */}
          <div className="bg-surface border border-whisper p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
            <span className="text-steel text-xs uppercase tracking-widest font-semibold block mb-4">Cuentas por Cobrar</span>
            <p className="text-3xl text-gold font-mono">{data.kpis.cobrar}</p>
            <span className="text-[10px] text-steel font-mono mt-2 block">{data.kpis.cobrarTrend} tendencia</span>
          </div>

          {/* 3. Rotación de Inventario */}
          <div className="bg-surface border border-whisper p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
            <span className="text-steel text-xs uppercase tracking-widest font-semibold block mb-4">Rotación Inventario</span>
            <p className="text-3xl text-ink font-mono">{data.kpis.rotacion}</p>
            <span className="text-[10px] text-green-500 font-mono mt-2 block">{data.kpis.rotacionTrend} mejora</span>
          </div>

          {/* 4. Ticket Promedio */}
          <div className="bg-surface border border-whisper p-6 relative overflow-hidden group">
            <span className="text-steel text-xs uppercase tracking-widest font-semibold block mb-4">Ticket Promedio</span>
            <p className="text-2xl text-ink font-mono">{data.kpis.ticket}</p>
            <span className="text-[10px] text-green-500 font-mono mt-2 block">{data.kpis.ticketTrend}</span>
          </div>

          {/* 5. Tasa de Conversión */}
          <div className="bg-surface border border-whisper p-6 relative overflow-hidden group">
            <span className="text-steel text-xs uppercase tracking-widest font-semibold block mb-4">Conversión</span>
            <p className="text-2xl text-ink font-mono">{data.kpis.conversion}</p>
            <span className="text-[10px] text-green-500 font-mono mt-2 block">{data.kpis.conversionTrend}</span>
          </div>

          {/* 6. Clientes Recurrentes */}
          <div className="bg-surface border border-whisper p-6 relative overflow-hidden group">
            <span className="text-steel text-xs uppercase tracking-widest font-semibold block mb-4">Retención</span>
            <p className="text-2xl text-ink font-mono">{data.kpis.recurrentes}</p>
            <span className="text-[10px] text-green-500 font-mono mt-2 block">{data.kpis.recurrentesTrend}</span>
          </div>

          {/* 7. Alertas Stock Bajo */}
          <div className="bg-surface border border-whisper p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-500/5 transition-colors group-hover:bg-red-500/10"></div>
            <span className="text-steel text-xs uppercase tracking-widest font-semibold block mb-4 relative z-10">Alertas Stock</span>
            <p className="text-2xl text-red-400 font-mono relative z-10">{data.kpis.stockBajo}</p>
            <span className="text-[10px] text-red-400 font-mono mt-2 block uppercase relative z-10">{data.kpis.stockBajoTrend}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main Dynamic Chart */}
      <section className="bg-surface border border-whisper p-6 mt-4">
        <header className="mb-8">
          <h3 className="font-serif text-2xl text-gold">Tendencia: Ventas vs. Cobros</h3>
          <p className="text-steel font-sans text-xs uppercase tracking-widest mt-2">Expresado en USD</p>
        </header>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.chart}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#A1A1AA" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#A1A1AA" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: '#27272A', opacity: 0.4 }}
                contentStyle={{ 
                  backgroundColor: '#09090B', 
                  border: '1px solid #27272A',
                  borderRadius: '4px',
                  color: '#FAFAFA'
                }}
                itemStyle={{ color: '#D4AF37' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
                iconType="circle"
              />
              <Bar 
                dataKey="ventas" 
                name="Ingresos por Ventas" 
                fill="#D4AF37" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
              <Bar 
                dataKey="cobros" 
                name="Cuentas por Cobrar" 
                fill="#FAFAFA" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
