'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { weeksUntilRace } from '@/lib/calendar-plan'

const links = [
  { href: '/dashboard', label: 'Inicio', icon: '🏠' },
  { href: '/calendario', label: 'Calendario', icon: '📅' },
  { href: '/dietas', label: 'Dietas', icon: '🥗' },
  { href: '/fuerza', label: 'Fuerza', icon: '🏋️' },
  { href: '/progreso', label: 'Progreso', icon: '📈' },
]

export default function Navbar() {
  const pathname = usePathname()
  const weeks = weeksUntilRace()
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md" style={{ background: 'rgba(10,15,30,0.85)', borderBottom: '1px solid #1f2937' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #fc5200, #ff8a00)' }}>🔥</div>
          <div className="hidden sm:block">
            <div className="font-black text-white text-sm leading-tight">TRI<span style={{ color: '#fc5200' }}>COACH</span></div>
            <div className="text-[10px] text-gray-500 leading-tight">{weeks} sem · 70.3 Málaga</div>
          </div>
        </Link>

        <div className="flex gap-1">
          {links.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  active ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                }`}
                style={active ? { background: 'linear-gradient(135deg, #fc5200, #ff7a00)' } : undefined}
              >
                <span>{link.icon}</span>
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
