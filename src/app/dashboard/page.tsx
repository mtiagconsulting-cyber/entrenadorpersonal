'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const mockStats = {
  athlete: { name: 'Tu Nombre', city: 'Málaga', weeklyHours: 8.5 },
  fitness: { swimBase: 'medium', bikeBase: 'high', runBase: 'medium', weeklyHours: 8.5, longestSwim: 1.8, longestRide: 85, longestRun: 18 },
  recentActivities: [
    { id: 1, name: 'Rodaje matutino', type: 'Ride', distance: 52000, moving_time: 5400, sport_type: 'Ride', start_date: '2026-06-28', average_heartrate: 142 },
    { id: 2, name: 'Carrera por la playa', type: 'Run', distance: 12000, moving_time: 3600, sport_type: 'Run', start_date: '2026-06-27', average_heartrate: 155 },
    { id: 3, name: 'Natación piscina', type: 'Swim', distance: 2000, moving_time: 2400, sport_type: 'Swim', start_date: '2026-06-26', average_heartrate: 138 },
    { id: 4, name: 'Tirada larga bici', type: 'Ride', distance: 85000, moving_time: 10800, sport_type: 'Ride', start_date: '2026-06-24', average_heartrate: 148 },
    { id: 5, name: 'Rodaje largo', type: 'Run', distance: 18000, moving_time: 6300, sport_type: 'Run', start_date: '2026-06-22', average_heartrate: 152 },
  ],
}

const weeksToRace = Math.max(1, Math.ceil((new Date('2026-10-04').getTime() - Date.now()) / (7 * 24 * 60 * 60 * 1000)))

interface Activity {
  id: number
  name: string
  sport_type: string
  distance: number
  moving_time: number
  average_heartrate?: number
}
interface Fitness {
  swimBase: string; bikeBase: string; runBase: string
  weeklyHours: number; longestSwim: number; longestRide: number; longestRun: number
}

function ActivityIcon({ type }: { type: string }) {
  if (type === 'Swim') return <span className="text-blue-400">🏊</span>
  if (type === 'Ride') return <span className="text-amber-400">🚴</span>
  if (type === 'Run') return <span className="text-green-400">🏃</span>
  return <span>🏋️</span>
}

