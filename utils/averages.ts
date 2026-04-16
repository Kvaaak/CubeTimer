
export const calculateMean = (times: number[]): number | null => {
  const n = times.length
  if (n === 0) return null

  const sorted = [...times].sort((a, b) => a - b)

  const dnfCount = sorted.filter(t => t === Infinity).length

  const trimmed = sorted.slice(dnfCount, n - dnfCount)

  const sum = trimmed.reduce((a, b) => a + b, 0)

  return sum / trimmed.length
}

export const calculateAverage = (times: number[]): number | null => {
  const n = times.length
  if (n === 0) return null

  const sorted = [...times].sort((a, b) => a - b)

  let removeCount = Math.floor(n * 0.05)
  if (removeCount === 0) removeCount = 1

  const dnfCount = sorted.filter(t => t === Infinity).length
  if (dnfCount > removeCount) return null

  const trimmed = sorted.slice(removeCount, n - removeCount)

  if (trimmed.some(t => t === Infinity)) return null

  const sum = trimmed.reduce((a, b) => a + b, 0)
  return sum / trimmed.length
}

export const getRollingAverages = (times: number[], n: number) => {
  const avgs: (number | null)[] = []

  for (let i = 0; i <= times.length - n; i++) {
    const slice = times.slice(i, i + n)
    const avg = calculateAverage(slice)
    avgs.push(avg)
  }

  return avgs
}

export const getBestRollingAverage = (times: number[], n: number): number | null => {
  const avgs = getRollingAverages(times, n)
  const valid = avgs.filter((a): a is number => a !== null)

  if (valid.length === 0) return null
  return Math.min(...valid)
}