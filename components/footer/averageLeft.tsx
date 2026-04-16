import { useSolves } from '@/hooks/useSolves'
import { useStats } from '@/hooks/useStats'
import React from 'react'
import { Text, View } from 'react-native'

const AverageLeft = () => {
  const { bestTime, solves } = useSolves()
  const { getAo } = useStats(solves)

  const sizes = [5, 12, 50, 100] as const

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
    <View>
      <Text style={{color: '#fff'}}>PB: {bestTime !== null ? formatTime(bestTime) : '--'}</Text>
      {sizes.map(n => {
        const value = aos[n]

        return (
          <Text key={n} style={{ color: '#fff' }}>
            Ao{n}: {value !== null ? formatTime(value) : '--'}
          </Text>
        )
      })}
    </View>
  )
}

export default AverageLeft