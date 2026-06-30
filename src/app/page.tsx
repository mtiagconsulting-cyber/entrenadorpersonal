import Link from 'next/link'
import { weeksUntilRace } from '@/lib/calendar-plan'

export default function Home() {
  const weeks = weeksUntilRace()

  const features = [
    { href: '/calendario', icon: '📅', title: 'Calendario de planificación', desc: 'Tu plan periodizado día a día hasta Málaga', color: '#3b82f6' },
    { href: '/dietas', icon: '🥗', title: 'Calendario de dietas', desc: 'Nutrición adaptada a la carga de cada día', color: '#34d399' },
    { href: '/progreso', icon: '📈', title: 'Seguimiento de mejora', desc: 'Peso, volumen y evolución hacia el sub-5h', color: '#fc5200' },
    { href: '/fuerza', icon: '🏋️', title: 'Programa de fuerza', desc: 'Fuerte y fibrado sin perder ligereza', color: '#a78bfa' },
  ]

  return (
    <main className="min-h-screen" style={{ background: 'radial-gradient(900px 500px at 70% -10%, rgba(252,82,0,0.18), transparent), linear-gradient(180deg, #0a0f1e, #0a0f1e)' }}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(252,82,0,0.12)', color: '#fc7a33', border: '1px solid rgba(252,82,0,0.3)' }}>
            🔥 {weeks} semanas para la carrera
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
            TRI<span style={{ color: '#fc5200' }}>COACH</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-xl mx-auto">
            Tu entrenador personal y dietista para el <span className="text-white font-semibold">Ironman 70.3 Málaga 2026</span>. Fuerte, fibrado y por debajo de 5 horas.
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-4">
            {[
              { v: '1.9 km', l: 'Natación', c: '#38bdf8' },
              { v: '90 km', l: 'Ciclismo', c: '#fb923c' },
              { v: '21.1 km', l: 'Carrera', c: '#34d399' },
            ].map(d => (
              <div key={d.l} className="rounded-2xl p-4" style={{ background: '#0e1626', border: '1px solid #1f2937' }}>
                <div className="text-xl font-black" style={{ color: d.c }}>{d.v}</div>
                <div className="text-gray-500 text-xs">{d.l}</div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link href="/dashboard" className="inline-block px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #fc5200, #ff8a00)' }}>
              Entrar al panel →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
          {features.map(f => (
            <Link key={f.href} href={f.href}
              className="group rounded-2xl p-6 transition-all hover:scale-[1.01]"
              style={{ background: '#0e1626', border: '1px solid #1f2937' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${f.color}1a` }}>{f.icon}</div>
                <div>
                  <div className="text-white font-bold group-hover:text-orange-400 transition-colors">{f.title}</div>
                  <div className="text-gray-400 text-sm mt-1">{f.desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
