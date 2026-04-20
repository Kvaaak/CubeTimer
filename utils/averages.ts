import { EventType } from '@/config/events'
import { Solve } from '@/database/database'

export const normalizeSolve = (solve: Solve): number => {
  if (solve.penalty === 'DNF') return Infinity
  if (solve.penalty === '+2') return solve.time + 2
  return solve.time
}

export const getSolvesByEvent = (
  solves: Solve[],
  event: EventType
): Solve[] => {
  return solves.filter(s => s.eventType === event)
}

export const calculateMean = (solves: Solve[]): number | null => {
  if (solves.length < 3) return null

  const times = solves
    .map(normalizeSolve)
    .sort((a, b) => a - b)

  if (times.length < 3) return null

  const trimmed = times.slice(1, -1)

  if (trimmed.some(t => t === Infinity)) return null

  return trimmed.reduce((a, b) => a + b, 0) / trimmed.length
}

export const calculateAverage = (solves: Solve[]): number | null => {
  if (solves.length < 3) return null

  const times = solves
    .map(normalizeSolve)
    .sort((a, b) => a - b)

  const dnfCount = times.filter(t => t === Infinity).length

  if (dnfCount >= 2 && solves.length === 5) return null
  if (dnfCount >= 3 && solves.length === 12) return null

  const trimmed = times.slice(1, -1)

  if (trimmed.some(t => t === Infinity)) return null

  return trimmed.reduce((a, b) => a + b, 0) / trimmed.length
}

export const getRollingAverages = (solves: Solve[], n: number) => {
  const avgs: (number | null)[] = []

  for (let i = 0; i <= solves.length - n; i++) {
    const slice = solves.slice(i, i + n)
    avgs.push(calculateAverage(slice))
  }

  return avgs
}

export const getBestRollingAverage = (solves: Solve[], n: number): number | null => {
  const avgs = getRollingAverages(solves, n)
  const valid = avgs.filter((a): a is number => a !== null)

  if (valid.length === 0) return null

  return Math.min(...valid)
}

export const getEventStats = (solves: Solve[], event: EventType) => {
  const eventSolves = getSolvesByEvent(solves, event)

  const normalized = eventSolves.map(normalizeSolve)
  const bestValue = normalized.length > 0 ? Math.min(...normalized) : Infinity

  return {
    count: eventSolves.length,
    ao5: calculateAverage(eventSolves.slice(-5)),
    ao12: calculateAverage(eventSolves.slice(-12)),
    best: bestValue === Infinity ? null : bestValue,
  }
}