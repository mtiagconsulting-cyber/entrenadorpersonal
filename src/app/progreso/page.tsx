'use client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts'
import { PLAN_START, RACE_DATE, getSessionsForDate, getPhaseForDate, DISCIPLINE_META } from '@/lib/calendar-plan'

// Volumen semanal planificado (horas) hasta la carrera
function plannedWeeklyVolume() {
  const out: { week: string; horas: number; fase: string }[] = []
  const cur = new Date(PLAN_START)
  while (cur <= RACE_DATE) {
    let min = 0
    for (let i = 0; i < 7; i++) {
      const d = new Date(cur); d.setDate(cur.getDate() + i)
      min += getSessionsForDate(d).reduce((s, x) => s + x.durationMin, 0)
    }
    out.push({
      week: cur.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
      horas: Math.round((min / 60) * 10) / 10,
      fase: getPhaseForDate(cur),
    })
    cur.setDate(cur.getDate() + 7)
  }
  return out
}

interface WeightEntry { date: string; kg: number }

export default function ProgresoPage() {
  const volume = plannedWeeklyVolume()
  const [weights, setWeights] = useState<WeightEntry[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('tricoach_weights')
    if (saved) setWeights(JSON.parse(saved))
    else setWeights([
      { date: '2026-06-01', kg: 67.5 },
      { date: '2026-06-15', kg: 67.0 },
      { date: '2026-06-30', kg: 66.8 },
    ])
  }, [])

  function addWeight() {
    const kg = parseFloat(input.replace(',', '.'))
    if (!kg || kg < 40 || kg > 150) return
    const entry = { date: new Date().toISOString().slice(0, 10), kg }
    const next = [...weights.filter(w => w.date !== entry.date), entry].sort((a, b) => a.date.localeCompare(b.date))
    setWeights(next)
    localStorage.setItem('tricoach_weights', JSON.stringify(next))
    setInput('')
  }

  const weightChart = weights.map(w => ({
    fecha: new Date(w.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
    kg: w.kg,
  }))

  const totalHours = volume.reduce((s, v) => s + v.horas, 0)
  const peakWeek = volume.reduce((a, b) => (b.horas > a.horas ? b : a), volume[0])

  const disciplineSplit = (() => {
    const acc: Record<string, number> = {}
    const cur = new Date(PLAN_START)
    while (cur <= RACE_DATE) {
      getSessionsForDate(cur).forEach(s => { acc[s.discipline] = (acc[s.discipline] ?? 0) + s.durationMin })
      cur.setDate(cur.getDate() + 1)
    }
    return Object.entries(acc)
      .filter(([k]) => k !== 'rest')
      .map(([k, v]) => ({ name: DISCIPLINE_META[k as keyof typeof DISCIPLINE_META].label, horas: Math.round(v / 60), color: DISCIPLINE_META[k as keyof typeof DISCIPLINE_META].color }))
      .sort((a, b) => b.horas - a.horas)
  })()

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-black text-white">Seguimiento de Mejora</h1>
          <p className="text-gray-400 mt-1">Tu evolución de peso y la carga de entrenamiento hacia el sub-5h</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Horas totales plan', value: `${Math.round(totalHours)}h`, color: 'text-amber-400', icon: '⏱️' },
            { label: 'Semana pico', value: `${peakWeek?.horas}h`, color: 'text-red-400', icon: '🔥' },
            { label: 'Peso actual', value: weights.length ? `${weights[weights.length - 1].kg} kg` : '—', color: 'text-blue-400', icon: '⚖️' },
            { label: 'Objetivo', value: 'sub-5h', color: 'text-green-400', icon: '🎯' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5" style={{ background: '#0e1626', border: '1px solid #1f2937' }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-gray-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Peso */}
          <div className="rounded-2xl p-6" style={{ background: '#0e1626', border: '1px solid #1f2937' }}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-white font-bold text-lg">⚖️ Evolución del peso</h2>
              <div className="flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="kg hoy"
                  className="w-24 px-3 py-1.5 rounded-lg text-sm text-white outline-none"
                  style={{ background: '#111827', border: '1px solid #374151' }} />
                <button onClick={addWeight} className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white"
                  style={{ background: '#fc5200' }}>Registrar</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={weightChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="fecha" stroke="#6b7280" fontSize={11} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#6b7280" fontSize={11} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8, color: '#fff' }} />
                <Line type="monotone" dataKey="kg" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribución por disciplina */}
          <div className="rounded-2xl p-6" style={{ background: '#0e1626', border: '1px solid #1f2937' }}>
            <h2 className="text-white font-bold text-lg mb-4">🏊🚴🏃 Reparto por disciplina (plan)</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={disciplineSplit} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
                <XAxis type="number" stroke="#6b7280" fontSize={11} />
                <YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={11} width={70} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8, color: '#fff' }} formatter={(v) => [`${v}h`, 'Volumen']} />
                <Bar dataKey="horas" radius={[0, 6, 6, 0]}>
                  {disciplineSplit.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volumen semanal */}
        <div className="rounded-2xl p-6" style={{ background: '#0e1626', border: '1px solid #1f2937' }}>
          <h2 className="text-white font-bold text-lg mb-1">📈 Carga semanal planificada</h2>
          <p className="text-gray-500 text-xs mb-4">Horas/semana hasta la carrera · sube en construcción/pico y baja en el tapering</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={volume}>
              <defs>
                <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fc5200" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#fc5200" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="week" stroke="#6b7280" fontSize={11} />
              <YAxis stroke="#6b7280" fontSize={11} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8, color: '#fff' }}
                formatter={(v) => [`${v}h`, 'Volumen']} labelFormatter={(l) => `Semana ${l}`} />
              <Area type="monotone" dataKey="horas" stroke="#fc5200" strokeWidth={2.5} fill="url(#vol)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
