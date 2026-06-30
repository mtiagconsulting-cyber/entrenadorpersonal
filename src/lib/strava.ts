import { StravaActivity, StravaAthlete, AthleteFitness } from '@/types'

export async function getStravaAuthUrl(): Promise<string> {
  const clientId = process.env.STRAVA_CLIENT_ID
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/strava/callback`
  const scope = 'read,activity:read_all,profile:read_all'
  return `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`
}

export async function exchangeStravaCode(code: string): Promise<{ access_token: string; athlete: StravaAthlete }> {
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    }),
  })
  if (!res.ok) throw new Error('Failed to exchange Strava code')
  return res.json()
}

export async function getStravaActivities(accessToken: string, perPage = 60): Promise<StravaActivity[]> {
  const ninetyDaysAgo = Math.floor((Date.now() - 90 * 24 * 60 * 60 * 1000) / 1000)
  const res = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?after=${ninetyDaysAgo}&per_page=${perPage}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  if (!res.ok) throw new Error('Failed to fetch Strava activities')
  return res.json()
}

export async function getStravaAthlete(accessToken: string): Promise<StravaAthlete> {
  const res = await fetch('https://www.strava.com/api/v3/athlete', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('Failed to fetch Strava athlete')
  return res.json()
}

export function analyzeActivities(activities: StravaActivity[]): AthleteFitness {
  const swims = activities.filter(a => a.sport_type === 'Swim' || a.type === 'Swim')
  const rides = activities.filter(a => a.sport_type === 'Ride' || a.type === 'Ride' || a.sport_type === 'VirtualRide')
  const runs = activities.filter(a => a.sport_type === 'Run' || a.type === 'Run')

  const weeklyHours = activities.reduce((sum, a) => sum + a.moving_time, 0) / 3600 / 12

  const longestSwim = swims.length ? Math.max(...swims.map(a => a.distance)) / 1000 : 0
  const longestRide = rides.length ? Math.max(...rides.map(a => a.distance)) / 1000 : 0
  const longestRun = runs.length ? Math.max(...runs.map(a => a.distance)) / 1000 : 0

  const getBase = (longest: number, medThreshold: number, highThreshold: number): 'low' | 'medium' | 'high' => {
    if (longest >= highThreshold) return 'high'
    if (longest >= medThreshold) return 'medium'
    return 'low'
  }

  return {
    swimBase: getBase(longestSwim, 1.5, 2.5),
    bikeBase: getBase(longestRide, 60, 90),
    runBase: getBase(longestRun, 15, 20),
    weeklyHours: Math.round(weeklyHours * 10) / 10,
    longestSwim: Math.round(longestSwim * 100) / 100,
    longestRide: Math.round(longestRide),
    longestRun: Math.round(longestRun * 10) / 10,
  }
}

export function groupByWeek(activities: StravaActivity[]) {
  const weeks: Record<string, { swim: number; bike: number; run: number; strength: number }> = {}

  activities.forEach(a => {
    const date = new Date(a.start_date)
    const weekStart = new Date(date)
    weekStart.setDate(date.getDate() - date.getDay() + 1)
    const key = weekStart.toISOString().split('T')[0]

    if (!weeks[key]) weeks[key] = { swim: 0, bike: 0, run: 0, strength: 0 }

    const hours = a.moving_time / 3600
    const type = a.sport_type || a.type
    if (type === 'Swim') weeks[key].swim += hours
    else if (type === 'Ride' || type === 'VirtualRide') weeks[key].bike += hours
    else if (type === 'Run') weeks[key].run += hours
    else if (type === 'WeightTraining' || type === 'Workout') weeks[key].strength += hours
  })

  return Object.entries(weeks)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([week, data]) => ({ week, ...data }))
}
