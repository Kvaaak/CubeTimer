import { getSolves, Solve } from '@/database/database'
import { useEffect, useState } from 'react'

export type SolveWithTime = Solve & {
  timeSec: number
}

export const useSolves = () => {
  const [solves, setSolves] = useState<SolveWithTime[]>([])
  const [bestTime, setBestTime] = useState<number | null>(null)

  const refreshSolves = () => {
    const rawSolves = getSolves()

    const parsedSolves: SolveWithTime[] = rawSolves.map(s => {
      let timeSec = s.time

      if (s.penalty === 'DNF') {
        timeSec = Infinity
      } else if (s.penalty === '+2') {
        timeSec = s.time + 2
      }

      return {
        ...s,
        timeSec
      }
    })

    setSolves(parsedSolves)

    const validTimes = parsedSolves
      .map(s => s.timeSec)
      .filter(t => t !== Infinity)

    setBestTime(validTimes.length ? Math.min(...validTimes) : null)
  }

  useEffect(() => {
    refreshSolves()
  }, [])

  return {
    solves,
    bestTime,
    refreshSolves
  }
}