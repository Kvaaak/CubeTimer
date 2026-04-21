import { useEvent } from '@/context/EventContext'
import { useSolves } from '@/hooks/useSolves'
import { useStats } from '@/hooks/useStats'
import { formatTime } from '@/utils/timeFormat'
import React from 'react'
import { Text, View } from 'react-native'

const AverageRight = () => {
  const { solves, } = useSolves()
  const { eventType } = useEvent()
  const { getAo, getMean, solveCount } = useStats(solves, eventType)

  const sizes = [200, 500, 1000] as const
  const mean = getMean(solveCount)

  const aos = Object.fromEntries(
    sizes.map(n => [n, getAo(n)])
  ) as Record<number, number | null>
  
  return (
    <View style={{alignItems: 'flex-end'}}>
      <Text style={{color: '#fff'}}>Total: {solveCount}</Text>
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