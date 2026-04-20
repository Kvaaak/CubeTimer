import { getSolves, Solve, subscribeSolveChanges } from '@/database/database'
import { useEffect, useState } from 'react'

export const useSolves = () => {
  const [solves, setSolves] = useState<Solve[]>([])
  const [bestTime, setBestTime] = useState<number | null>(null)

  const refreshSolves = () => {
    const rawSolves = getSolves() as Solve[]

    const parsedSolves: Solve[] = rawSolves
      .map(s => ({
        ...s,
        created_at:
          typeof s.created_at === 'number'
            ? s.created_at
            : Date.parse(String(s.created_at)),
      }))
      .sort((a, b) => b.created_at - a.created_at)

    setSolves(parsedSolves)

    const validTimes = parsedSolves
      .map(s => {
        if (s.penalty === 'DNF') return Infinity
        if (s.penalty === '+2') return s.time + 2
        return s.time
      })
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
    refreshSolves,
  }
}