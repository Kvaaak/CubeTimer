import { EventType } from '@/config/events'
import { Solve } from '@/database/database'
import {
  calculateAverage,
  calculateMean,
  getBestRollingAverage,
  getEventStats as getEventStatsUtil,
  getSolvesByEvent,
} from '@/utils/averages'
import { useMemo } from 'react'

export const useStats = (solves: Solve[], event: EventType) => {
  const eventSolves = useMemo(
    () => getSolvesByEvent(solves, event),
    [solves, event]
  )

  const getAo = (n: number) => {
    if (eventSolves.length < n) return null
    return calculateAverage(eventSolves.slice(-n))
  }

  const getBestAo = (n: number) => {
    if (eventSolves.length < n) return null
    return getBestRollingAverage(eventSolves, n)
  }

  const eventStats = useMemo(
    () => getEventStatsUtil(eventSolves, event),
    [eventSolves, event]
  )

  const getMean = (n: number) => {
    if (eventSolves.length < n) return null
    return calculateMean(eventSolves.slice(-n))
  }

  return {
    getAo,
    getBestAo,
    getMean,
    count: eventSolves.length,
    best: eventStats.best,
    ao5: eventStats.ao5,
    ao12: eventStats.ao12,
  }
}