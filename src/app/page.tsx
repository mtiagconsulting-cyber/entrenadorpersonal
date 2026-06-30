import Link from 'next/link'

function weeksUntilRace() {
  const raceDate = new Date('2026-10-04')
  const today = new Date()
  return Math.max(1, Math.ceil((raceDate.getTime() - today.getTime()) / (7 * 24 * 60 * 60 * 1000)))
}

export default function Home() {
  const weeks = weeksUntilRace()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b35 50%, #0a0f1e 100%)' }}>
      <div className="max-w-3xl w-full text-center space-y-8">

        <div className="space-y-4">
          <div className="text-6xl mb-6">🏊🚴🏃</div>
          <h1 className="text-5xl font-black text-white tracking-tight">
            Ironman 70.3 <span className="text-blue-400">Málaga 2026</span>
          </h1>
          <p className="text-xl text-gray-300">
            Tu entrenador personal y dietista para cruzar la línea de meta
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 my-8">
          <div className="rounded-2xl p-6 text-center" style={{ background: '#111827', border: '1px solid #1f2937' }}>
            <div className="text-4xl font-black text-blue-400">{weeks}</div>
            <div className="text-gray-400 text-sm mt-1">Semanas hasta la carrera</div>
          </div>
          <div className="rounded-2xl p-6 text-center" style={{ background: '#111827', border: '1px solid #1f2937' }}>
            <div className="text-4xl font-black text-amber-400">70.3</div>
            <div className="text-gray-400 text-sm mt-1">Millas de competición</div>
          </div>
          <div className="rounded-2xl p-6 text-center" style={{ background: '#111827', border: '1px solid #1f2937' }}>
            <div className="text-4xl font-black text-green-400">3</div>
            <div className="text-gray-400 text-sm mt-1">Disciplinas a dominar</div>
          </div>
        </div>

        <div className="rounded-2xl p-6 text-left" style={{ background: '#0d1b35', border: '1px solid #1e3a5f' }}>
          <h2 className="text-white font-bold mb-3">📍 Distancias Ironman 70.3</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">1.9 km</div>
              <div className="text-gray-400 text-sm">Natación</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">90 km</div>
              <div className="text-gray-400 text-sm">Ciclismo</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">21.1 km</div>
              <div className="text-gray-400 text-sm">Media maratón</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}
          >
            Conectar con Strava y ver mi estado →
          </Link>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/entrenamiento" className="py-3 rounded-xl text-sm font-medium text-center text-gray-300 hover:text-white transition-colors" style={{ background: '#1f2937' }}>
              📅 Plan Entrenamiento
            </Link>
            <Link href="/fuerza" className="py-3 rounded-xl text-sm font-medium text-center text-gray-300 hover:text-white transition-colors" style={{ background: '#1f2937' }}>
              💪 Programa Fuerza
            </Link>
            <Link href="/nutricion" className="py-3 rounded-xl text-sm font-medium text-center text-gray-300 hover:text-white transition-colors" style={{ background: '#1f2937' }}>
              🥗 Plan Nutricional
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
