import { TrainingPlan, TrainingSession, AthleteFitness } from '@/types'

// Ironman 70.3 Málaga 2026 – target date approximation (typically October)
// Building a 24-week plan from week 1
const TOTAL_WEEKS = 24

function phase(week: number): TrainingPlan['phase'] {
  if (week <= 8) return 'Base'
  if (week <= 16) return 'Construcción'
  if (week <= 21) return 'Pico'
  return 'Tapering'
}

function intensity(ph: TrainingPlan['phase'], sessionType: string): TrainingSession['intensity'] {
  if (ph === 'Base') return 'Z2'
  if (ph === 'Construcción') return sessionType.includes('intervalo') ? 'Z4' : 'Z3'
  if (ph === 'Pico') return sessionType.includes('race') ? 'Z4' : 'Z3'
  return 'Z1'
}

export function generateTrainingPlan(fitness: AthleteFitness): TrainingPlan[] {
  const plan: TrainingPlan[] = []

  for (let w = 1; w <= TOTAL_WEEKS; w++) {
    const ph = phase(w)
    const isRecoveryWeek = w % 4 === 0
    const load = isRecoveryWeek ? 0.65 : 1

    const baseSwim = fitness.swimBase === 'high' ? 3 : fitness.swimBase === 'medium' ? 2.5 : 2
    const baseBike = fitness.bikeBase === 'high' ? 3 : fitness.bikeBase === 'medium' ? 2.5 : 2
    const baseRun = fitness.runBase === 'high' ? 2.5 : fitness.runBase === 'medium' ? 2 : 1.5

    const phaseMultiplier = ph === 'Base' ? 1 : ph === 'Construcción' ? 1.3 : ph === 'Pico' ? 1.5 : 0.6

    const sessions: TrainingSession[] = buildWeekSessions(w, ph, fitness, load * phaseMultiplier)
    const totalHours = sessions.reduce((s, sess) => s + sess.duration / 60, 0)

    plan.push({ week: w, phase: ph, sessions, totalHours: Math.round(totalHours * 10) / 10 })
  }

  return plan
}

