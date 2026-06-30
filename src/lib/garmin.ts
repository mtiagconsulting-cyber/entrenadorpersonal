import { GarminConnect } from 'garmin-connect'
import { StravaActivity, StravaAthlete } from '@/types'

// Mapea los tipos de actividad de Garmin al formato (estilo Strava) que usa la app
function mapSportType(garminType?: string): string {
  if (!garminType) return 'Workout'
  const t = garminType.toLowerCase()
  if (t.includes('swim')) return 'Swim'
  if (t.includes('cycl') || t.includes('bike') || t.includes('ride')) return 'Ride'
  if (t.includes('run')) return 'Run'
  if (t.includes('strength') || t.includes('training')) return 'WeightTraining'
  return 'Workout'
}

interface GarminActivity {
  activityId: number
  activityName: string
  activityType?: { typeKey?: string }
  distance?: number
  duration?: number
  elapsedDuration?: number
  movingDuration?: number
  elevationGain?: number
  averageSpeed?: number
  maxSpeed?: number
  averageHR?: number
  maxHR?: number
  startTimeLocal?: string
}

let cachedClient: GarminConnect | null = null

async function getClient(): Promise<GarminConnect> {
  if (cachedClient) return cachedClient

  const username = process.env.GARMIN_EMAIL
  const password = process.env.GARMIN_PASSWORD
  if (!username || !password) {
    throw new Error('Faltan GARMIN_EMAIL y GARMIN_PASSWORD en .env.local')
  }

  const client = new GarminConnect({ username, password })
  await client.login()
  cachedClient = client
  return client
}

export async function getGarminActivities(limit = 60): Promise<StravaActivity[]> {
  const client = await getClient()
  const activities = (await client.getActivities(0, limit)) as GarminActivity[]

  return activities.map((a): StravaActivity => {
    const sportType = mapSportType(a.activityType?.typeKey)
    return {
      id: a.activityId,
      name: a.activityName || 'Actividad',
      type: sportType,
      sport_type: sportType,
      distance: a.distance ?? 0,
      moving_time: Math.round(a.movingDuration ?? a.duration ?? 0),
      elapsed_time: Math.round(a.elapsedDuration ?? a.duration ?? 0),
      total_elevation_gain: a.elevationGain ?? 0,
      average_speed: a.averageSpeed ?? 0,
      max_speed: a.maxSpeed ?? 0,
      average_heartrate: a.averageHR,
      max_heartrate: a.maxHR,
      start_date: a.startTimeLocal ?? new Date().toISOString(),
    }
  })
}

export async function getGarminAthlete(): Promise<StravaAthlete> {
  const client = await getClient()
  const profile = (await client.getUserProfile()) as {
    displayName?: string
    fullName?: string
    location?: string
  }
  const [firstname, ...rest] = (profile.fullName || profile.displayName || 'Atleta').split(' ')
  return {
    id: 0,
    firstname,
    lastname: rest.join(' '),
    city: profile.location || '',
    country: '',
    profile: '',
  }
}
