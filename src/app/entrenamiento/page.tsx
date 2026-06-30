'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { generateTrainingPlan, getWeeksUntilRace } from '@/lib/training-plan'
import { AthleteFitness, TrainingSession } from '@/types'

const defaultFitness: AthleteFitness = {
  swimBase: 'medium', bikeBase: 'high', runBase: 'medium',
  weeklyHours: 8.5, longestSwim: 1.8, longestRide: 85, longestRun: 18,
}

const phaseColors: Record<string, string> = {
  Base: 'bg-blue-900 text-blue-300',
  Construcción: 'bg-yellow-900 text-yellow-300',
  Pico: 'bg-red-900 text-red-300',
  Tapering: 'bg-green-900 text-green-300',
}

const typeIcons: Record<string, string> = {
  Natación: '🏊', Ciclismo: '🚴', Carrera: '🏃', Fuerza: '💪', Descanso: '😴', Ladrillo: '🔥'
}

const intensityColors: Record<string, string> = {
  Z1: 'text-gray-400', Z2: 'text-green-400', Z3: 'text-yellow-400', Z4: 'text-orange-400', Z5: 'text-red-400'
}

function SessionCard({ session }: { session: TrainingSession }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#1f2937', border: '1px solid #374151' }}>
      <button className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-700 transition-colors" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2">
          <span>{typeIcons[session.type] || '📋'}</span>
          <div>
            <div className="text-white text-sm font-medium">{session.day}</div>
            <div className="text-gray-400 text-xs">{session.type} {session.duration > 0 ? `· ${session.duration} min` : ''}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {session.intensity && <span className={`text-xs font-bold ${intensityColors[session.intensity]}`}>{session.intensity}</span>}
          <span className="text-gray-500 text-xs">{open ? '▲' : '▼'}</span>
        </div>
      </button>
      {open && (
        <div className="px-3 pb-3 border-t border-gray-700">
          <p className="text-gray-300 text-xs mt-2 mb-2">{session.description}</p>
          <ul className="space-y-1">
            {session.details.map((d, i) => (
              <li key={i} className="text-gray-400 text-xs flex items-start gap-1">
                <span className="text-blue-400 mt-0.5">•</span> {d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function Entrenamiento() {
  const plan = generateTrainingPlan(defaultFitness)
  const weeksToRace = getWeeksUntilRace()
  const [selectedWeek, setSelectedWeek] = useState(1)
  const currentWeekPlan = plan[selectedWeek - 1]

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-black text-white">Plan de Entrenamiento</h1>
          <p className="text-gray-400 mt-1">24 semanas periodizadas · {weeksToRace} semanas hasta el race</p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ background: '#0d1b35', border: '1px solid #1e3a5f', color: '#60a5fa' }}>
            🎯 Objetivo: terminar el 70.3 Málaga por debajo de 5h
          </div>
          <p className="text-gray-500 text-xs mt-2 max-w-xl">
            Ritmos orientativos para sub-5h: natación ~36-40 min (1:50/100m) · bici 2:30-2:40 (~33-35 km/h) · carrera 1:45-1:50 (~5:00-5:15/km). Con transiciones, margen para sub-5h.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {['Base', 'Construcción', 'Pico', 'Tapering'].map((ph, i) => {
            const weeks = ph === 'Base' ? '1-8' : ph === 'Construcción' ? '9-16' : ph === 'Pico' ? '17-21' : '22-24'
            const count = ph === 'Base' ? 8 : ph === 'Construcción' ? 8 : ph === 'Pico' ? 5 : 3
            return (
              <div key={ph} className="rounded-xl p-4 text-center" style={{ background: '#111827', border: '1px solid #1f2937' }}>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${phaseColors[ph]}`}>{ph}</div>
                <div className="text-gray-300 text-sm">Semanas {weeks}</div>
                <div className="text-gray-500 text-xs">{count} semanas</div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-4" style={{ background: '#111827', border: '1px solid #1f2937' }}>
            <h2 className="text-white font-bold mb-3 text-sm">Semanas</h2>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {plan.map(w => (
                <button
                  key={w.week}
                  onClick={() => setSelectedWeek(w.week)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-sm transition-colors ${
                    selectedWeek === w.week ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span>Semana {w.week}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{w.totalHours}h</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${phaseColors[w.phase]}`}>{w.phase.slice(0,4)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            {currentWeekPlan && (
              <>
                <div className="rounded-2xl p-5" style={{ background: '#111827', border: '1px solid #1f2937' }}>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-white font-bold text-lg">Semana {currentWeekPlan.week}</h2>
                    <span className={`text-sm px-3 py-1 rounded-full font-bold ${phaseColors[currentWeekPlan.phase]}`}>
                      {currentWeekPlan.phase}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm">{currentWeekPlan.totalHours}h totales esta semana</div>
                  {currentWeekPlan.week % 4 === 0 && (
                    <div className="mt-2 px-3 py-1.5 rounded-lg text-xs text-green-300 inline-block" style={{ background: '#1a2e1a' }}>
                      ✓ Semana de recuperación – volumen reducido al 65%
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {currentWeekPlan.sessions.map((session, i) => (
                    <SessionCard key={i} session={session} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: '#0d1b35', border: '1px solid #1e3a5f' }}>
          <h2 className="text-white font-bold mb-4">Zonas de entrenamiento (FC)</h2>
          <div className="grid grid-cols-5 gap-3">
            {[
              { zone: 'Z1', name: 'Recuperación', pct: '< 60%', color: 'text-gray-400', bg: '#1f2937' },
              { zone: 'Z2', name: 'Aeróbico base', pct: '60-70%', color: 'text-green-400', bg: '#1a2e1a' },
              { zone: 'Z3', name: 'Umbral aeróbico', pct: '70-80%', color: 'text-yellow-400', bg: '#2e2a00' },
              { zone: 'Z4', name: 'Umbral anaeróbico', pct: '80-90%', color: 'text-orange-400', bg: '#2e1a00' },
              { zone: 'Z5', name: 'VO2max', pct: '> 90%', color: 'text-red-400', bg: '#2e0000' },
            ].map(z => (
              <div key={z.zone} className="rounded-xl p-3 text-center" style={{ background: z.bg }}>
                <div className={`text-xl font-black ${z.color}`}>{z.zone}</div>
                <div className="text-white text-xs font-medium mt-1">{z.name}</div>
                <div className="text-gray-400 text-xs">{z.pct} FCmax</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
