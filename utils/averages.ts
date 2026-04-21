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
  const times = solves
    .map(normalizeSolve)
    .filter(t => t !== Infinity)

  if (times.length < 1) return null

  return times.reduce((a, b) => a + b, 0) / times.length
}

export const calculateAverage = (solves: Solve[]): number | null => {
  const n = solves.length
  if (n < 3) return null

  const times = solves
    .map(normalizeSolve)
    .sort((a, b) => a - b)

  const trimCount = Math.max(1, Math.ceil(n * 0.05))

  const trimmed = times.slice(trimCount, n - trimCount)

  if (trimmed.some(t => t === Infinity)) return null

  const sum = trimmed.reduce((a, b) => a + b, 0)
  return sum / trimmed.length
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