function LevelBadge({ level }: { level: string }) {
  const colors = { low: 'bg-red-900 text-red-300', medium: 'bg-yellow-900 text-yellow-300', high: 'bg-green-900 text-green-300' }
  const labels = { low: 'Por desarrollar', medium: 'Buena base', high: 'Sólida' }
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[level as keyof typeof colors]}`}>{labels[level as keyof typeof labels]}</span>
}

export default function Dashboard() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [athlete, setAthlete] = useState(mockStats.athlete)
  const [fitness, setFitness] = useState<Fitness>(mockStats.fitness as Fitness)
  const [recentActivities, setRecentActivities] = useState<Activity[]>(mockStats.recentActivities)

  async function connectGarmin() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/garmin/activities')
      const data = await res.json()
      if (!res.ok || data.connected === false) {
        setError(
          data.needsConfig
            ? 'Configura GARMIN_EMAIL y GARMIN_PASSWORD en tu archivo .env.local y reinicia el servidor.'
            : `No se pudo conectar con Garmin: ${data.error ?? 'error desconocido'}`
        )
        return
      }
      setFitness(data.fitness)
      setRecentActivities(data.recentActivities)
      if (data.athlete) {
        setAthlete({ name: `${data.athlete.firstname} ${data.athlete.lastname}`.trim(), city: data.athlete.city, weeklyHours: data.fitness.weeklyHours })
      }
      setConnected(true)
    } catch {
      setError('Error de red al contactar con la API de Garmin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              {connected ? `Hola ${athlete.name} · ` : 'Tu estado actual · '}
              {weeksToRace} semanas para el Ironman 70.3 Málaga
            </p>
          </div>
          {!connected ? (
            <button
              onClick={connectGarmin}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #007cc3, #00a8e8)' }}
            >
              <span>⌚</span> {loading ? 'Conectando…' : 'Conectar Garmin'}
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#1a2e1a', border: '1px solid #166534' }}>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-green-400 text-sm font-medium">Garmin conectado</span>
            </div>
          )}
        </div>

        {!connected && (
          <div className="rounded-2xl p-8 text-center" style={{ background: '#111827', border: '1px solid #007cc3' }}>
            <div className="text-5xl mb-4">⌚</div>
            <h2 className="text-xl font-bold text-white mb-2">Conecta tu Garmin para análisis personalizado</h2>
            <p className="text-gray-400 mb-6">Analizaré tus últimas actividades de Garmin Connect para calibrar tu plan de entrenamiento</p>
            <button
              onClick={connectGarmin}
              disabled={loading}
              className="px-8 py-4 rounded-xl font-bold text-white text-lg disabled:opacity-50"
              style={{ background: '#007cc3' }}
            >
              {loading ? 'Conectando…' : 'Conectar con Garmin Connect'}
            </button>
            {error && (
              <p className="text-red-400 text-sm mt-4 max-w-lg mx-auto">{error}</p>
            )}
            <p className="text-gray-600 text-xs mt-3">
              Tus credenciales (GARMIN_EMAIL / GARMIN_PASSWORD) se leen solo desde .env.local en tu equipo
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Semanas al race', value: weeksToRace, color: 'text-blue-400', icon: '📅' },
            { label: 'Horas/semana', value: fitness.weeklyHours, color: 'text-amber-400', icon: '⏱️' },
            { label: 'Longest ride (km)', value: fitness.longestRide, color: 'text-orange-400', icon: '🚴' },
            { label: 'Longest run (km)', value: fitness.longestRun, color: 'text-green-400', icon: '🏃' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-5" style={{ background: '#111827', border: '1px solid #1f2937' }}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6" style={{ background: '#111827', border: '1px solid #1f2937' }}>
            <h2 className="text-white font-bold text-lg mb-4">Evaluación de base actual</h2>
            <div className="space-y-4">
              {[
                { label: '🏊 Natación', level: fitness.swimBase, detail: `Máx: ${fitness.longestSwim} km · Objetivo: 1.9 km` },
                { label: '🚴 Ciclismo', level: fitness.bikeBase, detail: `Máx: ${fitness.longestRide} km · Objetivo: 90 km` },
                { label: '🏃 Carrera', level: fitness.runBase, detail: `Máx: ${fitness.longestRun} km · Objetivo: 21.1 km` },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#1f2937' }}>
                  <div>
                    <div className="text-white font-medium text-sm">{item.label}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{item.detail}</div>
                  </div>
                  <LevelBadge level={item.level} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{ background: '#111827', border: '1px solid #1f2937' }}>
            <h2 className="text-white font-bold text-lg mb-4">Actividades recientes {connected && <span className="text-xs text-blue-400 font-normal">(Garmin)</span>}</h2>
            <div className="space-y-3">
              {recentActivities.map(act => (
                <div key={act.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#1f2937' }}>
                  <div className="flex items-center gap-3">
                    <ActivityIcon type={act.sport_type} />
                    <div>
                      <div className="text-white text-sm font-medium">{act.name}</div>
                      <div className="text-gray-400 text-xs">
                        {(act.distance / 1000).toFixed(1)} km · {Math.round(act.moving_time / 60)} min
                      </div>
                    </div>
                  </div>
                  {act.average_heartrate && (
                    <div className="text-red-400 text-sm font-medium">{Math.round(act.average_heartrate)} bpm</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: '#0d1b35', border: '1px solid #1e3a5f' }}>
          <h2 className="text-white font-bold text-lg mb-4">Próximos pasos recomendados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/calendario" className="p-4 rounded-xl text-left hover:opacity-80 transition-opacity" style={{ background: '#111827', border: '1px solid #1f2937' }}>
              <div className="text-2xl mb-2">📅</div>
              <div className="text-white font-medium">Calendario de planificación</div>
              <div className="text-gray-400 text-sm mt-1">Tu plan periodizado día a día hasta Málaga</div>
            </Link>
            <Link href="/dietas" className="p-4 rounded-xl text-left hover:opacity-80 transition-opacity" style={{ background: '#111827', border: '1px solid #1f2937' }}>
              <div className="text-2xl mb-2">🥗</div>
              <div className="text-white font-medium">Calendario de dietas</div>
              <div className="text-gray-400 text-sm mt-1">Nutrición adaptada a la carga de cada día</div>
            </Link>
            <Link href="/progreso" className="p-4 rounded-xl text-left hover:opacity-80 transition-opacity" style={{ background: '#111827', border: '1px solid #1f2937' }}>
              <div className="text-2xl mb-2">📈</div>
              <div className="text-white font-medium">Seguimiento de mejora</div>
              <div className="text-gray-400 text-sm mt-1">Peso, volumen y evolución hacia el sub-5h</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
