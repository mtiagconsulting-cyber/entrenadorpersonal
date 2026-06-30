// Fuente única de verdad: plan de entrenamiento y dieta basado en FECHAS reales
// para alimentar los calendarios de planificación y de dietas.

export type Discipline = 'swim' | 'bike' | 'run' | 'strength' | 'brick' | 'rest'
export type Phase = 'Base' | 'Construcción' | 'Pico' | 'Tapering'

export interface PlannedSession {
  discipline: Discipline
  title: string
  durationMin: number
  intensity: 'Z1' | 'Z2' | 'Z3' | 'Z4' | 'Z5'
  detail: string
  timeHint: string
}

export interface DayType {
  label: string
  load: 'alta' | 'media' | 'baja' | 'descanso'
  calories: number
  protein: number
  carbs: number
  fat: number
  focus: string
}

export const RACE_DATE = new Date('2026-10-04T08:00:00')
export const PLAN_START = (() => {
  // Lunes de la semana actual (o el próximo lunes)
  const d = new Date()
  const dow = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - dow)
  d.setHours(0, 0, 0, 0)
  return d
})()

export const DISCIPLINE_META: Record<Discipline, { label: string; icon: string; color: string }> = {
  swim: { label: 'Natación', icon: '🏊', color: '#38bdf8' },
  bike: { label: 'Ciclismo', icon: '🚴', color: '#fb923c' },
  run: { label: 'Carrera', icon: '🏃', color: '#34d399' },
  strength: { label: 'Fuerza', icon: '🏋️', color: '#a78bfa' },
  brick: { label: 'Ladrillo', icon: '🧱', color: '#f43f5e' },
  rest: { label: 'Descanso', icon: '😴', color: '#64748b' },
}

export const PHASE_META: Record<Phase, { color: string; bg: string }> = {
  Base: { color: '#60a5fa', bg: '#0d1b35' },
  Construcción: { color: '#fbbf24', bg: '#2e2a00' },
  Pico: { color: '#f87171', bg: '#2e0d0d' },
  Tapering: { color: '#4ade80', bg: '#0d2e16' },
}

function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export function weeksUntilRace(from = new Date()): number {
  return Math.max(0, Math.ceil((RACE_DATE.getTime() - from.getTime()) / (7 * 24 * 3600 * 1000)))
}

export function getPhaseForDate(date: Date): Phase {
  const left = weeksUntilRace(date)
  if (left <= 2) return 'Tapering'
  if (left <= 6) return 'Pico'
  if (left <= 14) return 'Construcción'
  return 'Base'
}

// nº de semana del plan (1-indexed) desde PLAN_START
export function planWeekIndex(date: Date): number {
  const diff = startOfDay(date).getTime() - PLAN_START.getTime()
  return Math.floor(diff / (7 * 24 * 3600 * 1000))
}

