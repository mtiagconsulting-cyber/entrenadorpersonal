'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import MonthCalendar from '@/components/MonthCalendar'
import {
  getSessionsForDate, getPhaseForDate, DISCIPLINE_META, PHASE_META,
  PLAN_START, RACE_DATE, type PlannedSession,
} from '@/lib/calendar-plan'

function DayCell({ date, onSelect }: { date: Date; onSelect: (d: Date) => void }) {
  const sessions = getSessionsForDate(date)
  if (!sessions.length) return null
  return (
    <button onClick={() => onSelect(date)} className="w-full flex flex-col gap-0.5 text-left">
      {sessions.map((s, i) => {
        const m = DISCIPLINE_META[s.discipline]
        return (
          <div key={i} className="flex items-center gap-1 rounded px-1 py-0.5 text-[10px] font-medium truncate"
            style={{ background: `${m.color}22`, color: m.color }}>
            <span>{m.icon}</span>
            <span className="truncate hidden lg:inline">{m.label}</span>
          </div>
        )
      })}
    </button>
  )
}

export default function CalendarioPage() {
  const [selected, setSelected] = useState<Date | null>(new Date())
  const selSessions: PlannedSession[] = selected ? getSessionsForDate(selected) : []
  const selPhase = selected ? getPhaseForDate(selected) : null

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-black text-white">Calendario de Planificación</h1>
          <p className="text-gray-400 mt-1">Tu plan periodizado hasta el Ironman 70.3 Málaga · Toca un día para ver el detalle</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {(['Base', 'Construcción', 'Pico', 'Tapering'] as const).map(ph => (
            <div key={ph} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: PHASE_META[ph].bg, color: PHASE_META[ph].color }}>
              <span className="w-2 h-2 rounded-full" style={{ background: PHASE_META[ph].color }} />{ph}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MonthCalendar initialMonth={PLAN_START} renderDay={(d) => <DayCell date={d} onSelect={setSelected} />} />
            <p className="text-gray-600 text-xs mt-3">
              Plan activo: {PLAN_START.toLocaleDateString('es-ES')} → {RACE_DATE.toLocaleDateString('es-ES')} (día de carrera 🏆)
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={{ background: '#0e1626', border: '1px solid #1f2937' }}>
              <div className="text-gray-400 text-sm">
                {selected?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
              {selPhase && (
                <span className="inline-block mt-2 px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: PHASE_META[selPhase].bg, color: PHASE_META[selPhase].color }}>
                  Fase {selPhase}
                </span>
              )}
              <div className="mt-4 space-y-3">
                {selSessions.length ? selSessions.map((s, i) => {
                  const m = DISCIPLINE_META[s.discipline]
                  return (
                    <div key={i} className="rounded-xl p-3" style={{ background: '#111827', borderLeft: `3px solid ${m.color}` }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{m.icon}</span>
                          <span className="text-white font-semibold text-sm">{s.title}</span>
                        </div>
                        {s.durationMin > 0 && <span className="text-gray-400 text-xs">{s.durationMin} min</span>}
                      </div>
                      <div className="text-gray-400 text-xs mt-1.5">{s.detail}</div>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500">
                        <span>⏰ {s.timeHint}</span>
                        <span className="px-1.5 py-0.5 rounded" style={{ background: `${m.color}22`, color: m.color }}>{s.intensity}</span>
                      </div>
                    </div>
                  )
                }) : <p className="text-gray-600 text-sm">Sin sesiones planificadas este día.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