function buildWeekSessions(week: number, ph: TrainingPlan['phase'], fitness: AthleteFitness, loadFactor: number): TrainingSession[] {
  const isTaper = ph === 'Tapering'
  const isRecovery = week % 4 === 0

  const swimDuration = Math.round(45 * loadFactor)
  const bikeDuration = Math.round(90 * loadFactor)
  const longBikeDuration = Math.round(150 * loadFactor)
  const runDuration = Math.round(45 * loadFactor)
  const longRunDuration = Math.round(80 * loadFactor)

  if (isTaper) {
    return [
      { day: 'Lunes', type: 'Descanso', duration: 0, intensity: 'Z1', description: 'Descanso activo / movilidad', details: ['Foam roller 15 min', 'Estiramientos suaves'] },
      { day: 'Martes', type: 'Natación', duration: 30, intensity: 'Z2', description: 'Natación técnica suave', details: ['1.2 km técnica', 'Ejercicios de entrada de mano', 'Series cortas 4x100m Z2'] },
      { day: 'Miércoles', type: 'Ciclismo', duration: 60, intensity: 'Z2', description: 'Rodaje suave mantenimiento', details: ['35-40 km Z2', 'Sin subidas fuertes', 'Cadencia 90-95 rpm'] },
      { day: 'Jueves', type: 'Carrera', duration: 35, intensity: 'Z2', description: 'Carrera suave con strides', details: ['6-7 km Z2', '4x100m a ritmo carrera', 'Técnica de zancada'] },
      { day: 'Viernes', type: 'Natación', duration: 25, intensity: 'Z2', description: 'Activación precompetición', details: ['800m activación', 'Trabajo de ritmo de competición', '4x50m al 90%'] },
      { day: 'Sábado', type: 'Ladrillo', duration: 40, intensity: 'Z2', description: 'Mini ladrillo activación', details: ['20 km bici suave', '10 min carrera piernas de bici'] },
      { day: 'Domingo', type: 'Descanso', duration: 0, intensity: 'Z1', description: 'Descanso total / preparación mental', details: ['Preparar material de carrera', 'Hidratación extra', 'Descanso mental'] },
    ]
  }

  const days: TrainingSession[] = [
    {
      day: 'Lunes',
      type: 'Descanso',
      duration: 0,
      intensity: 'Z1',
      description: isRecovery ? 'Semana recuperación – descanso total' : 'Descanso / Movilidad activa',
      details: isRecovery ? ['Masaje o foam roller', 'Hidratación extra'] : ['Foam roller 15 min', 'Movilidad de cadera y hombros'],
    },
    {
      day: 'Martes',
      type: 'Natación',
      duration: swimDuration,
      intensity: ph === 'Base' ? 'Z2' : 'Z3',
      description: ph === 'Base' ? 'Técnica y aeróbico base' : 'Series de natación con intensidad',
      details: ph === 'Base'
        ? [`${Math.round(swimDuration * 30)}m técnica (drills)`, `${Math.round(swimDuration * 50)}m aeróbico continuo Z2`, 'Trabajo de patada y brazada']
        : [`Calentamiento 400m`, `6x200m a ritmo 70.3 (Z3-Z4)`, `Vuelta calma 200m`],
    },
    {
      day: 'Miércoles',
      type: 'Fuerza',
      duration: 50,
      intensity: 'Z2',
      description: 'Fuerza funcional triatlón',
      details: ['Sentadilla búlgara 4x8', 'Hip thrust 4x10', 'Press banca inclinado 3x10', 'Remo con mancuernas 3x10', 'Core: plancha, pallof press'],
    },
    {
      day: 'Jueves',
      type: 'Ciclismo',
      duration: bikeDuration,
      intensity: ph === 'Base' ? 'Z2' : ph === 'Construcción' ? 'Z3' : 'Z4',
      description: ph === 'Base' ? 'Rodaje aeróbico base' : ph === 'Construcción' ? 'Intervalos al umbral' : 'Trabajo de potencia',
      details: ph === 'Base'
        ? [`${Math.round(bikeDuration * 0.6)} km Z2 constante`, 'Cadencia 90+ rpm', 'Sin escaladas']
        : ph === 'Construcción'
        ? ['Calentamiento 15 min', '4x10 min a FTP (Z4)', '3 min recuperación entre bloques', 'Vuelta calma 10 min']
        : ['Calentamiento 15 min', '5x5 min VO2max (Z5)', '5 min recuperación', 'Vuelta calma 15 min'],
    },
    {
      day: 'Viernes',
      type: 'Carrera',
      duration: runDuration,
      intensity: 'Z2',
      description: 'Carrera aeróbica recuperación activa',
      details: [`${Math.round(runDuration * 0.13)} km a ritmo fácil Z2`, 'FC < 75% FCmax', 'Foco en técnica de zancada'],
    },
    {
      day: 'Sábado',
      type: 'Ladrillo',
      duration: longBikeDuration + 20,
      intensity: ph === 'Base' ? 'Z2' : 'Z3',
      description: `Sesión larga ladrillo bici-carrera`,
      details: [
        `${Math.round(longBikeDuration * 0.5)} km en bici a ritmo carrera (${ph === 'Base' ? 'Z2' : 'Z3'})`,
        'Transición T2 rápida',
        `${ph === 'Base' ? '20' : '30'} min carrera inmediata post-bici`,
        'Nutrición: 60g HC/hora en bici',
      ],
    },
    {
      day: 'Domingo',
      type: 'Natación',
      duration: swimDuration + 10,
      intensity: 'Z2',
      description: 'Natación larga de fondo',
      details: [
        `${Math.round((swimDuration + 10) * 40)}m aeróbico continuo`,
        'Series largas 3x500m Z2',
        'Trabajo de respiración bilateral',
        'Simulación aguas abiertas',
      ],
    },
  ]

  return days
}

export function getWeeksUntilRace(): number {
  // Ironman 70.3 Málaga 2026 – typically first weekend of October
  const raceDate = new Date('2026-10-04')
  const today = new Date()
  const diff = raceDate.getTime() - today.getTime()
  return Math.max(1, Math.ceil(diff / (7 * 24 * 60 * 60 * 1000)))
}