function weeklyTemplate(phase: Phase): Record<number, PlannedSession[]> {
  // clave = día de la semana (1=lunes … 0=domingo)
  if (phase === 'Tapering') {
    return {
      1: [{ discipline: 'rest', title: 'Descanso / movilidad', durationMin: 0, intensity: 'Z1', detail: 'Foam roller y estiramientos', timeHint: '—' }],
      2: [{ discipline: 'swim', title: 'Natación técnica suave', durationMin: 30, intensity: 'Z2', detail: '1.2km técnica + 4x100 Z2', timeHint: '18:30' }],
      3: [{ discipline: 'bike', title: 'Rodaje suave', durationMin: 60, intensity: 'Z2', detail: '35-40km Z2, cadencia 90+', timeHint: '07:00' }],
      4: [{ discipline: 'run', title: 'Carrera suave + strides', durationMin: 35, intensity: 'Z2', detail: '6-7km Z2 + 4x100m', timeHint: '07:00' }],
      5: [{ discipline: 'swim', title: 'Activación natación', durationMin: 25, intensity: 'Z2', detail: '800m + 4x50 al 90%', timeHint: '18:00' }],
      6: [{ discipline: 'brick', title: 'Mini ladrillo activación', durationMin: 40, intensity: 'Z2', detail: '20km bici + 10min carrera', timeHint: '09:00' }],
      0: [{ discipline: 'rest', title: 'Descanso total', durationMin: 0, intensity: 'Z1', detail: 'Preparar material, hidratación', timeHint: '—' }],
    }
  }
  if (phase === 'Pico') {
    return {
      1: [{ discipline: 'rest', title: 'Descanso / movilidad', durationMin: 0, intensity: 'Z1', detail: 'Recuperación activa', timeHint: '—' }],
      2: [{ discipline: 'swim', title: 'Series natación 70.3', durationMin: 50, intensity: 'Z4', detail: '400 cal + 6x200 Z3-Z4', timeHint: '18:00' },
          { discipline: 'strength', title: 'Fuerza mantenimiento', durationMin: 45, intensity: 'Z2', detail: 'Sentadilla, PM rumano, dominadas', timeHint: '19:30' }],
      3: [{ discipline: 'bike', title: 'VO2max', durationMin: 75, intensity: 'Z5', detail: '5x5min Z5, rec 5min', timeHint: '07:00' }],
      4: [{ discipline: 'run', title: 'Carrera aeróbica', durationMin: 45, intensity: 'Z2', detail: '8km Z2 técnica', timeHint: '07:00' }],
      5: [{ discipline: 'swim', title: 'Natación fondo', durationMin: 50, intensity: 'Z2', detail: '2km continuo Z2', timeHint: '18:00' }],
      6: [{ discipline: 'brick', title: 'Ladrillo largo race-pace', durationMin: 170, intensity: 'Z3', detail: '75km bici Z3 + 30min carrera', timeHint: '08:00' }],
      0: [{ discipline: 'run', title: 'Tirada larga', durationMin: 55, intensity: 'Z2', detail: '16-18km progresivo', timeHint: '09:00' }],
    }
  }
  if (phase === 'Construcción') {
    return {
      1: [{ discipline: 'rest', title: 'Descanso / movilidad', durationMin: 0, intensity: 'Z1', detail: 'Foam roller, cadera y hombros', timeHint: '—' }],
      2: [{ discipline: 'swim', title: 'Series natación', durationMin: 50, intensity: 'Z4', detail: '400 cal + 6x200 Z3-Z4', timeHint: '18:00' },
          { discipline: 'strength', title: 'Fuerza potencia', durationMin: 55, intensity: 'Z2', detail: 'Sentadilla 4x5, PM, saltos cajón', timeHint: '19:30' }],
      3: [{ discipline: 'bike', title: 'Intervalos umbral', durationMin: 90, intensity: 'Z4', detail: '4x10min a FTP (Z4)', timeHint: '07:00' }],
      4: [{ discipline: 'run', title: 'Carrera aeróbica', durationMin: 45, intensity: 'Z2', detail: '8km Z2', timeHint: '07:00' }],
      5: [{ discipline: 'swim', title: 'Natación fondo', durationMin: 55, intensity: 'Z2', detail: '2km continuo Z2', timeHint: '18:00' }],
      6: [{ discipline: 'brick', title: 'Ladrillo bici-carrera', durationMin: 170, intensity: 'Z3', detail: '75km Z3 + 30min carrera', timeHint: '08:00' }],
      0: [{ discipline: 'run', title: 'Tirada larga', durationMin: 80, intensity: 'Z2', detail: '16km Z2', timeHint: '09:00' }],
    }
  }
  // Base
  return {
    1: [{ discipline: 'rest', title: 'Descanso / movilidad', durationMin: 0, intensity: 'Z1', detail: 'Movilidad', timeHint: '—' }],
    2: [{ discipline: 'swim', title: 'Natación técnica + aeróbico', durationMin: 45, intensity: 'Z2', detail: 'drills + 1.5km Z2', timeHint: '18:00' },
        { discipline: 'strength', title: 'Fuerza funcional torso/brazos', durationMin: 55, intensity: 'Z2', detail: 'Press, remo, hip thrust, core', timeHint: '19:30' }],
    3: [{ discipline: 'bike', title: 'Rodaje base', durationMin: 90, intensity: 'Z2', detail: '50km Z2, cadencia 90+', timeHint: '07:00' }],
    4: [{ discipline: 'run', title: 'Carrera aeróbica', durationMin: 45, intensity: 'Z2', detail: '8km Z2', timeHint: '07:00' }],
    5: [{ discipline: 'swim', title: 'Natación fondo', durationMin: 55, intensity: 'Z2', detail: '2km Z2', timeHint: '18:00' }],
    6: [{ discipline: 'brick', title: 'Ladrillo largo', durationMin: 140, intensity: 'Z2', detail: '60km bici Z2 + 20min carrera', timeHint: '08:00' }],
    0: [{ discipline: 'run', title: 'Tirada larga', durationMin: 70, intensity: 'Z2', detail: '14km Z2', timeHint: '09:00' }],
  }
}

