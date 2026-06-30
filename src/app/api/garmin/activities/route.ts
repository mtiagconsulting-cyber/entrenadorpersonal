import { NextResponse } from 'next/server'
import { getGarminActivities, getGarminAthlete } from '@/lib/garmin'
import { analyzeActivities, groupByWeek } from '@/lib/strava'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [activities, athlete] = await Promise.all([
      getGarminActivities(60),
      getGarminAthlete().catch(() => null),
    ])

    const fitness = analyzeActivities(activities)
    const weeklyVolume = groupByWeek(activities)

    return NextResponse.json({
      connected: true,
      athlete,
      fitness,
      weeklyVolume,
      recentActivities: activities.slice(0, 8),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    const needsConfig = message.includes('GARMIN_EMAIL')
    return NextResponse.json(
      {
        connected: false,
        error: message,
        needsConfig,
      },
      { status: needsConfig ? 200 : 502 }
    )
  }
}
