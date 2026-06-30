export interface StravaActivity {
  id: number
  name: string
  type: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  average_speed: number
  max_speed: number
  average_heartrate?: number
  max_heartrate?: number
  start_date: string
  sport_type: string
}

export interface StravaAthlete {
  id: number
  firstname: string
  lastname: string
  city: string
  country: string
  profile: string
  ftp?: number
}

export interface WeeklyVolume {
  week: string
  swim: number
  bike: number
  run: number
  strength: number
}

export interface TrainingPlan {
  week: number
  phase: 'Base' | 'Construcción' | 'Pico' | 'Tapering'
  sessions: TrainingSession[]
  totalHours: number
}

export interface TrainingSession {
  day: string
  type: 'Natación' | 'Ciclismo' | 'Carrera' | 'Fuerza' | 'Descanso' | 'Ladrillo'
  duration: number
  intensity: 'Z1' | 'Z2' | 'Z3' | 'Z4' | 'Z5'
  description: string
  details: string[]
}

export interface NutritionPlan {
  calories: number
  protein: number
  carbs: number
  fat: number
  meals: Meal[]
  raceNutrition: RaceNutrition
}

export interface Meal {
  name: string
  time: string
  foods: string[]
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface RaceNutrition {
  swim: string[]
  bike: string[]
  run: string[]
  total_carbs_per_hour: number
  total_fluids_per_hour: number
}

export interface StrengthExercise {
  name: string
  sets: number
  reps: string
  rest: string
  muscles: string[]
  notes: string
}

export interface StrengthWorkout {
  name: string
  phase: string
  focus: string
  exercises: StrengthExercise[]
  duration: number
}

export interface AthleteFitness {
  swimBase: 'low' | 'medium' | 'high'
  bikeBase: 'low' | 'medium' | 'high'
  runBase: 'low' | 'medium' | 'high'
  weeklyHours: number
  longestRun: number
  longestRide: number
  longestSwim: number
}