export function getSessionsForDate(date: Date): PlannedSession[] {
  const d = startOfDay(date)
  if (d < PLAN_START) return []
  if (d > startOfDay(RACE_DATE)) return []
  // día de carrera
  if (d.getTime() === startOfDay(RACE_DATE).getTime()) {
    return [{ discipline: 'brick', title: '🏆 IRONMAN 70.3 MÁLAGA', durationMin: 300, intensity: 'Z4', detail: '1.9km + 90km + 21.1km · Objetivo sub-5h', timeHint: '08:00' }]
  }
  const phase = getPhaseForDate(d)
  const tpl = weeklyTemplate(phase)
  const sessions = tpl[d.getDay()] ?? []
  const isRecovery = (planWeekIndex(d) + 1) % 4 === 0 && phase !== 'Tapering'
  if (isRecovery) {
    return sessions.map(s => ({ ...s, durationMin: Math.round(s.durationMin * 0.65), title: `${s.title} (suave)` }))
  }
  return sessions
}

// ───────── Dietas por tipo de día ─────────
const WEIGHT = 67

function dayType(date: Date): DayType {
  const sessions = getSessionsForDate(date)
  const totalMin = sessions.reduce((s, x) => s + x.durationMin, 0)
  const hasLong = sessions.some(s => s.discipline === 'brick' || s.durationMin >= 80)
  const isRest = sessions.length === 1 && sessions[0].discipline === 'rest'

  if (isRest || totalMin === 0) {
    return { label: 'Día de descanso', load: 'descanso', calories: 2150, protein: WEIGHT * 2, carbs: 220, fat: 70, focus: 'Recuperación · proteína alta, menos carbohidratos' }
  }
  if (hasLong || totalMin >= 150) {
    return { label: 'Día de carga alta', load: 'alta', calories: 3100, protein: WEIGHT * 2, carbs: 480, fat: 80, focus: 'Sesión larga · carga de carbohidratos antes y recarga después' }
  }
  if (totalMin >= 70) {
    return { label: 'Día de carga media', load: 'media', calories: 2650, protein: WEIGHT * 2, carbs: 350, fat: 75, focus: 'Entreno de calidad · carbohidratos en torno al entreno' }
  }
  return { label: 'Día de carga baja', load: 'baja', calories: 2350, protein: WEIGHT * 2, carbs: 270, fat: 72, focus: 'Mantenimiento · enfoque en proteína y verduras' }
}

export function getDayTypeForDate(date: Date): DayType | null {
  const d = startOfDay(date)
  if (d < PLAN_START || d > startOfDay(RACE_DATE)) return null
  return dayType(d)
}

export const LOAD_COLORS: Record<DayType['load'], string> = {
  alta: '#f43f5e',
  media: '#fb923c',
  baja: '#34d399',
  descanso: '#64748b',
}

export function getMenuForLoad(load: DayType['load']): { meal: string; food: string }[] {
  const base = {
    alta: [
      { meal: 'Desayuno', food: 'Avena 100g + plátano + 3 huevos + miel + café' },
      { meal: 'Pre-entreno', food: 'Tostada con mermelada + gel si sesión >2h' },
      { meal: 'Post-entreno', food: 'Batido proteína + 2 dátiles + plátano' },
      { meal: 'Comida', food: 'Arroz 150g + pollo 200g + verduras + AOVE' },
      { meal: 'Merienda', food: 'Yogur griego + granola + fruta' },
      { meal: 'Cena', food: 'Boniato + salmón 180g + ensalada' },
    ],
    media: [
      { meal: 'Desayuno', food: 'Avena 80g + plátano + 2 huevos + café' },
      { meal: 'Post-entreno', food: 'Batido proteína + fruta' },
      { meal: 'Comida', food: 'Quinoa 120g + pavo 200g + verduras + AOVE' },
      { meal: 'Merienda', food: 'Yogur griego + frutos secos' },
      { meal: 'Cena', food: 'Patata 150g + pescado blanco 200g + verduras' },
    ],
    baja: [
      { meal: 'Desayuno', food: 'Yogur griego + avena 50g + frutos rojos + café' },
      { meal: 'Comida', food: 'Ensalada grande + pollo 200g + arroz 80g + AOVE' },
      { meal: 'Merienda', food: '30g frutos secos + fruta' },
      { meal: 'Cena', food: 'Tortilla 3 huevos + verduras + 1 tostada integral' },
    ],
    descanso: [
      { meal: 'Desayuno', food: 'Huevos revueltos + aguacate + 1 tostada + café' },
      { meal: 'Comida', food: 'Ensalada + salmón 180g + quinoa 80g + AOVE' },
      { meal: 'Merienda', food: 'Yogur griego + frutos secos' },
      { meal: 'Cena', food: 'Pollo 200g + abundante verdura asada + AOVE' },
    ],
  }
  return base[load]
}
