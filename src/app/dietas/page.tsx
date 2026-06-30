'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import MonthCalendar from '@/components/MonthCalendar'
import {
  getDayTypeForDate, getMenuForLoad, LOAD_COLORS, PLAN_START, type DayType,
} from '@/lib/calendar-plan'

function DietCell({ date, onSelect }: { date: Date; onSelect: (d: Date) => void }) {
  const dt = getDayTypeForDate(date)
  if (!dt) return null
  return (
    <button onClick={() => onSelect(date)} className="w-full text-left">
      <div className="rounded px-1 py-0.5 text-[10px] font-semibold truncate flex items-center gap-1"
        style={{ background: `${LOAD_COLORS[dt.load]}22`, color: LOAD_COLORS[dt.load] }}>
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: LOAD_COLORS[dt.load] }} />
        <span className="truncate">{dt.calories} kcal</span>
      </div>
    </button>
  )
}

function Macro({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <div className="rounded-xl p-3 text-center" style={{ background: '#111827' }}>
      <div className="text-lg font-black" style={{ color }}>{value}{unit}</div>
      <div className="text-gray-500 text-[11px]">{label}</div>
    </div>
  )
}

export default function DietasPage() {
  const [selected, setSelected] = useState<Date | null>(new Date())
  const dt: DayType | null = selected ? getDayTypeForDate(selected) : null
  const menu = dt ? getMenuForLoad(dt.load) : []

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-black text-white">Calendario de Dietas</h1>
          <p className="text-gray-400 mt-1">La nutrición se adapta a la carga de cada día · 67 kg · 2 g/kg de proteína</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {(['alta', 'media', 'baja', 'descanso'] as const).map(l => (
            <div key={l} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: `${LOAD_COLORS[l]}22`, color: LOAD_COLORS[l] }}>
              <span className="w-2 h-2 rounded-full" style={{ background: LOAD_COLORS[l] }} />Carga {l}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MonthCalendar initialMonth={PLAN_START} renderDay={(d) => <DietCell date={d} onSelect={setSelected} />} />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={{ background: '#0e1626', border: '1px solid #1f2937' }}>
              <div className="text-gray-400 text-sm">
                {selected?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
              {dt ? (
                <>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white font-bold">{dt.label}</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: `${LOAD_COLORS[dt.load]}22`, color: LOAD_COLORS[dt.load] }}>{dt.calories} kcal</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{dt.focus}</p>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <Macro label="Proteína" value={dt.protein} unit="g" color="#60a5fa" />
                    <Macro label="Carbos" value={dt.carbs} unit="g" color="#fbbf24" />
                    <Macro label="Grasas" value={dt.fat} unit="g" color="#34d399" />
                  </div>

                  <div className="mt-4 space-y-2">
                    {menu.map((m, i) => (
                      <div key={i} className="rounded-xl p-3" style={{ background: '#111827' }}>
                        <div className="text-white text-xs font-semibold">{m.meal}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{m.food}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : <p className="text-gray-600 text-sm mt-3">Fuera del periodo del plan.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
