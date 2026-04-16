import { useSolves } from '@/hooks/useSolves'
import { useStats } from '@/hooks/useStats'
import React from 'react'
import { Text, View } from 'react-native'

const AverageRight = () => {
  const { solves } = useSolves()
  const { getAo, getMean } = useStats(solves)

  const count = solves.length
  const sizes = [200, 500, 1000] as const
  const mean = getMean(count)

  const aos = Object.fromEntries(
    sizes.map(n => [n, getAo(n)])
  ) as Record<number, number | null>
  
  const formatTime = (timeSec: number) => {
    const minutes = Math.floor(timeSec / 60)
    const seconds = Math.floor(timeSec % 60)
    const centiseconds = Math.floor((timeSec * 100) % 100)
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds
        .toString()
        .padStart(2, '0')}`
    } else {
      return `${seconds}.${centiseconds.toString().padStart(2, '0')}`
    }
  }

  return (
    <View style={{alignItems: 'flex-end'}}>
      <Text style={{color: '#fff'}}>Total: {count}</Text>
      {sizes.map(n => {
        const value = aos[n]

        return (
          <Text key={n} style={{ color: '#fff' }}>
            Ao{n}: {value !== null ? formatTime(value) : '--'}
          </Text>
        )
      })}
      <Text style={{color: '#fff'}}>Mean: {mean !== null ? formatTime(mean): '--'}</Text>
    </View>
  )
}

export default AverageRight