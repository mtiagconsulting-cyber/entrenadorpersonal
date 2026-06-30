import { StrengthWorkout } from '@/types'

export const STRENGTH_PROGRAMS: Record<string, StrengthWorkout[]> = {
  Base: [
    {
      name: 'Tren Inferior Triatlón A',
      phase: 'Base',
      focus: 'Fuerza funcional y estabilidad',
      duration: 55,
      exercises: [
        { name: 'Sentadilla Goblet', sets: 3, reps: '12-15', rest: '90s', muscles: ['Cuádriceps', 'Glúteos', 'Core'], notes: 'Foco en profundidad y rodillas alineadas' },
        { name: 'Zancada Búlgara con mancuerna', sets: 3, reps: '10/pierna', rest: '90s', muscles: ['Glúteos', 'Cuádriceps', 'Isquiotibiales'], notes: 'Pie trasero elevado, torso erguido' },
        { name: 'Hip Thrust con barra', sets: 4, reps: '10-12', rest: '90s', muscles: ['Glúteos', 'Isquiotibiales'], notes: 'Contrae glúteo en la parte alta 2 segundos' },
        { name: 'Peso Muerto Rumano', sets: 3, reps: '10-12', rest: '90s', muscles: ['Isquiotibiales', 'Glúteos', 'Erector espinal'], notes: 'Mantén espalda neutra, bisagra de cadera' },
        { name: 'Elevación de talones (pantorrillas)', sets: 4, reps: '15-20', rest: '60s', muscles: ['Gastrocnemio', 'Sóleo'], notes: 'Importante para corredores y ciclistas' },
        { name: 'Plancha frontal', sets: 3, reps: '45s', rest: '45s', muscles: ['Core', 'Transverso abdominal'], notes: 'Cuerpo rígido como tabla' },
        { name: 'Dead Bug', sets: 3, reps: '8/lado', rest: '60s', muscles: ['Core', 'Estabilizadores'], notes: 'Lento y controlado, lumbar pegada al suelo' },
      ],
    },
    {
      name: 'Tren Superior Triatlón B',
      phase: 'Base',
      focus: 'Fuerza de empuje/tirón para natación y postura ciclismo',
      duration: 55,
      exercises: [
        { name: 'Press Banca Inclinado con mancuernas', sets: 3, reps: '10-12', rest: '90s', muscles: ['Pectoral', 'Hombro anterior', 'Tríceps'], notes: 'Pecho arriba, escápulas juntas' },
        { name: 'Remo con barra (Pendlay)', sets: 4, reps: '8-10', rest: '90s', muscles: ['Dorsal', 'Romboides', 'Bíceps'], notes: 'Fundamental para la tracción en natación' },
        { name: 'Dominadas o jalón al pecho', sets: 3, reps: '6-10', rest: '90s', muscles: ['Dorsal', 'Bíceps', 'Core'], notes: 'Si no puedes dominadas usa jalón con asistencia' },
        { name: 'Press Militar mancuernas', sets: 3, reps: '10-12', rest: '90s', muscles: ['Deltoides', 'Tríceps', 'Core'], notes: 'Estabiliza hombros para la natación' },
        { name: 'Face Pull con cable', sets: 3, reps: '15', rest: '60s', muscles: ['Manguito rotador', 'Deltoides posterior'], notes: 'Salud del hombro del nadador' },
        { name: 'Curl bíceps alternado', sets: 3, reps: '10/brazo', rest: '60s', muscles: ['Bíceps', 'Antebrazo'], notes: 'Control en la bajada (excéntrico)' },
        { name: 'Extensión tríceps polea', sets: 3, reps: '12-15', rest: '60s', muscles: ['Tríceps'], notes: 'Codo fijo, extensión completa' },
      ],
    },
  ],
  Construcción: [
    {
      name: 'Potencia Inferior Triatlón',
      phase: 'Construcción',
      focus: 'Potencia y fuerza máxima',
      duration: 60,
      exercises: [
        { name: 'Sentadilla con barra (back squat)', sets: 4, reps: '5-6', rest: '2:30', muscles: ['Cuádriceps', 'Glúteos', 'Core', 'Erector'], notes: 'Carga progresiva, 75-85% 1RM' },
        { name: 'Peso Muerto Convencional', sets: 4, reps: '4-5', rest: '3:00', muscles: ['Cadena posterior completa', 'Core', 'Grip'], notes: '80-85% 1RM, técnica impecable' },
        { name: 'Saltos al cajón (Box Jump)', sets: 4, reps: '5', rest: '2:00', muscles: ['Cuádriceps', 'Glúteos', 'Gemelos'], notes: 'Potencia explosiva, aterriza suave' },
        { name: 'Step-up con mancuerna', sets: 3, reps: '8/pierna', rest: '90s', muscles: ['Glúteos', 'Cuádriceps'], notes: 'Simula el gesto del pedaleo' },
        { name: 'Pallof Press', sets: 3, reps: '10/lado', rest: '60s', muscles: ['Core lateral', 'Oblicuos'], notes: 'Anti-rotación, clave para running' },
        { name: 'Farmer Walk', sets: 4, reps: '30 metros', rest: '90s', muscles: ['Grip', 'Core', 'Trapecios', 'Piernas'], notes: 'Resistencia muscular funcional' },
      ],
    },
    {
      name: 'Fuerza Superior + Core Potencia',
      phase: 'Construcción',
      focus: 'Fuerza máxima y potencia de natación',
      duration: 60,
      exercises: [
        { name: 'Press Banca con barra', sets: 4, reps: '5-6', rest: '2:30', muscles: ['Pectoral', 'Tríceps', 'Deltoides'], notes: '75-80% 1RM' },
        { name: 'Remo con mancuerna (1 brazo)', sets: 4, reps: '8/brazo', rest: '90s', muscles: ['Dorsal', 'Bíceps', 'Romboides'], notes: 'Rango completo, no rotes el tronco' },
        { name: 'Chin-ups lastradas', sets: 4, reps: '5-6', rest: '2:00', muscles: ['Dorsal', 'Bíceps', 'Core'], notes: 'Añade carga cuando puedas hacer 8 sin carga' },
        { name: 'Lanzamiento balón medicinal (slam)', sets: 4, reps: '8', rest: '90s', muscles: ['Core', 'Hombros', 'Cadena posterior'], notes: 'Potencia core para natación' },
        { name: 'L-Sit o compression', sets: 3, reps: '10s hold', rest: '60s', muscles: ['Core', 'Flexores cadera', 'Hombros'], notes: 'Estabilidad avanzada' },
        { name: 'Rotaciones rusas con disco', sets: 3, reps: '15/lado', rest: '60s', muscles: ['Oblicuos', 'Core'], notes: 'Rotación del tronco para natación' },
      ],
    },
  ],
  Pico: [
    {
      name: 'Mantenimiento Fuerza – Pico',
      phase: 'Pico',
      focus: 'Mantener fuerza, reducir fatiga',
      duration: 45,
      exercises: [
        { name: 'Sentadilla (volumen reducido)', sets: 3, reps: '4-5', rest: '2:30', muscles: ['Cuádriceps', 'Glúteos'], notes: 'Mantén intensidad (80%), reduce series' },
        { name: 'Peso Muerto Rumano', sets: 3, reps: '6', rest: '2:00', muscles: ['Isquiotibiales', 'Glúteos'], notes: 'Control excéntrico' },
        { name: 'Dominadas', sets: 3, reps: '6-8', rest: '2:00', muscles: ['Dorsal', 'Bíceps'], notes: 'Calidad sobre cantidad' },
        { name: 'Hip Thrust', sets: 3, reps: '8', rest: '90s', muscles: ['Glúteos'], notes: 'Potencia glútea para el sprint final' },
        { name: 'Core: Plancha + Bird Dog', sets: 2, reps: '30s + 8/lado', rest: '60s', muscles: ['Core completo'], notes: 'Estabilidad sin fatiga acumulada' },
      ],
    },
  ],
  Tapering: [
    {
      name: 'Activación Tapering',
      phase: 'Tapering',
      focus: 'Activar sistema nervioso sin fatiga',
      duration: 30,
      exercises: [
        { name: 'Sentadilla con peso corporal', sets: 2, reps: '10', rest: '60s', muscles: ['Piernas'], notes: 'Solo activación' },
        { name: 'Hip Thrust ligero', sets: 2, reps: '10', rest: '60s', muscles: ['Glúteos'], notes: '50% del peso habitual' },
        { name: 'Band Pull-Apart', sets: 2, reps: '15', rest: '45s', muscles: ['Manguito rotador', 'Romboides'], notes: 'Activa hombros para natación' },
        { name: 'Plancha 30s', sets: 2, reps: '30s', rest: '45s', muscles: ['Core'], notes: 'Mantenimiento' },
      ],
    },
  ],
}

export function getStrengthWorkoutForWeek(week: number): StrengthWorkout[] {
  if (week <= 8) return STRENGTH_PROGRAMS.Base
  if (week <= 16) return STRENGTH_PROGRAMS.Construcción
  if (week <= 21) return STRENGTH_PROGRAMS.Pico
  return STRENGTH_PROGRAMS.Tapering
}
