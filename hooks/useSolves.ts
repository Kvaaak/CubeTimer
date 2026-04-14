import { getSolves, Solve, subscribeSolveChanges } from '@/database/database'
import { useEffect, useState } from 'react'

export type SolveWithTime = Solve & {
  timeSec: number
}

export const useSolves = () => {
  const [solves, setSolves] = useState<SolveWithTime[]>([])
  const [bestTime, setBestTime] = useState<number | null>(null)

  const refreshSolves = () => {
    const rawSolves = getSolves() as Array<Solve & { created_at: number | string }>

    const parsedSolves: SolveWithTime[] = rawSolves
      .map(s => {
        const createdAt = typeof s.created_at === 'number'
          ? s.created_at
          : Date.parse(s.created_at)

        let timeSec = s.time

        if (s.penalty === 'DNF') {
          timeSec = Infinity
        } else if (s.penalty === '+2') {
          timeSec = s.time + 2
        }

        return {
          ...s,
          created_at: Number.isNaN(createdAt) ? 0 : createdAt,
          timeSec
        }
      })
      .sort((a, b) => b.created_at - a.created_at)

    setSolves(parsedSolves)

    const validTimes = parsedSolves
      .map(s => s.timeSec)
      .filter(t => t !== Infinity)

    setBestTime(validTimes.length ? Math.min(...validTimes) : null)
  }

  useEffect(() => {
    refreshSolves()
    const unsubscribe = subscribeSolveChanges(refreshSolves)
    return unsubscribe
  }, [])

  return {
    solves,
    bestTime,
    refreshSolves
  }
}