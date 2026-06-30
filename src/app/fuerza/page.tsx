'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { STRENGTH_PROGRAMS, getStrengthWorkoutForWeek } from '@/lib/strength'
import { StrengthWorkout, StrengthExercise } from '@/types'

const phases = ['Base', 'Construcción', 'Pico', 'Tapering']

function ExerciseRow({ ex }: { ex: StrengthExercise }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#1f2937' }}>
      <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-700 transition-colors" onClick={() => setOpen(!open)}>
        <div>
          <div className="text-white font-medium text-sm">{ex.name}</div>
          <div className="text-gray-400 text-xs mt-0.5">{ex.sets} series × {ex.reps} · Descanso {ex.rest}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 flex-wrap justify-end max-w-32">
            {ex.muscles.slice(0, 2).map(m => (
              <span key={m} className="text-xs px-1.5 py-0.5 rounded bg-blue-900 text-blue-300">{m}</span>
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-2">{open ? '▲' : '▼'}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-700">
          <div className="mt-3 flex flex-wrap gap-1 mb-2">
            {ex.muscles.map(m => (
              <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-blue-900 text-blue-300">{m}</span>
            ))}
          </div>
          <p className="text-amber-300 text-xs">{ex.notes}</p>
        </div>
      )}
    </div>
  )
}

function WorkoutCard({ workout }: { workout: StrengthWorkout }) {
  return (
    <div className="rounded-2xl p-5 space-y-4" style={{ background: '#111827', border: '1px solid #1f2937' }}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white font-bold">{workout.name}</h3>
          <p className="text-gray-400 text-sm mt-0.5">{workout.focus}</p>
        </div>
        <div className="text-right">
          <div className="text-amber-400 font-bold">{workout.duration} min</div>
          <div className="text-gray-500 text-xs">duración</div>
        </div>
      </div>
      <div className="space-y-2">
        {workout.exercises.map((ex, i) => <ExerciseRow key={i} ex={ex} />)}
      </div>
    </div>
  )
}

export default function Fuerza() {
  const [selectedPhase, setSelectedPhase] = useState('Base')
  const workouts = STRENGTH_PROGRAMS[selectedPhase] || []

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-black text-white">Programa de Fuerza</h1>
          <p className="text-gray-400 mt-1">2 sesiones/semana · Fuerza funcional para triatlón</p>
        </div>

        <div className="rounded-2xl p-5" style={{ background: '#0d1b35', border: '1px solid #1e3a5f' }}>
          <h2 className="text-white font-bold mb-3">Por qué entrenar fuerza para un Ironman 70.3</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: '⚡', title: 'Más potencia en bici', desc: 'Glúteos y cuádriceps fuertes = más vatios con menos esfuerzo' },
              { icon: '🦵', title: 'Economía de carrera', desc: 'Isquios y glúteos fuertes mejoran la zancada y reducen gasto energético' },
              { icon: '🏊', title: 'Tracción en natación', desc: 'Dorsales y core potentes = brazada más eficiente' },
              { icon: '🛡️', title: 'Prevención lesiones', desc: 'Estabilidad de rodilla, cadera y hombro bajo fatiga acumulada' },
            ].map(item => (
              <div key={item.title} className="p-3 rounded-xl" style={{ background: '#111827' }}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-white text-sm font-medium">{item.title}</div>
                <div className="text-gray-400 text-xs mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          {phases.map(ph => (
            <button
              key={ph}
              onClick={() => setSelectedPhase(ph)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                selectedPhase === ph ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              style={selectedPhase !== ph ? { background: '#111827' } : {}}
            >
              {ph}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workouts.map((workout, i) => <WorkoutCard key={i} workout={workout} />)}
        </div>

        <div className="rounded-2xl p-6" style={{ background: '#111827', border: '1px solid #1f2937' }}>
          <h2 className="text-white font-bold mb-4">Principios clave del programa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Periodización', desc: 'Base → Construcción → Pico → Tapering. La fuerza se reduce a medida que aumenta el volumen de triatlón para evitar la fatiga acumulada.' },
              { title: 'Timing', desc: 'Realiza fuerza tras natación o el día siguiente. Nunca antes de una sesión clave de bici o carrera. Lunes (tras descanso) y miércoles funcionan bien.' },
              { title: 'Progresión', desc: 'Incrementa 2.5-5 kg por semana en ejercicios principales. Cuando puedas hacer las series fácil, sube carga. Prioriza técnica sobre peso.' },
            ].map(item => (
              <div key={item.title} className="p-4 rounded-xl" style={{ background: '#1f2937' }}>
                <div className="text-amber-400 font-bold text-sm mb-2">{item.title}</div>
                <div className="text-gray-300 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
