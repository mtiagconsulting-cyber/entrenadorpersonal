'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/entrenamiento', label: 'Plan Entrenamiento' },
  { href: '/fuerza', label: 'Fuerza' },
  { href: '/nutricion', label: 'Nutrición' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">🏊🚴🏃</span>
          <div>
            <div className="font-bold text-white text-sm">Ironman 70.3 Málaga 2026</div>
            <div className="text-xs text-gray-400">Entrenador Personal & Dietista</div>
          </div>
        </Link>
        <div className="flex gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
