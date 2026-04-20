import { calculateAverage, calculateMean, getBestRollingAverage } from '@/utils/averages'
import { useMemo } from 'react'
import { SolveWithTime } from './useSolves'

export const useStats = (solves: SolveWithTime[]) => {
  const times = useMemo(
    () => solves.map(s => s.timeSec),
    [solves]
  )

  const getAo = (n: number) => {
    if (times.length < n) return null
    return calculateAverage(times.slice(0, n))
  }

  const getBestAo = (n: number) => {
    if (times.length < n) return null
    return getBestRollingAverage(times, n)
  }

  const getMean = (n: number) => {
    if (times.length < n) return null
    return calculateMean(times.slice(0, n))
  }

  return {
    getAo,
    getBestAo,
    getMean
  }
}