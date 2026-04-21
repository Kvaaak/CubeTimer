import { EventType } from '@/config/events'
import { Solve } from '@/database/database'
import {
  calculateAverage,
  calculateMean,
  getBestRollingAverage,
  getSolvesByEvent,
  normalizeSolve
} from '@/utils/averages'
import { useMemo } from 'react'

export const useStats = (solves: Solve[], event: EventType) => {
  const eventSolves = useMemo(
    () => getSolvesByEvent(solves, event),
    [solves, event]
  )

  const getAo = (n: number) => {
    if (eventSolves.length < n) return null
    return calculateAverage(eventSolves.slice(0, n))
  }

  const getBestAo = (n: number) => {
    if (eventSolves.length < n) return null
    return getBestRollingAverage(eventSolves, n)
  }

  const getMean = (n: number) => {
    if (eventSolves.length < n) return null
    return calculateMean(eventSolves.slice(0, n))
  }

  const best = useMemo(() => {
    const normalized = eventSolves.map(normalizeSolve)
    const bestValue = normalized.length > 0 ? Math.min(...normalized) : Infinity
    return bestValue === Infinity ? null : bestValue
  }, [eventSolves])

  return {
    getAo,
    getBestAo,
    getMean,
    solveCount: eventSolves.length,
    best,
  }
}