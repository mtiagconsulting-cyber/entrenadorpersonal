'use client'
import { useState } from 'react'

interface MonthCalendarProps {
  renderDay: (date: Date) => React.ReactNode
  initialMonth?: Date
}

const DOW = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export default function MonthCalendar({ renderDay, initialMonth }: MonthCalendarProps) {
  const [cursor, setCursor] = useState(() => {
    const d = initialMonth ?? new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const cells: (Date | null)[] = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#0e1626', border: '1px solid #1f2937' }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #1f2937' }}>
        <button
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >‹</button>
        <h2 className="text-white font-bold text-lg">{MONTHS[month]} {year}</h2>
        <button
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >›</button>
      </div>

      <div className="grid grid-cols-7 px-2 pt-2">
        {DOW.map(d => (
          <div key={d} className="text-center text-xs font-semibold text-gray-500 py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 p-2">
        {cells.map((date, i) => {
          if (!date) return <div key={i} className="min-h-24" />
          const isToday = date.getTime() === today.getTime()
          return (
            <div
              key={i}
              className="min-h-24 rounded-lg p-1.5 flex flex-col gap-1"
              style={{
                background: isToday ? '#16233d' : '#111827',
                border: isToday ? '1px solid #3b82f6' : '1px solid #1a2233',
              }}
            >
              <div className={`text-xs font-semibold ${isToday ? 'text-blue-400' : 'text-gray-500'}`}>
                {date.getDate()}
              </div>
              <div className="flex-1">{renderDay(date)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
